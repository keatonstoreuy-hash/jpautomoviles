import { site, waLink } from '@/lib/site';
import { IconClock, IconFacebook, IconInstagram, IconPhone, IconPin, IconWhatsApp } from './icons';

export function TopBar() {
  return (
    <div className="hidden bg-ink text-white/70 md:block">
      <div className="wrap flex h-9 items-center justify-between text-xs">
        <div className="flex items-center gap-5">
          <a href={`tel:${site.phone.landlineIntl}`} className="inline-flex items-center gap-1.5 hover:text-white">
            <IconPhone className="h-3.5 w-3.5 text-red" /> {site.phone.landline}
          </a>
          <span className="inline-flex items-center gap-1.5">
            <IconPin className="h-3.5 w-3.5 text-red" /> {site.address}, {site.city}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconClock className="h-3.5 w-3.5 text-red" /> {site.hoursText}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a href={waLink()} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 hover:text-white">
            <IconWhatsApp className="h-3.5 w-3.5 text-red" /> {site.phone.mobile}
          </a>
          <span className="h-3.5 w-px bg-white/15" />
          <a href={site.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-white">
            <IconInstagram className="h-4 w-4" />
          </a>
          <a href={site.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-white">
            <IconFacebook className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
