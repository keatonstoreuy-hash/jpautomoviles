'use client';

type Review = { name: string; tag: string; text: string };

const reviews: Review[] = [
  { name: 'Marcelo D.', tag: 'Compra de usado', text: 'Muy buena atención, me explicaron todo con paciencia y el auto estaba impecable. Recomiendo.' },
  { name: 'Carolina S.', tag: 'Permuta', text: 'Entregué mi auto en parte de pago sin vueltas. Precio justo y trato de primera.' },
  { name: 'Rodrigo P.', tag: 'Financiación', text: 'Me armaron un plan de cuotas que me cerraba. Salí manejando mi camioneta en pocos días.' },
  { name: 'Valentina R.', tag: 'Compra 0 km', text: 'Excelente experiencia de principio a fin. Cumplieron con todo lo que me prometieron.' },
  { name: 'Gustavo M.', tag: 'Camioneta', text: 'Compré una pick up y quedé muy conforme. Gente seria y transparente, volvería a comprar.' },
  { name: 'Lucía F.', tag: 'Primer auto', text: 'Me asesoraron un montón para mi primer auto. Muy buena onda y sin apurarme.' },
  { name: 'Diego A.', tag: 'Permuta + financiación', text: 'Entregué el mío y financié la diferencia. Todo claro y rápido. Súper recomendables.' },
];

export function Testimonials() {
  const row = [...reviews, ...reviews];
  return (
    <div className="marquee-mask overflow-hidden">
      <div className="marquee-track gap-6 hover:[animation-play-state:paused]">
        {row.map((r, i) => (
          <figure key={`${r.name}-${i}`} className="w-[300px] shrink-0 rounded-lg border border-ink/[.08] bg-white p-6 shadow-card">
            <div className="mb-3 flex gap-0.5 text-gold" aria-hidden>
              {Array.from({ length: 5 }).map((_, k) => <span key={k}>★</span>)}
            </div>
            <blockquote className="text-sm leading-relaxed text-steel-800">“{r.text}”</blockquote>
            <figcaption className="mt-4 border-t border-ink/[.06] pt-3">
              <p className="font-700 text-ink">{r.name}</p>
              <p className="text-xs text-steel-400">{r.tag}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
