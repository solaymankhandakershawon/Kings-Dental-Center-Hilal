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
        <div className="grid md:grid-cols-3 gap-8">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/90 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Doctor Photo */}
                <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={doc.image}
                    alt={lang === 'en' ? doc.name : doc.nameAr}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-teal-800 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-teal-100 shadow-2xs">
                    {doc.experience}
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-slate-900 font-display">
                    {lang === 'en' ? doc.name : doc.nameAr}
                  </h3>
                  <p className="text-teal-700 text-sm font-semibold mb-3">
                    {lang === 'en' ? doc.title : doc.titleAr}
                  </p>
                  
                  <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <p className="font-medium text-slate-800">
                      {lang === 'en' ? doc.specialty : doc.specialtyAr}
                    </p>
                    <p className="text-slate-500">
                      {doc.education}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => onBookWithDoctor(lang === 'en' ? doc.name : doc.nameAr)}
                  className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'en' ? `Book with ${doc.name}` : `حجز موعد مع ${doc.nameAr}`}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
