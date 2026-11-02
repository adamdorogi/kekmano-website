"use client";

import Image from "next/image";
import brandLogo from "../assets/plates/brand-logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Clock3,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { business, services } from "@/lib/site";
import { CallButton } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const details = useRef<HTMLDetailsElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (details.current?.open) {
          details.current.open = false;
          details.current.querySelector("summary")?.focus();
        }
        if (open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }
    }
    function outside(event: MouseEvent) {
      if (details.current && !details.current.contains(event.target as Node))
        details.current.open = false;
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", outside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", outside);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    if (details.current) details.current.open = false;
  };
  const navLinks = [
    ["/csepregi-gyuri", "Rólunk"],
    ["/referencia-videok", "Referenciák"],
    ["/kapcsolat", "Kapcsolat"],
  ];

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>
            <MapPin size={15} aria-hidden="true" />
            Budapest és Pest megye
          </span>
          <span>
            <Clock3 size={15} aria-hidden="true" />
            <span className="hours-long">
              0–24, hétvégén és ünnepnapokon is
            </span>
            <span className="hours-short">0–24, minden nap</span>
          </span>
        </div>
      </div>
      <div className="navigation-wrap">
        <div className="container navigation-inner">
          <Link
            className="brand"
            href="/"
            onClick={close}
            aria-label="Kék Manó – főoldal"
          >
            <Image
              src={brandLogo}
              alt="Kék Manó duguláselhárítás"
              width={600}
              height={150}
              priority
              sizes="(max-width: 600px) 190px, 280px"
            />
          </Link>
          <nav className="desktop-nav" aria-label="Fő navigáció">
            <details ref={details} className="services-menu">
              <summary
                className={
                  services.some((s) => pathname.includes(s.slug))
                    ? "active"
                    : ""
                }
              >
                Szolgáltatások
                <ChevronDown size={15} aria-hidden="true" />
              </summary>
              <div className="service-dropdown">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/${service.slug}`}
                    onClick={close}
                    aria-current={
                      pathname === `/${service.slug}` ? "page" : undefined
                    }
                  >
                    <span>
                      <strong>{service.shortTitle}</strong>
                      <small>{service.price} Ft-tól</small>
                    </span>
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </Link>
                ))}
                <Link
                  className="dropdown-prices"
                  href="/dugulaselharitas-budapest#arak"
                  onClick={close}
                >
                  Részletes árak és feltételek
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </details>
            {navLinks.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <CallButton className="header-call" />
          <button
            ref={toggle}
            type="button"
            className="menu-toggle icon-button"
            aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
            aria-controls="mobile-navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobil navigáció"
        hidden={!open}
      >
        <div className="container">
          <p>Szolgáltatásaink</p>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              onClick={close}
              aria-current={pathname === `/${s.slug}` ? "page" : undefined}
            >
              {s.shortTitle}
              <ArrowUpRight size={18} />
            </Link>
          ))}
          <div className="mobile-nav-links">
            {navLinks.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                aria-current={pathname === href ? "page" : undefined}
              >
                {label}
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
          <CallButton />
        </div>
      </nav>
    </header>
  );
}
