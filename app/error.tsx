"use client";
import { CallButton } from "@/components/ui";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="tartalom" className="not-found container">
      <h1>Valami megakadt.</h1>
      <p>
        Az oldal betöltése nem sikerült. Próbálja újra, vagy sürgős esetben
        hívjon minket telefonon.
      </p>
      <div className="hero-actions">
        <button className="button button-secondary" onClick={reset}>
          Újrapróbálom
        </button>
        <CallButton />
      </div>
    </main>
  );
}
