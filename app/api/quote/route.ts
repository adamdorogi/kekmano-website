import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  MAX_PHOTO_BYTES,
  isImageHeader,
  validateQuote,
} from "@/lib/quote-validation.mjs";

export const runtime = "nodejs";
export const maxDuration = 30;
const attempts = new Map<string, { count: number; expires: number }>();

async function readForm(request: NextRequest) {
  const maxBody = MAX_PHOTO_BYTES + 128 * 1024;
  if (Number(request.headers.get("content-length")) > maxBody)
    throw new RangeError("large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("empty");
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > maxBody) {
      await reader.cancel();
      throw new RangeError("large");
    }
    chunks.push(value);
  }
  return new Response(Buffer.concat(chunks), {
    headers: { "Content-Type": request.headers.get("content-type") || "" },
  }).formData();
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  let sameOrigin = false;
  try {
    const url = new URL(origin || "");
    sameOrigin =
      ["http:", "https:"].includes(url.protocol) &&
      url.origin === origin &&
      url.host === request.headers.get("host");
  } catch {
    /* Missing and opaque origins are rejected. */
  }
  if (!sameOrigin)
    return NextResponse.json(
      { error: "Érvénytelen kérés. Kérjük, frissítse az oldalt." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data"))
    return NextResponse.json(
      { error: "Érvénytelen űrlapformátum." },
      { status: 400 },
    );
  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.expires < now) attempts.delete(key);
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const key = createHash("sha256").update(ip).digest("hex");
  const rate = attempts.get(key);
  if (rate && rate.count >= 5)
    return NextResponse.json(
      {
        error:
          "Túl sok kérés érkezett. Kérjük, próbálja újra 10 perc múlva, vagy hívjon telefonon.",
      },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  let form: FormData;
  try {
    form = await readForm(request);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof RangeError
            ? "A csatolmányok összmérete legfeljebb 20 MB lehet."
            : "Az űrlap nem olvasható. Kérjük, próbálja újra.",
      },
      { status: error instanceof RangeError ? 413 : 400 },
    );
  }
  const parsed = validateQuote(form);
  if (parsed.error)
    return NextResponse.json({ error: parsed.error }, { status: 422 });
  attempts.set(key, {
    count: (rate?.count || 0) + 1,
    expires: rate?.expires || now + 600_000,
  });
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from)
    return NextResponse.json(
      {
        error:
          "Az online küldés jelenleg nem elérhető. Kérjük, hívjon a +36 30 822 0869 számon, vagy küldje el kérését a levelezőprogramjából.",
      },
      { status: 503 },
    );
  const values = parsed.values!;
  const attachments = [];
  for (const photo of parsed.photos! as File[]) {
    const bytes = new Uint8Array(await photo.arrayBuffer());
    if (!isImageHeader(bytes, photo.type))
      return NextResponse.json(
        {
          error:
            "Az egyik csatolmány nem érvényes JPG, PNG vagy WebP kép. Kérjük, válassza ki újra.",
        },
        { status: 422 },
      );
    attachments.push({
      filename: photo.name.replace(/[^\p{L}\p{N}._\- ]/gu, "_").slice(0, 100),
      content: Buffer.from(bytes).toString("base64"),
    });
  }
  const text = `Új ajánlatkérés – Kék Manó\n\nNév: ${values.lastName} ${values.firstName}\nEmail: ${values.email}\nTelefon: ${values.phone}\nHelyszín: ${values.location}\nSzolgáltatás: ${values.service}\nSürgősség: ${values.urgency}\n\nA probléma leírása:\n${values.message || "Nincs külön leírás."}\n\nAdatkezelési hozzájárulás: elfogadva.\n`;
  const idempotency = createHash("sha256")
    .update(
      text +
        attachments.map((a) => a.content).join("") +
        Math.floor(now / 3_600_000),
    )
    .digest("hex");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotency,
      },
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_EMAIL || "csepregigyuri@hotmail.com"],
        reply_to: values.email,
        subject: `Ajánlatkérés: ${values.service} – ${values.location.replace(/[\r\n]/g, " ")}`,
        text,
        attachments,
      }),
      signal: AbortSignal.timeout(20000),
    });
    const result = await response.json();
    if (!response.ok || !result.id)
      return NextResponse.json(
        {
          error:
            "A levelezőszolgáltatás most nem fogadta a kérést. Kérjük, hívjon telefonon, vagy próbálja újra később.",
        },
        { status: 502 },
      );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "A küldés eredményét nem sikerült ellenőrizni. Kérjük, telefonon egyeztessen velünk.",
      },
      { status: 502 },
    );
  }
}
