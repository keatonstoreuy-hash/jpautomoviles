import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: `Términos y condiciones de uso del sitio de ${site.name}.`,
  alternates: { canonical: '/terminos' },
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <>
      <Navbar />
      <article className="wrap max-w-3xl py-12 sm:py-16">
        <h1 className="font-display text-3xl font-800 uppercase sm:text-4xl">Términos y Condiciones</h1>
        <p className="mt-2 text-sm text-steel-400">Última actualización: agosto de 2026</p>

        <div className="mt-8 space-y-6 leading-relaxed text-steel-800">
          <p>
            El uso de este sitio implica la aceptación de los siguientes términos. {site.name} se reserva
            el derecho de actualizarlos en cualquier momento.
          </p>
          <div>
            <h2 className="font-display text-lg font-800 uppercase">Información de los vehículos</h2>
            <p className="mt-2">
              Los precios, fotos y características publicadas son de referencia y pueden variar sin previo
              aviso. La disponibilidad de cada unidad está sujeta a confirmación. Las cuotas de
              financiación son estimaciones orientativas y no constituyen una oferta de crédito.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-800 uppercase">Uso del sitio</h2>
            <p className="mt-2">
              El contenido de este sitio es propiedad de {site.name}. No está permitida su reproducción
              con fines comerciales sin autorización.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-800 uppercase">Consultas</h2>
            <p className="mt-2">
              Para confirmar precios, disponibilidad y condiciones, comunicate con nosotros por WhatsApp
              al {site.phone.mobile} o visitanos en {site.address}, {site.city}.
            </p>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
