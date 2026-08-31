'use client';

import Image from 'next/image';
import { useState } from 'react';
import { IconArrow } from './icons';

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const pics = images.length ? images : [];
  const [active, setActive] = useState(0);

  if (!pics.length) {
    return <div className="grid aspect-[16/10] w-full place-items-center rounded-lg bg-steel-100 text-steel-400">Sin fotos</div>;
  }

  const go = (d: number) => setActive((a) => (a + d + pics.length) % pics.length);

  return (
    <div>
      <div className="group relative aspect-[16/10] overflow-hidden rounded-lg bg-steel-100">
        <Image
          key={active}
          src={pics[active]}
          alt={`${alt} — foto ${active + 1}`}
          fill
          priority
          sizes="(max-width:1024px) 100vw, 60vw"
          className="animate-fade-up object-cover"
        />
        {pics.length > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Anterior"
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 rotate-180 place-items-center rounded-full bg-paper/85 text-ink opacity-0 shadow-card transition group-hover:opacity-100">
              <IconArrow className="h-5 w-5" />
            </button>
            <button onClick={() => go(1)} aria-label="Siguiente"
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-paper/85 text-ink opacity-0 shadow-card transition group-hover:opacity-100">
              <IconArrow className="h-5 w-5" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-600 text-paper">
              {active + 1} / {pics.length}
            </span>
          </>
        )}
      </div>

      {pics.length > 1 && (
        <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
          {pics.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                i === active ? 'border-red' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
