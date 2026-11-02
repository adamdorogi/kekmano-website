import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, Check } from "lucide-react";
import { business, services } from "@/lib/site";
import faqs from "@/content/original-faqs.json";
import {
  Breadcrumb,
  CallButton,
  QuoteButton,
  ReviewProof,
} from "@/components/ui";
import {
  Benefits,
  Callout,
  ContactSection,
  FaqSection,
  Pricing,
  ServiceCards,
} from "@/components/sections";
import { QuoteForm } from "@/components/quote-form";

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  return {
    title: service ? `${service.title} 0–24` : "Az oldal nem található",
    description: service?.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `${service?.title} | Kék Manó`,
      description: service?.description,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const entries = faqs[slug as keyof typeof faqs] || [];
  return (
    <main id="tartalom">
      <section className="service-hero">
        <div className="container">
          <Breadcrumb current={service.shortTitle} />
          <div className="service-hero-grid">
            <div>
              <h1>
                {service.title}
                <span className="text-blue">Gyorsan. Szakszerűen.</span>
              </h1>
              <p className="lead">{service.lead}</p>
              <p className="service-area">
                Budapest és Pest megye · Hétfő–vasárnap, 0–24
              </p>
              <div className="hero-actions">
                <CallButton />
                <QuoteButton />
              </div>
              <ReviewProof />
              <a className="jump-link" href="#reszletek">
                A szolgáltatás részletei
                <ArrowDown size={16} />
              </a>
            </div>
            <div className="service-hero-image">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 45vw"
              />
              <div className="service-starting-price">
                <span>Induló munkadíj</span>
                <strong>
                  {service.price} Ft<small>-tól</small>
                </strong>
                <Link href="#arak">Árak és feltételek</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Benefits />
      <section className="section service-article" id="reszletek">
        <div className="container article-grid">
          <article className="prose">
            <h2>{service.introTitle}</h2>
            {service.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {service.equipment && (
              <p className="equipment-note">{service.equipment}</p>
            )}
          </article>
          <aside className="applications">
            <h3>Amiben segíteni tudunk</h3>
            <ul>
              {service.applications.map((a) => (
                <li key={a}>
                  <Check size={18} aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
            <div className="applications-contact">
              <p>Nem biztos benne, mire van szükség?</p>
              <a href={business.phoneHref}>Segítünk eldönteni.</a>
            </div>
          </aside>
        </div>
      </section>
      <Pricing service={service} />
      <FaqSection entries={entries} title="Amit még érdemes tudnia." />
      <ContactSection>
        <QuoteForm service={service.shortTitle} />
      </ContactSection>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h2>Másban is segíthetünk.</h2>
          </div>
          <ServiceCards exclude={slug} />
        </div>
      </section>
      <Callout />
    </main>
  );
}
