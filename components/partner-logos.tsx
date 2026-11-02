"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { partners } from "@/lib/site";

export function PartnerLogos() {
  const viewport = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLUListElement>(null);
  const [interacting, setInteracting] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const node = viewport.current;
    const firstGroup = group.current;
    if (!node || !firstGroup || interacting || hovered || focused) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    let previous = 0;
    let width = firstGroup.getBoundingClientRect().width;
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
    };
    const tick = (now: number) => {
      if (previous && width > 0)
        node.scrollLeft =
          (node.scrollLeft + (Math.min(now - previous, 50) / 1000) * 26) %
          width;
      previous = now;
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      stop();
      if (visible && !document.hidden && !reducedMotion.matches)
        frame = requestAnimationFrame(tick);
    };
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const resize = new ResizeObserver(() => {
      width = firstGroup.getBoundingClientRect().width;
    });
    intersection.observe(node);
    resize.observe(firstGroup);
    reducedMotion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      stop();
      intersection.disconnect();
      resize.disconnect();
      reducedMotion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [interacting, hovered, focused]);

  return (
    <div
      className="partner-carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setInteracting(false);
      }}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <p className="partner-caption">
        Magánszemélyektől a nagyvállalatokig, sokan bízzák ránk.
      </p>
      <div
        className="partner-logos"
        ref={viewport}
        role="region"
        aria-label="Ügyfeleink logói"
        tabIndex={0}
        onPointerDown={() => setInteracting(true)}
        onPointerUp={() => setInteracting(false)}
        onPointerCancel={() => setInteracting(false)}
      >
        {[false, true].map((duplicate) => (
          <ul
            className="partner-logo-group"
            key={String(duplicate)}
            ref={duplicate ? undefined : group}
            aria-hidden={duplicate || undefined}
          >
            {partners.map(([name, image]) => (
              <li key={image}>
                <Image
                  src={`/images/${image}`}
                  width={225}
                  height={90}
                  alt={duplicate ? "" : name}
                  sizes="(max-width: 760px) 130px, 180px"
                  loading="eager"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
