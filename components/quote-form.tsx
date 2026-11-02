"use client";

import Link from "next/link";
import {
  useId,
  useRef,
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";
import {
  ArrowRight,
  CheckCircle2,
  ImagePlus,
  LoaderCircle,
  Phone,
  Plus,
  X,
  AlertCircle,
  Mail,
} from "lucide-react";
import { business, services } from "@/lib/site";

const MAX_BYTES = 20 * 1024 * 1024;
export function QuoteForm({ service = "" }: { service?: string }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [draft, setDraft] = useState("");
  const [dragging, setDragging] = useState(false);

  function addFiles(incoming: File[]) {
    const next = [...files, ...incoming].filter(
      (file, index, all) =>
        all.findIndex(
          (f) =>
            f.name === file.name &&
            f.size === file.size &&
            f.lastModified === file.lastModified,
        ) === index,
    );
    if (next.length > 5) {
      setFileError("Legfeljebb 5 fotót válasszon ki.");
      return;
    }
    if (
      next.some(
        (f) => !["image/jpeg", "image/png", "image/webp"].includes(f.type),
      )
    ) {
      setFileError("JPG, PNG vagy WebP képet válasszon.");
      return;
    }
    if (next.reduce((sum, f) => sum + f.size, 0) > MAX_BYTES) {
      setFileError(
        "A fotók összmérete legfeljebb 20 MB lehet. Válasszon kisebb képeket.",
      );
      return;
    }
    setFiles(next);
    setFileError("");
  }
  function chooseFiles(event: ChangeEvent<HTMLInputElement>) {
    addFiles(Array.from(event.target.files || []));
    event.target.value = "";
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || !event.currentTarget.reportValidity()) return;
    setError("");
    const data = new FormData(event.currentTarget);
    const phone = String(data.get("phone") || "").replace(/[^0-9+]/g, "");
    if (phone.replace(/\D/g, "").length < 8) {
      setError(
        "Kérjük, adjon meg egy elérhető telefonszámot körzetszámmal együtt.",
      );
      return;
    }
    files.forEach((file) => data.append("photos", file));
    const text = `Név: ${data.get("lastName")} ${data.get("firstName")}\nEmail: ${data.get("email")}\nTelefon: ${data.get("phone")}\nHelyszín: ${data.get("location")}\nSzolgáltatás: ${data.get("service")}\nSürgősség: ${data.get("urgency")}\n\n${data.get("message") || ""}`;
    setDraft(
      `mailto:${business.email}?subject=${encodeURIComponent("Ajánlatkérés – Kék Manó")}&body=${encodeURIComponent(text)}`,
    );
    setStatus("sending");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        body: data,
        signal: AbortSignal.timeout(35000),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(
          result.error ||
            "A kérés nem érkezett meg. Kérjük, próbálja újra, vagy hívjon telefonon.",
        );
      setStatus("success");
      formRef.current?.reset();
      setFiles([]);
    } catch (cause) {
      setStatus("idle");
      setError(
        cause instanceof Error && cause.name !== "TimeoutError"
          ? cause.message
          : "A küldés nem fejeződött be. Kérjük, próbálja újra, vagy hívjon telefonon.",
      );
    }
  }

  if (status === "success")
    return (
      <div className="quote-success" role="status">
        <CheckCircle2 size={48} strokeWidth={1.5} />
        <h3>Köszönjük a megkeresést!</h3>
        <p>
          Ajánlatkérését elküldtük. 24 órán belül jelentkezünk a megadott
          elérhetőségek egyikén.
        </p>
        <p>Sürgős esetben kérjük, hívjon telefonon.</p>
        <a className="button button-primary" href={business.phoneHref}>
          <Phone size={20} />
          {business.phone}
        </a>
        <button
          className="text-link"
          onClick={() => {
            setStatus("idle");
            setDraft("");
          }}
        >
          Új ajánlatkérés
          <ArrowRight size={18} />
        </button>
      </div>
    );

  return (
    <form
      ref={formRef}
      className="quote-form"
      onSubmit={submit}
      aria-label="Ajánlatkérés"
      aria-busy={status === "sending"}
    >
      <h3>Kérjen ajánlatot</h3>
      <p className="form-description">
        Néhány adat, hogy felvehessük Önnel a kapcsolatot.
        <br />
        <span>A csillaggal jelölt mezők kitöltése kötelező.</span>
      </p>
      <fieldset disabled={status === "sending"}>
        <legend className="sr-only">
          Kapcsolattartási adatok és a probléma leírása
        </legend>
        <div className="form-row">
          <label htmlFor={`${id}-last`}>
            Vezetéknév <span>*</span>
            <input
              id={`${id}-last`}
              name="lastName"
              autoComplete="family-name"
              placeholder="Vezetéknév"
              required
              maxLength={80}
            />
          </label>
          <label htmlFor={`${id}-first`}>
            Keresztnév <span>*</span>
            <input
              id={`${id}-first`}
              name="firstName"
              autoComplete="given-name"
              placeholder="Keresztnév"
              required
              maxLength={80}
            />
          </label>
        </div>
        <div className="form-row">
          <label htmlFor={`${id}-email`}>
            Email-cím <span>*</span>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="pelda@email.hu"
              required
              maxLength={254}
            />
          </label>
          <label htmlFor={`${id}-phone`}>
            Telefonszám <span>*</span>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+36 30 123 4567"
              required
              minLength={8}
              maxLength={24}
            />
          </label>
        </div>
        <label htmlFor={`${id}-location`}>
          Munkavégzés helye <span>*</span>
          <input
            id={`${id}-location`}
            name="location"
            autoComplete="address-level2"
            placeholder="Település vagy budapesti kerület"
            required
            maxLength={160}
          />
        </label>
        <div className="form-row">
          <label htmlFor={`${id}-service`}>
            Miben segíthetünk? <span>*</span>
            <select
              id={`${id}-service`}
              name="service"
              required
              defaultValue={service}
            >
              <option value="" disabled>
                Válasszon szolgáltatást
              </option>
              {services.map((s) => (
                <option key={s.slug} value={s.shortTitle}>
                  {s.shortTitle}
                </option>
              ))}
              <option>Egyéb</option>
            </select>
          </label>
          <label htmlFor={`${id}-urgency`}>
            Mennyire sürgős? <span>*</span>
            <select
              id={`${id}-urgency`}
              name="urgency"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Válasszon időpontot
              </option>
              <option>Azonnal szeretném</option>
              <option>A következő 1–3 napban</option>
            </select>
          </label>
        </div>
        <label htmlFor={`${id}-message`}>
          Röviden a problémáról <span className="optional">nem kötelező</span>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={3}
            placeholder="Például: lassan folyik le a víz a konyhai mosogatóban…"
            maxLength={4000}
          />
        </label>
        <div
          className={`upload-zone ${dragging ? "dragging" : ""}`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            addFiles(Array.from(event.dataTransfer.files));
          }}
        >
          <input
            ref={fileRef}
            id={`${id}-photos`}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={chooseFiles}
            aria-describedby={`${id}-file-help`}
            hidden
            aria-hidden="true"
            tabIndex={-1}
          />
          <button
            type="button"
            className="upload-button"
            onClick={() => fileRef.current?.click()}
          >
            <ImagePlus size={25} strokeWidth={1.6} aria-hidden="true" />
            <span>
              Fotók csatolása <small>vagy húzza ide a képeket</small>
            </span>
            <Plus className="upload-add" size={21} aria-hidden="true" />
          </button>
          <p id={`${id}-file-help`}>
            JPG, PNG, WebP · legfeljebb 5 kép, összesen 20 MB
          </p>
        </div>
        {files.length > 0 && (
          <ul className="selected-files">
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`}>
                <span>
                  {file.name}
                  <small>{(file.size / 1024 / 1024).toFixed(1)} MB</small>
                </span>
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => {
                    setFiles(files.filter((_, i) => i !== index));
                    setFileError("");
                  }}
                  aria-label={`${file.name} eltávolítása`}
                >
                  <X size={17} />
                </button>
              </li>
            ))}
          </ul>
        )}
        {fileError && (
          <p className="field-error" role="alert">
            {fileError}
          </p>
        )}
        <div className="honey-field" aria-hidden="true">
          <label htmlFor={`${id}-website`}>
            Weboldal
            <input
              id={`${id}-website`}
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>
        <label className="consent" htmlFor={`${id}-consent`}>
          <input
            id={`${id}-consent`}
            name="consent"
            type="checkbox"
            required
            value="accepted"
          />
          <span>
            Elolvastam az{" "}
            <Link href="/adatkezelesi-tajekoztato" target="_blank">
              adatkezelési tájékoztatót
            </Link>
            , és hozzájárulok adataim továbbításához a Kék Manó Csepi Kft.
            részére a megkeresés megválaszolásához. <span>*</span>
          </span>
        </label>
        {error && (
          <div className="form-error" role="alert">
            <AlertCircle size={22} />
            <div>
              <strong>Nem sikerült elküldeni a kérést.</strong>
              <p>{error}</p>
              <a href={business.phoneHref}>Hívás: {business.phone}</a>
              {draft && (
                <>
                  <a href={draft}>
                    <Mail size={15} />
                    Megnyitás a levelezőben
                  </a>
                  <small>A fotókat a levélhez külön kell csatolnia.</small>
                </>
              )}
            </div>
          </div>
        )}
        <button
          type="submit"
          className="button button-primary form-submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <>
              <LoaderCircle className="spinner" size={21} />
              Kérés küldése…
            </>
          ) : (
            <>
              Ajánlatkérés küldése
              <ArrowRight size={21} />
            </>
          )}
        </button>
      </fieldset>
      <p className="form-bottom-note">
        Sürgős helyzetben a telefonos egyeztetés a leggyorsabb.
      </p>
      <noscript>
        <p>
          Az űrlaphoz JavaScript szükséges. Kérjük, hívjon a {business.phone}{" "}
          számon vagy írjon a {business.email} címre.
        </p>
      </noscript>
    </form>
  );
}
