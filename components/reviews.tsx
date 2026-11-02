"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials, business } from "@/lib/site";
import { GoogleMark, Stars } from "./ui";

function ReviewCard({
  review,
  index,
}: {
  review: (typeof testimonials)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const quote = useRef<HTMLQuoteElement>(null);
  const quoteId = useId();
  useEffect(() => {
    const node = quote.current;
    if (!node || expanded) return;
    const measure = () =>
      setTruncated(node.scrollHeight > node.clientHeight + 1);
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    measure();
    return () => observer.disconnect();
  }, [expanded]);
  return (
    <figure className="review">
      <Stars />
      <blockquote
        id={quoteId}
        ref={quote}
        className={!expanded ? "review-quote-collapsed" : undefined}
      >
        „{review.text}”
      </blockquote>
      {truncated && (
        <button
          type="button"
          className="review-more"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={quoteId}
        >
          {expanded ? "Rövidebben" : "Teljes vélemény"}
        </button>
      )}
      <figcaption>
        <span className={`review-initial tone-${index % 3}`}>
          {review.photo && !photoFailed ? (
            <Image
              src={review.photo}
              width={39}
              height={39}
              alt=""
              loading="eager"
              onError={() => setPhotoFailed(true)}
            />
          ) : (
            review.name[0]
          )}
        </span>
        <span>
          <strong>{review.name}</strong>
          <small>Google-vélemény</small>
        </span>
        <GoogleMark />
      </figcaption>
    </figure>
  );
}

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
          {testimonials.map((review, index) => (
            <ReviewCard key={review.name} review={review} index={index} />
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
