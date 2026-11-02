import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Kék Manó – Dugulás van? Mi megoldjuk. +36 30 822 0869";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [font, logo, portrait] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/manrope-extrabold.ttf")),
    readFile(
      join(
        process.cwd(),
        "public/images/dugulaselharitas-budapest-kekmano-logo-3.png",
      ),
    ),
    readFile(
      join(
        process.cwd(),
        "public/images/kekmano-dugulaselharitas-budapest-csepregi-gyuri-4a.jpg",
      ),
    ),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#fff",
        fontFamily: "Manrope",
        color: "#102c4c",
      }}
    >
      <div
        style={{
          padding: "55px 50px",
          width: "66%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          width={300}
          height={75}
          alt="Kék Manó"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 71,
            lineHeight: 1.12,
            marginTop: 54,
            letterSpacing: -2,
          }}
        >
          <span>Dugulás van?</span>
          <span style={{ color: "#1559e8" }}>Mi megoldjuk.</span>
        </div>
        <div style={{ display: "flex", fontSize: 21, marginTop: 25 }}>
          Budapest és Pest megye · 0–24
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            color: "white",
            background: "#1559e8",
            padding: "16px 24px",
            borderRadius: 10,
            fontSize: 29,
            alignSelf: "flex-start",
          }}
        >
          +36 30 822 0869
        </div>
      </div>
      <img
        src={`data:image/jpeg;base64,${portrait.toString("base64")}`}
        style={{
          width: "34%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 30%",
        }}
        alt="Csepregi Gyuri"
      />
    </div>,
    {
      ...size,
      fonts: [{ name: "Manrope", data: font, weight: 800, style: "normal" }],
    },
  );
}
