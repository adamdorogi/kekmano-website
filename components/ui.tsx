import Link from "next/link";
import { ArrowRight, Phone, FileText, Star, ChevronRight } from "lucide-react";
import { business } from "@/lib/site";
import type { ReactNode } from "react";

export function CallButton({
  className = "",
  label = business.phone,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      className={`button button-primary ${className}`}
      href={business.phoneHref}
    >
      <Phone size={21} aria-hidden="true" />
      {label}
    </a>
  );
}

export function QuoteButton({
  className = "",
  href = "/kapcsolat#ajanlatkeres",
  children = "Ajánlatot kérek",
}: {
  className?: string;
  href?: string;
  children?: ReactNode;
}) {
  return (
    <Link className={`button button-secondary ${className}`} href={href}>
      <FileText size={21} aria-hidden="true" />
      {children}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link className={`text-link ${className}`} href={href}>
      {children}
      <ArrowRight size={19} aria-hidden="true" />
    </Link>
  );
}

export function Stars() {
  return (
    <span className="stars" aria-label="5 csillagból 5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={18}
          fill="currentColor"
          strokeWidth={0}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function GoogleMark() {
  return (
    <svg
      className="google-mark"
      viewBox="0 0 48 48"
      aria-label="Google"
      role="img"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.74 6C44.41 38.02 46.98 31.87 46.98 24.55Z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59C10.05 27.14 9.77 25.6 9.77 24s.28-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19Z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.74-6c-2.15 1.45-4.92 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
      />
    </svg>
  );
}

export function ReviewProof() {
  return (
    <a
      className="review-proof"
      href={business.trustindex}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="5,0 értékelés, több mint 1000 ügyfélvélemény a Google-ön – megnyitás új lapon"
    >
      <GoogleMark />
      <strong>5,0</strong>
      <Stars />
      <span>1000+ ügyfélvélemény</span>
    </a>
  );
}

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className="breadcrumb" aria-label="Morzsamenü">
      <Link href="/">Főoldal</Link>
      <ChevronRight size={14} aria-hidden="true" />
      <span aria-current="page">{current}</span>
    </nav>
  );
}
