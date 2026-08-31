// Configuración central del sitio — datos reales de JP Automóviles.
// Cambiá acá cualquier dato de contacto y se actualiza en toda la web.

export const site = {
  name: 'JP Automóviles',
  legalName: 'JP Automóviles',
  tagline: 'Autos usados y 0 km seleccionados en Paysandú',
  description:
    'Automotora en Paysandú, Uruguay. Compra, venta, permuta y financiación de vehículos usados y 0 km multimarca. Jeep, RAM, Ford y más, con garantía y atención personalizada.',
  // Se toma de la variable NEXT_PUBLIC_SITE_URL en Vercel; si no está, usa el dominio por defecto.
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://jp-automoviles.vercel.app').replace(/\/$/, ''),
  city: 'Paysandú',
  region: 'Paysandú',
  country: 'UY',
  address: 'Entre Ríos 1434',
  postalCode: '60000',
  geo: { lat: -32.3214, lng: -58.0756 }, // aprox. centro de Paysandú; ajustar con Google Maps
  phone: {
    landline: '4723 1314',
    landlineIntl: '+59847231314',
    mobile: '091 306 991',
    mobileIntl: '+59891306991',
    whatsapp: '59891306991', // para wa.me
  },
  hours: [
    { days: 'Lunes a Viernes', open: '08:00', close: '18:00' },
  ],
  hoursText: 'Lun a Vie 08:00 – 18:00',
  email: 'contacto@jpautomoviles.com.uy', // placeholder — reemplazar por el real
  social: {
    instagram: 'https://www.instagram.com/jp_automoviles/',
    facebook: 'https://www.facebook.com/p/JP-Autom%C3%B3viles-100055532901471/',
  },
  mapsQuery: 'JP Automóviles, Entre Ríos 1434, Paysandú, Uruguay',
} as const;

export function waLink(message?: string) {
  const base = `https://wa.me/${site.phone.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const currency = new Intl.NumberFormat('es-UY', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const numberFmt = new Intl.NumberFormat('es-UY');
