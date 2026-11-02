"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials, business } from "@/lib/site";
import { GoogleMark, Stars } from "./ui";

export function Reviews() {
  const list = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const move = (direction: number) => {
    const node = list.current;
    if (node)
      node.scrollBy({
        left:
          direction *
          (node.firstElementChild?.getBoundingClientRect().width || 360),
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  return (
    <section className="section reviews-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <h2>
              Rólunk az beszél igazán,
              <br />
              aki már hívott minket.
            </h2>
            <a
              className="review-heading-proof"
              href={business.trustindex}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GoogleMark />
              <strong>5,0</strong>
              <Stars />
              <span>1000+ ügyfélvélemény a Google-ön</span>
            </a>
          </div>
          <div className="review-controls">
            <button
              className="icon-button"
              type="button"
              onClick={() => move(-1)}
              disabled={position < 4}
              aria-label="Előző ügyfélvélemény"
            >
              <ArrowLeft size={22} />
            </button>
            <button
              className="icon-button"
              type="button"
              onClick={() => move(1)}
              disabled={atEnd}
              aria-label="Következő ügyfélvélemény"
            >
              <ArrowRight size={22} />
            </button>
          </div>
        </div>
        <div
          ref={list}
          className="reviews-track"
          role="region"
          aria-label="Google ügyfélvélemények"
          tabIndex={0}
          onScroll={(event) => {
            const n = event.currentTarget;
            setPosition(n.scrollLeft);
            setAtEnd(n.scrollLeft + n.clientWidth >= n.scrollWidth - 4);
          }}
        >
          {testimonials.map((t, i) => (
            <figure className="review" key={t.name}>
              <Stars />
              <blockquote>„{t.text}”</blockquote>
              <figcaption>
                <span className={`review-initial tone-${i % 3}`}>
                  {t.name[0]}
                </span>
                <span>
                  <strong>{t.name}</strong>
                  <small>Google-vélemény</small>
                </span>
                <GoogleMark />
              </figcaption>
            </figure>
          ))}
        </div>
        <a
          href={business.trustindex}
          className="text-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          További vélemények a Google-ön
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
