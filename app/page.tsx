import Image from "next/image";
import heroPhoto from "../assets/plates/hero-photo.png";
import { Clock3 } from "lucide-react";
import { business, commonFaqs } from "@/lib/site";
import {
  CallButton,
  QuoteButton,
  ReviewProof,
  TextLink,
} from "@/components/ui";
import {
  AboutPreview,
  Benefits,
  ContactSection,
  Coverage,
  FaqSection,
  PartnerStrip,
  Pricing,
  Process,
  ServiceCards,
} from "@/components/sections";
import { Reviews } from "@/components/reviews";
import { QuoteForm } from "@/components/quote-form";
import { ReferenceGallery } from "@/components/reference-media";

export default function Home() {
  return (
    <main id="tartalom">
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>
              Dugulás van?
              <br />
              <span>Mi megoldjuk.</span>
            </h1>
            <p>
              Duguláselhárítás, WOMA csatornatisztítás és kamerás vizsgálat
              Budapesten és Pest megyében. Gyorsan, tisztán, garanciával.
            </p>
            <div className="hero-actions">
              <CallButton />
              <QuoteButton />
            </div>
            <ReviewProof />
          </div>
          <figure className="hero-portrait">
            <Image
              src={heroPhoto}
              alt="Csepregi Gyuri a Kék Manó csatornatisztító felszereléssel ellátott autója mellett"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 45vw"
            />
            <div className="hours-badge">
              <Clock3 size={30} strokeWidth={1.7} aria-hidden="true" />
              <strong>0–24</strong>
              <span>
                hétvégén és
                <br />
                ünnepnapokon is
              </span>
            </div>
            <figcaption>
              <strong>Csepregi Gyuri</strong>
              <span>Szakértelem 2004 óta</span>
            </figcaption>
          </figure>
        </div>
      </section>
      <Benefits />
      <section className="section home-services" id="szolgaltatasok">
        <div className="container">
          <div className="section-heading">
            <h2>Miben segíthetünk?</h2>
            <p>A pontos problémához a megfelelő megoldás.</p>
          </div>
          <ServiceCards />
        </div>
      </section>
      <PartnerStrip />
      <AboutPreview />
      <Reviews />
      <Process />
      <Pricing />
      <section className="section work-preview">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>A munkánk közelről.</h2>
              <p>Valós helyszínek. Valós problémák. Működő megoldások.</p>
            </div>
            <TextLink href="/referencia-videok">
              Fotók és referencia videók
            </TextLink>
          </div>
          <ReferenceGallery preview />
        </div>
      </section>
      <Coverage />
      <FaqSection entries={commonFaqs} />
      <ContactSection>
        <QuoteForm />
      </ContactSection>
    </main>
  );
}
