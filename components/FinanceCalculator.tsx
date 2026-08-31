'use client';

import { useMemo, useState } from 'react';
import { currency, site, waLink } from '@/lib/site';
import { IconCalc, IconWhatsApp } from './icons';

const money = (n: number) =>
  isFinite(n) ? currency.format(Math.round(n)) : '—';

export function FinanceCalculator({
  basePrice = 20000,
  vehicleName,
  compact = false,
}: {
  basePrice?: number;
  vehicleName?: string;
  compact?: boolean;
}) {
  const [price, setPrice] = useState(basePrice);
  const [downPct, setDownPct] = useState(30);
  const [term, setTerm] = useState(36);
  const [rate, setRate] = useState(18); // tasa anual estimada (%)

  const result = useMemo(() => {
    const down = (price * downPct) / 100;
    const financed = Math.max(price - down, 0);
    const i = rate / 100 / 12;
    const n = term;
    const monthly =
      i === 0 ? financed / n : (financed * i) / (1 - Math.pow(1 + i, -n));
    const total = monthly * n + down;
    return { down, financed, monthly, total };
  }, [price, downPct, term, rate]);

  const waMsg = `Hola JP Automóviles, quería consultar por una financiación${
    vehicleName ? ` de ${vehicleName}` : ''
  }.\nPrecio: ${money(price)}\nEntrega: ${money(result.down)} (${downPct}%)\nPlazo: ${term} meses\nCuota estimada: ${money(result.monthly)}`;

  return (
    <div className={compact ? '' : 'card p-6 sm:p-8'}>
      {!compact && (
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-gold">
            <IconCalc className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-display text-xl font-800 uppercase">Simulá tu cuota</h3>
            <p className="text-sm text-steel-600">Estimación orientativa. La cuota final se confirma según el plan.</p>
          </div>
        </div>
      )}

      <div className="grid gap-5">
        {compact ? (
          <div className="flex items-center justify-between rounded-lg bg-paper-muted px-4 py-3">
            <span className="label mb-0">Precio del vehículo</span>
            <span className="font-display text-lg font-800">{money(price)}</span>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <label className="label mb-0">Precio del vehículo</label>
              <span className="font-display text-lg font-600">{money(price)}</span>
            </div>
            <input
              type="range" min={3000} max={80000} step={500}
              value={price} onChange={(e) => setPrice(+e.target.value)}
              className="mt-2 w-full accent-gold"
            />
          </div>
        )}

        <div>
          <div className="flex items-center justify-between">
            <label className="label mb-0">Entrega inicial ({downPct}%)</label>
            <span className="font-600">{money(result.down)}</span>
          </div>
          <input
            type="range" min={0} max={80} step={5}
            value={downPct} onChange={(e) => setDownPct(+e.target.value)}
            className="mt-2 w-full accent-gold"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Plazo (meses)</label>
            <select className="field" value={term} onChange={(e) => setTerm(+e.target.value)}>
              {[12, 18, 24, 36, 48, 60].map((m) => (
                <option key={m} value={m}>{m} meses</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Tasa anual estimada</label>
            <select className="field" value={rate} onChange={(e) => setRate(+e.target.value)}>
              {[12, 15, 18, 22, 26].map((r) => (
                <option key={r} value={r}>{r}%</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-ink p-5 text-paper">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-600 uppercase tracking-wide text-paper/60">Cuota mensual estimada</p>
            <p className="font-display text-3xl font-800 text-gold-soft">{money(result.monthly)}</p>
          </div>
          <div className="text-right text-xs text-paper/60">
            <p>Monto a financiar</p>
            <p className="text-sm font-600 text-paper">{money(result.financed)}</p>
          </div>
        </div>
      </div>

      <a
        href={waLink(waMsg)}
        target="_blank"
        rel="noopener"
        className="btn-wa mt-4 w-full"
      >
        <IconWhatsApp className="h-5 w-5" /> Solicitar esta financiación
      </a>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-steel-400">
        Valores estimados en dólares, no constituyen una oferta de crédito. Sujeto a aprobación crediticia y a las
        condiciones vigentes de {site.name}.
      </p>
    </div>
  );
}
