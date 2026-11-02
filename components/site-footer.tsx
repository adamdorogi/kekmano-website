import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Phone } from "lucide-react";
import { business, services } from "@/lib/site";

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <Link
              className="footer-brand"
              href="/"
              aria-label="Kék Manó főoldal"
            >
              <Image
                src={business.logo}
                alt="Kék Manó duguláselhárítás"
                width={600}
                height={150}
                sizes="240px"
              />
            </Link>
            <p>
              Megoldjuk a dugulást.
              <br />
              Visszaadjuk a nyugalmát.
            </p>
            <a className="footer-phone" href={business.phoneHref}>
              <Phone size={23} aria-hidden="true" />
              {business.phone}
              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
          </div>
          <div className="footer-grid">
            <div>
              <h3>Elérhetőségek</h3>
              <p>
                {business.person}
                <br />
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </p>
              <p>
                <Clock3 size={16} aria-hidden="true" /> Hétfő–vasárnap: 0–24
                <br />
                Hétvégén és ünnepnapokon is.
              </p>
            </div>
            <div>
              <h3>Szolgáltatások</h3>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${s.slug}`}>{s.shortTitle}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/dugulaselharitas-budapest#arak">
                    Árak és díjfeltételek
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>Ismerjen meg minket</h3>
              <ul>
                <li>
                  <Link href="/csepregi-gyuri">Csepregi Gyuri története</Link>
                </li>
                <li>
                  <Link href="/referencia-videok">
                    Referenciafotók és videók
                  </Link>
                </li>
                <li>
                  <Link href="/kapcsolat">Kapcsolat és ajánlatkérés</Link>
                </li>
                <li>
                  <Link href="/adatkezelesi-tajekoztato">
                    Adatkezelési tájékoztató
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>Céges adatok</h3>
              <p>
                <strong>{business.company}</strong>
                <br />
                <a
                  href={business.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {business.address}
                </a>
                <br />
                Adószám: {business.taxId}
                <br />
                Cégjegyzékszám: {business.companyId}
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Kék Manó Csepi Kft. Minden jog
              fenntartva.
            </span>
            <span>Budapest és Pest megye</span>
            <Link href="/adatkezelesi-tajekoztato">
              Adatkezelési tájékoztató
            </Link>
          </div>
        </div>
      </footer>
      <div className="mobile-call-bar">
        <a href={business.phoneHref}>
          <Phone size={20} aria-hidden="true" />
          <span>
            <small>Segítség a nap 24 órájában</small>
            <strong>{business.phone}</strong>
          </span>
          <ArrowUpRight size={22} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
