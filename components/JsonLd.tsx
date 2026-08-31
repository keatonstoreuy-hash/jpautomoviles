import { site } from '@/lib/site';

// Datos estructurados para Google (SEO local + Rich Results).
export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    '@id': `${site.url}/#dealer`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone.mobileIntl,
    email: site.email,
    image: `${site.url}/og.jpg`,
    priceRange: '$$',
    currenciesAccepted: 'USD, UYU',
    paymentAccepted: 'Efectivo, Financiación, Permuta',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address,
      addressLocality: site.city,
      addressRegion: site.region,
      postalCode: site.postalCode,
      addressCountry: site.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    sameAs: [site.social.instagram, site.social.facebook],
    areaServed: ['Paysandú', 'Uruguay'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
