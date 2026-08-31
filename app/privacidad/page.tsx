import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Políticas de Privacidad',
  description: `Políticas de privacidad de ${site.name}.`,
  alternates: { canonical: '/privacidad' },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <article className="wrap max-w-3xl py-12 sm:py-16">
        <h1 className="font-display text-3xl font-800 uppercase sm:text-4xl">Políticas de Privacidad</h1>
        <p className="mt-2 text-sm text-steel-400">Última actualización: agosto de 2026</p>

        <div className="mt-8 space-y-6 leading-relaxed text-steel-800">
          <p>
            En {site.name} respetamos tu privacidad. Esta política explica qué datos recopilamos y cómo
            los usamos cuando visitás nuestro sitio o te contactás con nosotros.
          </p>
          <div>
            <h2 className="font-display text-lg font-800 uppercase">Qué datos recopilamos</h2>
            <p className="mt-2">
              Recopilamos únicamente los datos que nos brindás voluntariamente al contactarnos (por
              ejemplo, nombre, teléfono o consultas por WhatsApp) para poder responderte y asesorarte
              sobre la compra, venta, permuta o financiación de un vehículo.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-800 uppercase">Uso de la información</h2>
            <p className="mt-2">
              Usamos tus datos exclusivamente para atender tu consulta y ofrecerte nuestros servicios. No
              vendemos ni cedemos tu información personal a terceros.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-800 uppercase">Cookies</h2>
            <p className="mt-2">
              El sitio puede usar cookies técnicas para mejorar tu experiencia de navegación. Podés
              configurarlas o bloquearlas desde tu navegador.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-800 uppercase">Contacto</h2>
            <p className="mt-2">
              Ante cualquier consulta sobre tus datos, escribinos por WhatsApp al {site.phone.mobile} o
              acercate a {site.address}, {site.city}.
            </p>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
