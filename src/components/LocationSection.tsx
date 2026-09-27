import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Copy, Check, Car, Train, Building, ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CLINIC_INFO, DOHA_LANDMARKS } from '../data/clinicData';

interface LocationSectionProps {
  lang: Language;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CLINIC_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Google Maps embed URL with exact coordinates
  const mapEmbedUrl = `https://maps.google.com/maps?q=${CLINIC_INFO.coordinates.lat},${CLINIC_INFO.coordinates.lng}&hl=${lang}&z=16&output=embed`;

  return (
    <section id="location" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
            {lang === 'en' ? 'Accessibility & Directions' : 'الموقع والملاحة المباشرة'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-display">
            {t.location.sectionTitle}
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            {t.location.sectionSubtitle}
          </p>
        </div>

        {/* Top Grid: Interactive Map + Action Center */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Live Google Map Embed (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            
            {/* Map Header with Coords & Live Status */}
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-semibold">
                  {lang === 'en' ? 'Live Google Maps View' : 'عرض مباشر لخرائط جوجل'}
                </span>
                <span className="text-slate-500 text-[11px] hidden sm:inline">
                  (25.2539° N, 51.5232° E)
                </span>
              </div>
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-teal-300 hover:text-white flex items-center gap-1 font-medium transition-colors"
              >
                <span>{lang === 'en' ? 'Full Screen' : 'تكبير الخريطة'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Iframe */}
            <div className="relative w-full h-[360px] sm:h-[420px] bg-slate-100">
              <iframe
                title="Kings Dental Center Hilal Google Maps Location"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Quick Map Action Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 font-medium">
                {lang === 'en' ? 'Direct Navigation Links:' : 'روابط الملاحة السريعة:'}
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t.location.openInGoogleMaps}</span>
                </a>
                <a
                  href={CLINIC_INFO.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.location.openInWaze}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Address Details & Amenities (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card with Copy feature */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
                {t.location.addressTitle}
              </h3>
              
              <div className="text-base font-semibold text-slate-900 font-display">
                {lang === 'en' ? CLINIC_INFO.name : CLINIC_INFO.nameAr}
              </div>
              
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {lang === 'en' ? CLINIC_INFO.address : CLINIC_INFO.addressAr}
              </p>

              <div className="mt-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">
                  {lang === 'en' ? 'Landmark tip: ' : 'علامة مميزة: '}
                </span>
                <span>{lang === 'en' ? CLINIC_INFO.nearLandmark : CLINIC_INFO.nearLandmarkAr}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={handleCopyAddress}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                  <span>{copied ? t.location.addressCopied : t.location.copyAddress}</span>
                </button>

                <div className="text-xs font-mono text-slate-500">
                  {CLINIC_INFO.crNumber}
                </div>
              </div>
            </div>

            {/* Clinic Reception Visual Card */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
              <div className="relative h-44">
                <img
                  src="/src/assets/images/clinic_reception_lounge_1790537849337.jpg"
                  alt="Kings Dental Center Hilal reception waiting lounge"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="text-xs font-semibold text-teal-300">
                    {lang === 'en' ? 'Patient Reception Lounge' : 'صالة استقبال واستراحة المرضى'}
                  </div>
                  <div className="text-sm font-bold">
                    {lang === 'en' ? 'Complimentary Arabic Coffee & Wi-Fi' : 'ضيافة القهوة العربية والإنترنت فائق السرعة'}
                  </div>
                </div>
              </div>

              {/* Amenities list */}
              <div className="p-4 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{t.location.amenity1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{t.location.amenity2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Train className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{t.location.amenity4}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Travel Times from Doha Hubs */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <Car className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-bold text-slate-900 font-display">
              {t.location.landmarksTitle}
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {DOHA_LANDMARKS.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-colors"
              >
                <div className="text-xs font-semibold text-slate-500">
                  {item.distance}
                </div>
                <div className="text-sm font-bold text-slate-900 mt-1">
                  {lang === 'en' ? item.name : item.nameAr}
                </div>
                <div className="text-base font-extrabold text-teal-700 mt-2 font-display">
                  {item.driveTime}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {lang === 'en' ? item.routeTip : item.routeTipAr}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
