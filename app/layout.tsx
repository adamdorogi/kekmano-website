import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { business, siteUrl } from "@/lib/site";
import "./globals.css";

const manrope = localFont({
  src: [
    {
      path: "../public/fonts/manrope-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/manrope-bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/manrope-extrabold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Duguláselhárítás Budapest 0–24 | Kék Manó",
    template: "%s | Kék Manó",
  },
  description:
    "Duguláselhárítás, WOMA csatornatisztítás és csatorna kamerázás Budapesten és Pest megyében. Csepregi Gyuri, 2004 óta. Hívjon 0–24: +36 30 822 0869.",
  openGraph: {
    type: "website",
    locale: "hu_HU",
    siteName: "Kék Manó duguláselhárítás",
    title: "Dugulás van? Mi megoldjuk. | Kék Manó",
    description:
      "Szakszerű duguláselhárítás Budapesten és Pest megyében. A nap 24 órájában, garanciával.",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#102c4c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: "Kék Manó duguláselhárítás",
    url: siteUrl,
    telephone: "+36308220869",
    email: business.email,
    image: `${siteUrl}${business.portrait}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kiskert utca 3. fsz. 1. ajtó",
      addressLocality: "Budapest",
      postalCode: "1104",
      addressCountry: "HU",
    },
    areaServed: ["Budapest", "Pest megye"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };
  return (
    <html lang="hu" className={manrope.variable} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#tartalom">
          Ugrás a tartalomhoz
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
