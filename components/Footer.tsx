import Link from 'next/link';
import { Logo } from './Logo';
import { site, waLink } from '@/lib/site';
import { IconClock, IconFacebook, IconInstagram, IconPin, IconWhatsApp } from './icons';

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
            Automotora en Paysandú. Compra, venta, permuta y financiación de vehículos usados y 0 km,
            con atención personalizada y respaldo.
          </p>
          <div className="mt-5 flex gap-2.5">
            <a href={site.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-paper/15 text-paper/80 transition hover:border-red hover:text-red">
              <IconInstagram className="h-5 w-5" />
            </a>
            <a href={site.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-paper/15 text-paper/80 transition hover:border-red hover:text-red">
              <IconFacebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-700 uppercase tracking-[0.18em] text-red-soft">Navegación</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
            <li><Link href="/catalogo" className="hover:text-paper">Catálogo de autos</Link></li>
            <li><Link href="/financiacion" className="hover:text-paper">Calculadora de cuotas</Link></li>
            <li><Link href="/permuta" className="hover:text-paper">Tasá tu usado</Link></li>
            <li><Link href="/#nosotros" className="hover:text-paper">Nosotros</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-700 uppercase tracking-[0.18em] text-red-soft">Horarios</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
            <li className="flex items-start gap-2"><IconClock className="mt-0.5 h-4 w-4 shrink-0 text-red" /> {site.hoursText}</li>
            <li>Sábados: consultar</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-700 uppercase tracking-[0.18em] text-red-soft">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-paper/70">
            <li className="flex items-start gap-2"><IconPin className="mt-0.5 h-4 w-4 shrink-0 text-red" /> {site.address}, {site.city}</li>
            <li>
              <a href={waLink()} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-paper">
                <IconWhatsApp className="h-4 w-4 text-red" /> {site.phone.mobile}
              </a>
            </li>
            <li><a href={`tel:${site.phone.landlineIntl}`} className="hover:text-paper">Tel: {site.phone.landline}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="wrap flex flex-col items-center justify-between gap-2 py-5 text-xs text-paper/45 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. Todos los derechos reservados.</p>
          <p>Paysandú, Uruguay · Usados garantidos · Permuta y financiación</p>
        </div>
      </div>
    </footer>
  );
}
