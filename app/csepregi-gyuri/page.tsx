import type { Metadata } from "next";
import Image from "next/image";
import { business } from "@/lib/site";
import { Breadcrumb, CallButton, ReviewProof } from "@/components/ui";
import {
  Awards,
  Benefits,
  Callout,
  PartnerStrip,
  ServiceCards,
} from "@/components/sections";
import { Reviews } from "@/components/reviews";

export const metadata: Metadata = {
  title: "Csepregi Gyuri – szakértelem 2004 óta",
  description:
    "Ismerje meg a Kék Manó mögött álló szakembert. Csepregi Gyuri 2004 óta végez duguláselhárítást Budapesten és Pest megyében.",
  alternates: { canonical: "/csepregi-gyuri" },
};

export default function AboutPage() {
  return (
    <main id="tartalom">
      <section className="about-page-hero">
        <div className="container">
          <Breadcrumb current="Rólunk" />
          <div className="about-page-grid">
            <div className="about-page-copy">
              <h1>
                Csepregi Gyuri vagyok.
                <br />
                <span className="text-blue">Számíthat rám.</span>
              </h1>
              <p className="lead">
                2004 óta foglalkozom duguláselhárítással Budapesten és Pest
                megyében. Még mindig ugyanaz a célom: hogy a munka után hosszú
                távon is rendben legyen minden.
              </p>
              <CallButton />
              <ReviewProof />
            </div>
            <figure className="about-page-photo">
              <Image
                src={business.portrait}
                alt="Csepregi Gyuri a Kék Manó munkára felszerelt autója mellett"
                fill
                priority
                sizes="(max-width: 800px) 100vw, 500px"
              />
              <figcaption>Csepregi Gyuri · Kék Manó</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <Benefits />
      <section className="section">
        <div className="container story-grid">
          <h2>
            A tapasztalatot
            <br />
            munkával szerzi
            <br />
            az ember.
          </h2>
          <article className="prose">
            <p className="lead">
              Vízvezetékszerelőként kezdtem. A duguláselhárítás lett az a
              terület, ahol igazán otthon vagyok.
            </p>
            <p>
              1986-ban végeztem vízvezeték- és készülékszerelő szakon. Ezután a
              vízvezetékszerelő szakmában dolgoztam, ahol megszereztem a
              szükséges gyakorlatot. Duguláselhárítással 2004-ben kezdtem
              foglalkozni: előbb alkalmazottként, majd több mint tíz éve önálló
              vállalkozóként.
            </p>
            <p>
              Azóta hotelekben, éttermekben, kórházakban, társasházakban és
              magánlakásokban is a legkülönbözőbb problémákkal találkoztam. A
              felszerelésemet és a technikámat folyamatosan fejlesztem, hogy az
              új helyzetekre is felkészülten érkezzem.
            </p>
            <p>
              A Kék Manó Csepi Kft. a főfoglalkozásom. Az időm és az energiám
              legjavát erre fordítom, mert tudom, hogy egy dugulás mögött mindig
              ott van valaki, akinek éppen segítségre van szüksége.
            </p>
            <p>
              A hétvégi, késő esti vagy ünnepnapi munka sem akadály. A nap 24
              órájában elérhető vagyok. A megfelelő kommunikációt legalább olyan
              fontosnak tartom, mint a megfelelő eszközt: elmondom, mit látok,
              milyen megoldás lehetséges, és mire számíthat.
            </p>
            <p className="signature">Csepregi Gyuri</p>
          </article>
        </div>
      </section>
      <PartnerStrip all />
      <Reviews />
      <Awards />
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h2>Amiben számíthat ránk.</h2>
          </div>
          <ServiceCards />
        </div>
      </section>
      <Callout />
    </main>
  );
}
