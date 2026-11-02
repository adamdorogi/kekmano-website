import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui";
import {
  ReferenceGallery,
  ReferenceVideos,
} from "@/components/reference-media";
import { Callout, PartnerStrip } from "@/components/sections";
import { Reviews } from "@/components/reviews";

export const metadata: Metadata = {
  title: "Referenciák – munkafotók és videók",
  description:
    "Nézze meg a Kék Manó munkáját: eredeti helyszíni fotók, duguláselhárítás, WOMA csatornatisztítás és kamerás csatornavizsgálat videók.",
  alternates: { canonical: "/referencia-videok" },
};

export default function ReferencesPage() {
  return (
    <main id="tartalom">
      <section className="page-title-section">
        <div className="container">
          <Breadcrumb current="Referenciák" />
          <h1>
            A munkánk beszél.
            <br />
            <span className="text-blue">Nézzen bele.</span>
          </h1>
          <div className="page-title-bottom">
            <p className="lead">
              Helyszíni felvételek a valódi munkáinkról. Így lesz a dugulásból
              újra szabad lefolyó.
            </p>
            <nav className="section-tabs" aria-label="Referencia típusok">
              <a href="#videok">Videók</a>
              <a href="#fotok">Munkafotók</a>
              <a href="#velemenyek">Ügyfélvélemények</a>
            </nav>
          </div>
        </div>
      </section>
      <section id="videok" className="section video-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>Munka közben.</h2>
              <p>A videókat kattintás után a YouTube játssza le.</p>
            </div>
          </div>
          <ReferenceVideos />
        </div>
      </section>
      <PartnerStrip />
      <section id="fotok" className="section">
        <div className="container">
          <div className="section-heading">
            <h2>Helyszínről helyszínre.</h2>
            <p>Eredeti fotók a Kék Manó munkáiról.</p>
          </div>
          <ReferenceGallery />
        </div>
      </section>
      <div id="velemenyek">
        <Reviews />
      </div>
      <Callout />
    </main>
  );
}
