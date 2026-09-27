import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CLINIC_INFO } from '../data/clinicData';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center font-bold text-sm">
                K
              </span>
              <span className="text-base font-bold text-white font-display">
                {lang === 'en' ? CLINIC_INFO.name : CLINIC_INFO.nameAr}
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {lang === 'en' ? CLINIC_INFO.tagline : CLINIC_INFO.taglineAr}.{' '}
              {lang === 'en'
                ? 'Providing Doha families and professionals with advanced clinical dentistry under one roof.'
                : 'رعاية أسنان شاملة ومتقدمة لجميع أفراد الأسرة في الدوحة تحت سقف واحد.'}
            </p>

            <div className="text-[11px] text-slate-500 font-mono">
              {CLINIC_INFO.crNumber} · Doha, Qatar
            </div>
          </div>

          {/* Quick links (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Quick Navigation' : 'روابط سريعة'}
            </div>
            <div>
              <a href="#services" className="hover:text-teal-400 transition-colors">
                {t.nav.treatments}
              </a>
            </div>
            <div>
              <a href="#hours" className="hover:text-teal-400 transition-colors">
                {t.nav.hours}
              </a>
            </div>
            <div>
              <a href="#reviews" className="hover:text-teal-400 transition-colors">
                {t.nav.reviews}
              </a>
            </div>
            <div>
              <a href="#location" className="hover:text-teal-400 transition-colors">
                {t.nav.location}
              </a>
            </div>
            <div>
              <a href="#doctors" className="hover:text-teal-400 transition-colors">
                {lang === 'en' ? 'Medical Specialists' : 'الأطباء الأخصائيين'}
              </a>
            </div>
          </div>

          {/* Direct Contact (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Al Hilal Clinic Contacts' : 'معلومات التواصل المباشر'}
            </div>

            <div className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>{lang === 'en' ? CLINIC_INFO.address : CLINIC_INFO.addressAr}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{CLINIC_INFO.phonePrimary} / {CLINIC_INFO.phoneSecondary}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Sat–Thu: 9:00 AM – 11:00 PM | Fri: 2:00 PM – 10:00 PM</span>
            </div>

            <div className="pt-2">
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 inline-flex items-center gap-1 font-semibold"
              >
                <span>{lang === 'en' ? 'Google Maps Business Listing' : 'صفحة المركز على خرائط جوجل'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {CLINIC_INFO.name}. {t.footer.rights} ({CLINIC_INFO.crNumber})
          </div>
          <div>
            {t.footer.mophNotice}
          </div>
        </div>

      </div>
    </footer>
  );
};
