"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Play,
  X,
  ZoomIn,
} from "lucide-react";
import media from "@/content/references.json";

export function ReferenceGallery({ preview = false }: { preview?: boolean }) {
  const [limit, setLimit] = useState(preview ? 6 : 12);
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const items = media.gallery;
  useEffect(() => {
    if (selected !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [selected]);
  const close = () => {
    dialog.current?.close();
    setSelected(null);
    trigger.current?.focus();
  };
  return (
    <>
      <div className="reference-gallery">
        {items.slice(0, limit).map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className="gallery-photo"
            onClick={(event) => {
              trigger.current = event.currentTarget;
              setSelected(index);
            }}
            aria-label={`${index + 1}. munkafotó nagyítása`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 600px) 50vw, (max-width: 1000px) 45vw, 430px"
            />
            <span className="gallery-zoom">
              <ZoomIn size={19} aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
      {!preview && limit < items.length && (
        <div className="gallery-more">
          <button
            type="button"
            className="button button-secondary"
            onClick={() => setLimit((v) => v + 12)}
          >
            További munkafotók
            <ArrowDown size={19} />
          </button>
          <p>
            {Math.min(limit, items.length)} / {items.length} fotó
          </p>
        </div>
      )}
      <dialog
        className="photo-dialog"
        ref={dialog}
        aria-label="Munkafotó nagyítva"
        onCancel={() => {
          setSelected(null);
          trigger.current?.focus();
        }}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            setSelected((v) => ((v ?? 0) + 1) % items.length);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            setSelected((v) => ((v ?? 0) - 1 + items.length) % items.length);
          }
        }}
      >
        <button
          type="button"
          className="dialog-close icon-button"
          onClick={close}
          aria-label="Fotó bezárása"
        >
          <X size={24} />
        </button>
        {selected !== null && (
          <>
            <div className="dialog-image">
              <Image
                src={items[selected].src}
                alt={items[selected].alt}
                fill
                sizes="90vw"
              />
            </div>
            <div className="dialog-controls">
              <button
                className="icon-button"
                type="button"
                onClick={() =>
                  setSelected(
                    (v) => ((v ?? 0) - 1 + items.length) % items.length,
                  )
                }
                aria-label="Előző fotó"
              >
                <ArrowLeft size={23} />
              </button>
              <p>
                {selected + 1} / {items.length}
                <span>Kék Manó · Helyszíni munkafotó</span>
              </p>
              <button
                className="icon-button"
                type="button"
                onClick={() =>
                  setSelected((v) => ((v ?? 0) + 1) % items.length)
                }
                aria-label="Következő fotó"
              >
                <ArrowRight size={23} />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}

function Video({
  id,
  title,
  index,
}: {
  id: string;
  title: string;
  index: number;
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <article className="video-card">
      <div className="video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${title} – videó lejátszása`}
          >
            {!failed && (
              <Image
                src={`/images/video-${id}.jpg`}
                alt=""
                fill
                sizes="(max-width: 700px) 100vw, 600px"
                onError={() => setFailed(true)}
              />
            )}
            <span className="play-button">
              <Play
                size={28}
                fill="currentColor"
                strokeWidth={0}
                aria-hidden="true"
              />
            </span>
            <span className="video-play-label">Videó lejátszása</span>
          </button>
        )}
      </div>
      <div className="video-caption">
        <h3>{title.replace(/\s*[-–]\s*K[Éé]k\s*[Mm]an[oó].*$/i, "")}</h3>
        <a
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${index + 1}. referencia videó a YouTube-on – új lapon`}
        >
          <ExternalLink size={18} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function ReferenceVideos() {
  return (
    <div className="video-grid">
      {media.videos.map((video, index) => (
        <Video key={video.id} {...video} index={index} />
      ))}
    </div>
  );
}
