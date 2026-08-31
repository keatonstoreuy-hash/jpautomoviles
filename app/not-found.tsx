import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IconArrow } from '@/components/icons';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="wrap grid min-h-[52vh] place-items-center py-20 text-center">
        <div>
          <p className="font-display text-6xl font-700 text-gold">404</p>
          <h1 className="mt-3 font-display text-2xl font-800 uppercase">No encontramos esta página</h1>
          <p className="mt-2 text-steel-600">Puede que el vehículo ya se haya vendido o el enlace sea antiguo.</p>
          <Link href="/catalogo" className="btn-primary mt-6">
            Ver catálogo <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
