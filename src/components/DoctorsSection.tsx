import React from 'react';
import { Award, GraduationCap, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { DOCTORS } from '../data/clinicData';

interface DoctorsSectionProps {
  lang: Language;
  onBookWithDoctor: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  lang,
  onBookWithDoctor,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="doctors" className="py-16 sm:py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
            {lang === 'en' ? 'Medical Leadership' : 'الكادر الطبي المتخصص'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-display">
            {t.doctors.sectionTitle}
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            {t.doctors.sectionSubtitle}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-sm transition-shadow grid sm:grid-cols-12"
            >
              {/* Doctor Photo (5 cols) */}
              <div className="sm:col-span-5 relative h-64 sm:h-auto min-h-[220px]">
                <img
                  src={doc.image}
                  alt={lang === 'en' ? doc.name : doc.nameAr}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-900/60 via-transparent to-transparent sm:hidden" />
              </div>

              {/* Doctor Details (7 cols) */}
              <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-teal-700">
                    {lang === 'en' ? doc.title : doc.titleAr}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-display mt-0.5">
                    {lang === 'en' ? doc.name : doc.nameAr}
                  </h3>

                  <div className="mt-3 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{lang === 'en' ? doc.specialty : doc.specialtyAr}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{doc.experience}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{doc.education}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/70">
                  <button
                    onClick={() => onBookWithDoctor(lang === 'en' ? doc.name : doc.nameAr)}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'en' ? `Book with ${doc.name.split(' ')[1] || doc.name}` : `حجز مع ${doc.nameAr}`}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
