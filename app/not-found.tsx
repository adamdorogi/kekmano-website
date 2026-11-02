import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CallButton } from "@/components/ui";
export default function NotFound() {
  return (
    <main id="tartalom" className="not-found container">
      <span className="error-code">404</span>
      <h1>
        Itt nincs lefolyó.
        <br />
        De van kiút.
      </h1>
      <p>
        Ez az oldal nem található. A főoldalon megtalálja szolgáltatásainkat,
        vagy hívjon minket közvetlenül.
      </p>
      <div className="hero-actions">
        <Link className="button button-secondary" href="/">
          <ArrowLeft size={19} />
          Vissza a főoldalra
        </Link>
        <CallButton />
      </div>
    </main>
  );
}
