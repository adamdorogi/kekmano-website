import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui";
import privacy from "@/content/privacy.json";

export const metadata: Metadata = {
  title: "Adatkezelési tájékoztató",
  description:
    "A Kék Manó weboldal adatkezelési tájékoztatója és adatvédelmi elvei.",
  alternates: { canonical: "/adatkezelesi-tajekoztato" },
};
export default function PrivacyPage() {
  return (
    <main id="tartalom">
      <div className="container legal-container">
        <Breadcrumb current="Adatkezelési tájékoztató" />
        <h1>
          Adatkezelési
          <br />
          <span className="text-blue">tájékoztató</span>
        </h1>
        <article
          className="prose legal-prose"
          dangerouslySetInnerHTML={{ __html: privacy.html }}
        />
      </div>
    </main>
  );
}
