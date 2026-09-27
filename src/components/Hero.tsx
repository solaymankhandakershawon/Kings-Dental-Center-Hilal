import React from 'react';
import { Star, MapPin, Calendar, Clock, ArrowRight, ShieldCheck, CheckCircle2, Navigation } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CLINIC_INFO } from '../data/clinicData';
import { ClinicStatus } from '../utils/hoursHelper';

interface HeroProps {
  lang: Language;
  clinicStatus: ClinicStatus;
  isSimulatedClosed: boolean;
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  clinicStatus,
  isSimulatedClosed,
  onBookClick,
}) => {
  const t = TRANSLATIONS[lang];
  const effectiveIsOpen = isSimulatedClosed ? false : clinicStatus.isOpen;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-teal-50/20 to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Metadata line without pill clutter */}
            <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-slate-500 font-medium">
              <span className="text-teal-700 font-semibold">{t.hero.badge}</span>
              <span aria-hidden="true">·</span>
              <span>{CLINIC_INFO.crNumber}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-700">D-Ring Road</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display text-balance leading-tight">
              {t.hero.headline}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {t.hero.subheadline}
            </p>

            {/* Real-time Status Card & Google Rating Card (Side by side) */}
            <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
              {/* Live Hours Status */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full shrink-0 ${
                    effectiveIsOpen ? 'bg-emerald-500 ring-4 ring-emerald-100 animate-pulse' : 'bg-amber-500 ring-4 ring-amber-100'
                  }`}
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {effectiveIsOpen
                      ? lang === 'en'
                        ? 'Open Now · Closes 11:00 PM'
                        : 'مفتوح الآن · يغلق ١١:٠٠ م'
                      : lang === 'en'
                      ? 'Closed · Opens 9:00 AM'
                      : 'مغلق حالياً · يفتح ٩:٠٠ ص'}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {effectiveIsOpen
                      ? (lang === 'en' ? clinicStatus.countdownEn : clinicStatus.countdownAr)
                      : (lang === 'en' ? 'Emergency on-call available' : 'طوارئ الأسنان تحت الطلب')}
                  </div>
                </div>
              </div>

              {/* Google Reviews Trust */}
              <a
                href="#reviews"
                className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3 hover:border-teal-300 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 border border-amber-200/60">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>4.8 / 5.0</span>
                    <span className="text-[11px] font-normal text-slate-500">(384+ Google Reviews)</span>
                  </div>
                  <div className="text-[11px] text-teal-600 font-medium group-hover:underline">
                    {lang === 'en' ? 'Verified Patient Feedback →' : 'آراء المرضى الموثقة ←'}
                  </div>
                </div>
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBookClick}
                className="px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.hero.ctaBook}</span>
              </button>

              <a
                href="#location"
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm sm:text-base border border-slate-200 shadow-2xs transition-colors inline-flex items-center gap-2"
              >
                <Navigation className="w-4 h-4 text-teal-600" />
                <span>{t.hero.ctaDirections}</span>
              </a>

              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent('Hello Kings Dental Center Hilal, I would like to book a dental consultation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-sm sm:text-base border border-emerald-200 transition-colors inline-flex items-center gap-2"
              >
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Feature Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200/80 text-xs">
              <div>
                <div className="font-bold text-slate-800">{t.hero.feature1Title}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">{t.hero.feature1Desc}</div>
              </div>
              <div>
                <div className="font-bold text-slate-800">{t.hero.feature2Title}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">{t.hero.feature2Desc}</div>
              </div>
              <div>
                <div className="font-bold text-slate-800">{t.hero.feature3Title}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">{t.hero.feature3Desc}</div>
              </div>
              <div>
                <div className="font-bold text-slate-800">{t.hero.feature4Title}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">{t.hero.feature4Desc}</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 group">
              <img
                src="/src/assets/images/hero_kings_dental_clinic_1790537814778.jpg"
                alt="Kings Dental Center Hilal clinic interior in Doha"
                className="w-full h-80 sm:h-96 lg:h-[440px] object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Floating clinic badge overlay at bottom of photo */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold font-display">
                      {lang === 'en' ? 'Kings Dental Center - Hilal Branch' : 'مركز كينغز للأسنان - فرع الهلال'}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
                      <span className="truncate">Ibn Al Tayyeb St, Zone 43, Nuaija, Doha</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {lang === 'en' ? 'Free Parking' : 'مواقف مجانية'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
