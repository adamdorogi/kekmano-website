import type { Metadata } from "next";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { business } from "@/lib/site";
import { Breadcrumb } from "@/components/ui";
import { QuoteForm } from "@/components/quote-form";
import { Coverage } from "@/components/sections";

export const metadata: Metadata = {
  title: "Kapcsolat és ajánlatkérés",
  description:
    "Kérjen ajánlatot duguláselhárításra. Csepregi Gyuri: +36 30 822 0869, csepregigyuri@hotmail.com. Hívható 0–24 órában, hétvégén és ünnepnapokon is.",
  alternates: { canonical: "/kapcsolat" },
};

export default function ContactPage() {
  return (
    <main id="tartalom">
      <section className="contact-page section">
        <div className="container">
          <Breadcrumb current="Kapcsolat" />
          <div className="contact-page-grid">
            <div>
              <h1>
                Egy hívás.
                <br />
                <span className="text-blue">És segítünk.</span>
              </h1>
              <p className="lead">
                Sürgős duguláselhárításhoz hívjon telefonon. Ajánlatkéréshez
                írja le a problémát az űrlapon, és 24 órán belül jelentkezünk.
              </p>
              <div className="contact-methods">
                <a href={business.phoneHref}>
                  <span className="contact-method-icon">
                    <Phone size={24} />
                  </span>
                  <span>
                    <small>Hívjon 0–24 órában</small>
                    <strong>{business.phone}</strong>
                  </span>
                  <ArrowUpRight size={22} />
                </a>
                <a href={`mailto:${business.email}`}>
                  <span className="contact-method-icon">
                    <Mail size={24} />
                  </span>
                  <span>
                    <small>Írjon nekünk</small>
                    <strong className="email-value">{business.email}</strong>
                  </span>
                  <ArrowUpRight size={22} />
                </a>
              </div>
              <div className="contact-hours">
                <Clock3 size={22} />
                <div>
                  <h2>Minden nap elérhető.</h2>
                  <p>
                    Hétfő–péntek: 0–24
                    <br />
                    Szombat és vasárnap: 0–24
                    <br />
                    Ünnepnapokon: 0–24
                  </p>
                </div>
              </div>
              <div className="company-details">
                <h2>Céges adatok</h2>
                <p>
                  <strong>Kék Manó Csepi Kft.</strong>
                  <br />
                  {business.address}
                  <br />
                  Adószám: {business.taxId}
                  <br />
                  Cégjegyzékszám: {business.companyId}
                </p>
                <p>
                  <strong>Csépa Manó Kft.</strong>
                  <br />
                  {business.address}
                  <br />
                  Adószám: 33131801-1-42
                </p>
                <a
                  className="text-link"
                  href={business.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin size={17} />
                  Cím megnyitása a térképen
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
            <div id="ajanlatkeres">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
      <Coverage />
    </main>
  );
}
