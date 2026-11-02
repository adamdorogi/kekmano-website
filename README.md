# Kék Manó – Next.js 16 redesign

Complete Hungarian website, built from the approved white-layout mockup. Local development only; nothing has been published.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). Build and check:

```sh
npm run typecheck
npm test
npm run build
```

## Pages

All original public page slugs are retained:

- `/` – homepage, service overview, reviews, pricing, coverage, quote request
- `/csepregi-gyuri` – complete professional background
- `/dugulaselharitas-budapest` – service details, every original FAQ topic, full price list
- `/woma-csatornatisztitas-budapest` – equipment, uses, limitations, FAQs and prices
- `/csatorna-kamerazas-budapest` – diagnostic uses, FAQs and prices
- `/referencia-videok` – all seven original video destinations and 219 original gallery photographs
- `/kapcsolat` – contact details, both companies, quote form
- `/adatkezelesi-tajekoztato` – full original privacy text

The original broken about link `/giricz-janos` redirects to `/csepregi-gyuri`. `/rolunk` and `/arak` also redirect to the corresponding content.

## Quote email delivery

Copy `.env.example` to `.env.local` and set:

```dotenv
RESEND_API_KEY=your_key
RESEND_FROM_EMAIL=Kék Manó <verified-sender@your-domain.hu>
CONTACT_EMAIL=csepregigyuri@hotmail.com
NEXT_PUBLIC_SITE_URL=https://kekmano.hu
```

The sender must be verified with [Resend](https://resend.com/docs/send-with-nextjs). No credentials are included. Without configuration the endpoint returns an honest service-unavailable error, retains the form fields, and offers a call or a populated email draft. A success screen appears only after the email provider accepts the request. No test emails were sent during development.

The form validates names, email, phone, location, service, urgency and consent on the server. It accepts up to five JPG/PNG/WebP photos with a combined maximum of 20 MiB, verifies image signatures, limits request bodies, checks the request origin, and includes a honeypot, a basic in-memory rate limit, and provider idempotency.

## Before manually publishing to Vercel

1. Set the environment variables above, including the final canonical domain.
2. **Large attachments:** local requests support the original 20 MB limit. Vercel Functions have a [4.5 MB request-body limit](https://vercel.com/docs/functions/limitations#request-body-size). For full-size production uploads, connect direct browser-to-object-storage uploads before publishing; alternatively lower the form's production attachment limit below the platform limit. The current multipart endpoint is intended for local development and small hosted submissions.
3. The preserved original privacy policy names the original hosting/marketing providers and contains job-application language. Have the business update it for the chosen Vercel/email/storage providers and actual processing before accepting public submissions. It is migrated source content, not a newly drafted compliance policy.
4. The original pricing text includes AAM and business VAT wording that should be confirmed by the owner. Both the published starting prices and exceptional callout fees have been preserved. No extra weekend surcharge claim was invented.
5. Use a shared rate limiter or platform bot protection for a public multi-instance deployment. The bundled limiter is intentionally lightweight and process-local.

Vercel can detect Next.js directly. No custom hosting adapter is needed. This project was not registered with or deployed to Sites.

## Content and design

Source material was archived from [kekmano.hu](https://kekmano.hu/) on 2 November 2026. `content/source/` contains the original HTML, text and asset inventory; it is not served by the app. `content/original-faqs.json`, `content/privacy.json` and `content/references.json` hold migrated content. `lib/site.ts` holds the edited business copy, services and prices. Original photography and company logos are self-hosted under `public/images`; the five lead assets also have lossless PNG copies under `assets/plates` for reproducible design verification; Manrope is self-hosted with its OFL license under `public/fonts`.

The three mockups were produced with the built-in Imagegen tool and saved in `.impeccable/mocks/`, each with its exact prompt and references in a JSON sidecar. The user approved `a-white.png`. The final site uses the original company photographs, rather than generated depictions of the real technician. `PRODUCT.md`, `DESIGN.md` and `.impeccable/surfaces/` document the product and design decisions.

No analytics, tracking cookies, remote fonts or third-party widgets are loaded. Video thumbnails are local; the privacy-enhanced YouTube player is loaded only after a visitor clicks a video. Google reviews and maps open as external links. The visible rating and review count are a source snapshot, not a live feed.
