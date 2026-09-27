import React from 'react';
import { Sparkles, Clock, Check, Calendar, ArrowRight } from 'lucide-react';
import { Language, DentalService } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { DENTAL_SERVICES } from '../data/clinicData';

interface ServicesSectionProps {
  lang: Language;
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onSelectService,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
            {lang === 'en' ? 'Clinical Excellence' : 'الخدمات والعلاجات التخصصية'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-display">
            {t.services.sectionTitle}
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            {t.services.sectionSubtitle}
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DENTAL_SERVICES.map((srv, index) => {
            const isFeatured = index === 0 || index === 1;
            return (
              <div
                key={srv.id}
                className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                  isFeatured
                    ? 'border-teal-300 shadow-sm relative ring-1 ring-teal-200/50'
                    : 'border-slate-200 shadow-2xs hover:shadow-xs'
                }`}
              >
                <div>
                  {/* Top Category and Numbering */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                    <span>{`0${index + 1}.`} {srv.category}</span>
                    {srv.popular && (
                      <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                        {t.services.popularTag}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {lang === 'en' ? srv.title : srv.titleAr}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {lang === 'en' ? srv.shortDesc : srv.shortDescAr}
                  </p>

                  {/* Bullets */}
                  <ul className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                    {(lang === 'en' ? srv.details : srv.detailsAr).map((detail, dIdx) => (
                      <li key={dIdx} className="text-xs text-slate-700 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{srv.estimatedDuration}</span>
                    </span>
                    <span className="font-bold text-teal-700 font-mono tabular-nums">
                      {srv.estimatedPriceQAR}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectService(lang === 'en' ? srv.title : srv.titleAr)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-teal-600 text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t.services.bookThisTreatment}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing transparency disclaimer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          {t.services.note}
        </div>

      </div>
    </section>
  );
};
