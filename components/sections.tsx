import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Tag,
  Wrench,
} from "lucide-react";
import { business, partners, services, type Service } from "@/lib/site";
import { CallButton, QuoteButton, TextLink } from "./ui";

export function Benefits() {
  const items = [
    {
      icon: Clock3,
      title: "Akár 1–2 órán belül",
      text: "Gyors kiszállás Budapesten és Pest megyében.",
    },
    {
      icon: Tag,
      title: "Előre egyeztetett árak",
      text: "Átlátható díjak, pontos tájékoztatás.",
    },
    {
      icon: ShieldCheck,
      title: "Garanciával dolgozunk",
      text: "Szakszerű munkavégzés, tartós megoldások.",
    },
  ];
  return (
    <section className="benefits" aria-label="Amit tőlünk várhat">
      <div className="container benefits-grid">
        {items.map(({ icon: Icon, title, text }) => (
          <div className="benefit" key={title}>
            <span className="benefit-icon">
              <Icon size={34} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServiceCards({ exclude }: { exclude?: string }) {
  return (
    <div className={`service-cards ${exclude ? "two-columns" : ""}`}>
      {services
        .filter((s) => s.slug !== exclude)
        .map((s) => (
          <article className="service-card" key={s.slug}>
            <Link className="service-image" href={`/${s.slug}`}>
              <Image
                src={s.image}
                alt=""
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1050px) 45vw, 430px"
              />
              <h3 className="service-image-title">
                {s.shortTitle}
                <span className="round-arrow">
                  <ArrowRight size={22} aria-hidden="true" />
                </span>
              </h3>
            </Link>
            <div className="service-card-content">
              <p>{s.description}</p>
              <div className="service-card-bottom">
                <span>
                  <strong>{s.price} Ft</strong>-tól
                </span>
                <Link
                  href={`/${s.slug}#arak`}
                  aria-label={`${s.shortTitle}: részletes árak`}
                >
                  Árak és részletek
                </Link>
              </div>
            </div>
          </article>
        ))}
    </div>
  );
}

export function PartnerStrip({ all = false }: { all?: boolean }) {
  return (
    <section
      className={`partners ${all ? "partners-all" : ""}`}
      aria-label="Ügyfeleink közül"
    >
      <div className="container">
        <p className="partner-caption">
          Magánszemélyektől a nagyvállalatokig, sokan bízzák ránk.
        </p>
        <div className="partner-logos">
          {partners.slice(0, all ? undefined : 5).map(([name, image]) => (
            <Image
              key={image}
              src={`/images/${image}`}
              width={225}
              height={90}
              alt={name}
              sizes="(max-width: 600px) 130px, 180px"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Awards() {
  const labels = [
    ["legnepszerubb", "Legnépszerűbb"],
    ["highest-rated", "Legjobbra értékelt"],
    ["golden-5", "Golden 5"],
  ];
  return (
    <section className="section awards-section">
      <div className="container">
        <div className="section-heading">
          <h2>
            Az ügyfelek bizalma
            <br />
            elismerésekben is mérhető.
          </h2>
          <p>A Kék Manó 2023-as és 2024-es elismerései.</p>
        </div>
        <div className="award-grid">
          {[2024, 2023].flatMap((year) =>
            labels.map(([file, label]) => (
              <a
                key={`${year}-${file}`}
                href="https://www.aranyvallalkozas.eu/company/csepregi-dugulaselharitas-woma-csatornatisztitas-es-kameras-csatornavizsgalat-budapest-402446"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/images/${year}-${file}-dugulaselharitas.png`}
                  width={215}
                  height={215}
                  alt={`${year} – ${label} duguláselhárítás elismerés`}
                  sizes="(max-width: 760px) 105px, 160px"
                />
              </a>
            )),
          )}
        </div>
      </div>
    </section>
  );
}

export function AboutPreview() {
  return (
    <section className="section about-preview">
      <div className="container about-grid">
        <div className="about-image">
          <Image
            src="/images/woma-csatornatisztito-gep-budapest.jpg"
            alt="A Kék Manó jól felszerelt duguláselhárító autója"
            fill
            sizes="(max-width: 800px) 100vw, 560px"
          />
          <span className="image-note">
            <Wrench size={19} aria-hidden="true" />A megfelelő eszköz mindig
            velünk van.
          </span>
        </div>
        <div className="about-copy">
          <h2>
            Egy ismerős arc.
            <br />
            <span className="text-blue">Egy biztos megoldás.</span>
          </h2>
          <p className="lead">
            Csepregi Gyuri vagyok. 2004 óta segítek, hogy a dugulásból újra
            működő lefolyó legyen.
          </p>
          <p>
            A vízvezetékszerelő szakmából érkeztem. Több mint két évtized alatt
            lakásokban, társasházakban, éttermekben, hotelekben és kórházakban
            is dolgoztam. Minden munkához ugyanúgy állok: figyelmesen,
            felkészülten, a tartós megoldást keresve.
          </p>
          <TextLink href="/csepregi-gyuri">Ismerjen meg jobban</TextLink>
          <span className="signature">Csepregi Gyuri</span>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    {
      icon: PhoneIcon,
      title: "Hívjon fel minket",
      text: "Mondja el, mi történt és hol van szükség segítségre. Egyeztetjük a várható érkezést és az árat.",
    },
    {
      icon: Wrench,
      title: "Megkeressük a megoldást",
      text: "A helyszínen a problémához illő géppel dolgozunk. Szükség esetén kamerával is megvizsgáljuk a vezetéket.",
    },
    {
      icon: Check,
      title: "Újra szabad az út",
      text: "A munka végén ellenőrizzük az átfolyást, és tanácsot adunk a következő dugulás megelőzéséhez.",
    },
  ];
  return (
    <section className="section process-section">
      <div className="container">
        <div className="section-heading">
          <h2>
            Egy telefonhívással
            <br />
            közelebb a megoldáshoz.
          </h2>
          <p>
            A dugulás váratlan. A segítség kiszámítható.
            <br />
            Így dolgozunk együtt.
          </p>
        </div>
        <ol className="process-list">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <div className="process-icon">
                <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
                <span>{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
function PhoneIcon(props: {
  size: number;
  strokeWidth: number;
  "aria-hidden": "true" | boolean;
}) {
  return <MessageCircle {...props} />;
}

export function PriceConditions() {
  return (
    <details className="price-conditions">
      <summary>
        Fontos tudnivalók az árakról és a díjfizetésről
        <span className="details-plus" aria-hidden="true" />
      </summary>
      <div className="prose">
        <p>
          Az árak az eredeti weboldalon feltüntetett induló árak. A pontos
          munkadíjat vagy várható ársávot telefonon, a hiba leírása alapján
          egyeztetjük.
        </p>
        <p>
          Az eredeti árlista tájékoztatása szerint az árak alanyi adómentes
          (AAM) körbe tartoznak, magánszemélyeknek ÁFÁ-t nem kell megfizetniük.
          Cégek számára ÁFÁ-s számla is kiállítható; ebben az esetben a
          feltüntetett árak nettó árak. A számlázás részleteit kérjük előzetesen
          egyeztetni.
        </p>
        <p>
          A megbeszélt teljes munkadíj akkor is fizetendő, ha a helyszínen
          feltárt, előre nem látható, tőlünk független körülmény miatt a munka
          nem végezhető el, vagy csak szakszerűtlen módon lenne elvégezhető.
          Ilyen lehet csőtörés, sérült csővezeték, talajsüllyedés,
          gyökérbenövés, szakszerűtlen szerelés vagy nem megfelelően kialakított
          csőszakasz, például két egymás utáni 90°-os könyök. A díj a
          kiszállást, hibafeltárást és a munkavégzésre fordított időt is magában
          foglalja.
        </p>
        <p>
          <strong>
            Ha rajtunk kívül álló okból nem történt munkavégzés, Pesten belül 20
            000 Ft, Pest megyében 30 000 Ft kiszállási díjat számítunk fel.
          </strong>
        </p>
      </div>
    </details>
  );
}

export function Pricing({ service }: { service?: Service }) {
  const rows =
    service?.priceRows || services.map((s) => [s.shortTitle, s.price]);
  return (
    <section id="arak" className="section pricing-section">
      <div className="container pricing-grid">
        <div>
          <h2>
            Tiszta munka.
            <br />
            <span className="text-blue">Tiszta feltételek.</span>
          </h2>
          <p className="lead">
            Az árat előre egyeztetjük.
            <br />
            Hogy a végén is nyugodt legyen.
          </p>
          <ul className="check-list">
            <li>
              <Check size={18} />
              Nincs külön parkolási díj
            </li>
            <li>
              <Check size={18} />
              Nincs folyóméter- vagy óradíj
            </li>
            <li>
              <Check size={18} />
              Elvégzett munkánál nincs külön kiszállási díj
            </li>
          </ul>
          <p className="muted small">
            A különleges kiszállási feltételeket és a számlázási tudnivalókat az
            árlista alatt találja.
          </p>
          <CallButton />
        </div>
        <div className="price-table-wrap">
          <table className="price-table">
            <caption>
              {service
                ? `${service.shortTitle} árak`
                : "Szolgáltatásaink induló árai"}
            </caption>
            <thead>
              <tr>
                <th scope="col">Szolgáltatás</th>
                <th scope="col">Induló munkadíj</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, price]) => (
                <tr key={label}>
                  <th scope="row">
                    {service ? (
                      label
                    ) : (
                      <Link
                        href={`/${services.find((s) => s.shortTitle === label)?.slug}#arak`}
                      >
                        {label}
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    )}
                  </th>
                  <td>
                    <strong>{price} Ft</strong>
                    <span>-tól</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PriceConditions />
        </div>
      </div>
    </section>
  );
}

export function FaqSection({
  entries,
  title = "Jó kérdések. Egyenes válaszok.",
}: {
  entries: { question: string; html: string }[];
  title?: string;
}) {
  return (
    <section id="gyakori-kerdesek" className="section faq-section">
      <div className="container faq-grid">
        <div>
          <h2>{title}</h2>
          <p>
            Nem találja a választ?
            <br />
            Telefonon szívesen segítünk.
          </p>
          <TextLink href={business.phoneHref}>{business.phone}</TextLink>
        </div>
        <div className="faq-list">
          {entries.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>
                {item.question}
                <span className="details-plus" aria-hidden="true" />
              </summary>
              <div
                className="prose faq-answer"
                dangerouslySetInnerHTML={{ __html: item.html }}
              />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Coverage() {
  return (
    <section className="coverage-section">
      <div className="container coverage-grid">
        <div>
          <MapPin size={36} strokeWidth={1.5} aria-hidden="true" />
          <h2>
            Budapesttől
            <br />
            Pest megyéig.
          </h2>
          <p>
            Otthon, üzletben, társasházban. Budapesten és a környéken is
            számíthat ránk – hétvégén és ünnepnapokon is.
          </p>
          <a className="text-link light-link" href={business.phoneHref}>
            Egyeztessünk a kiszállásról
            <ArrowRight size={20} />
          </a>
        </div>
        <div className="coverage-areas">
          <div>
            <strong>Budapest</strong>
            <span>A főváros minden kerületében</span>
          </div>
          <div>
            <strong>Pest megye</strong>
            <span>Gyál · Szigetszentmiklós · Tököl és környéke</span>
          </div>
          <div>
            <Clock3 size={23} />
            <span>A nap 24 órájában, az év minden napján.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="section contact-section" id="ajanlatkeres">
      <div className="container contact-grid">
        <div>
          <h2>
            Írja le a problémát.
            <br />
            <span className="text-blue">Segítünk megoldani.</span>
          </h2>
          <p className="lead">
            Kérjen ajánlatot vagy visszahívást. A megkeresésekre 24 órán belül
            válaszolunk.
          </p>
          <div className="urgent-note">
            <Clock3 size={23} aria-hidden="true" />
            <p>
              <strong>Sürgős a helyzet?</strong>
              <br />
              Azonnali segítséghez hívjon telefonon.
            </p>
          </div>
          <a className="contact-large-phone" href={business.phoneHref}>
            {business.phone}
            <ArrowRight size={26} />
          </a>
          <a className="contact-email" href={`mailto:${business.email}`}>
            {business.email}
          </a>
          <p className="contact-person">Csepregi Gyuri · Kék Manó</p>
        </div>
        {children}
      </div>
    </section>
  );
}

export function Callout() {
  return (
    <section className="callout-section">
      <div className="container callout-inner">
        <div>
          <h2>
            A dugulás nem vár.
            <br />
            Mi sem váratjuk.
          </h2>
          <p>Hívjon, és egyeztessük, hogyan tudunk segíteni.</p>
        </div>
        <div className="callout-actions">
          <CallButton />
          <QuoteButton />
        </div>
      </div>
    </section>
  );
}
