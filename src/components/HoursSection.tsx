import React from 'react';
import { Clock, CheckCircle2, AlertCircle, PhoneCall, Calendar, ShieldAlert } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { WEEKLY_HOURS, CLINIC_INFO } from '../data/clinicData';
import { ClinicStatus } from '../utils/hoursHelper';

interface HoursSectionProps {
  lang: Language;
  clinicStatus: ClinicStatus;
  isSimulatedClosed: boolean;
  onBookClick: () => void;
}

export const HoursSection: React.FC<HoursSectionProps> = ({
  lang,
  clinicStatus,
  isSimulatedClosed,
  onBookClick,
}) => {
  const t = TRANSLATIONS[lang];
  const effectiveIsOpen = isSimulatedClosed ? false : clinicStatus.isOpen;

  return (
    <section id="hours" className="py-16 sm:py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
            {lang === 'en' ? 'Operating Schedule' : 'أوقات الدوام الرسمي'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-display">
            {t.hours.sectionTitle}
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            {t.hours.sectionSubtitle}
          </p>
        </div>

        {/* Live Status Spotlight + Emergency Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live Status & Emergency Desk (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real-time Status Banner */}
            <div
              className={`p-6 rounded-2xl border transition-all ${
                effectiveIsOpen
                  ? 'bg-emerald-50/60 border-emerald-200'
                  : 'bg-amber-50/60 border-amber-200'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className={`w-3.5 h-3.5 rounded-full ${
                    effectiveIsOpen ? 'bg-emerald-500 animate-pulse ring-4 ring-emerald-100' : 'bg-amber-500 ring-4 ring-amber-100'
                  }`}
                />
                <span
                  className={`text-xs font-bold tracking-wide uppercase ${
                    effectiveIsOpen ? 'text-emerald-800' : 'text-amber-800'
                  }`}
                >
                  {effectiveIsOpen ? t.hours.openNowBadge : t.hours.closedNowBadge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 font-display">
                {effectiveIsOpen
                  ? lang === 'en'
                    ? clinicStatus.statusLabelEn
                    : clinicStatus.statusLabelAr
                  : lang === 'en'
                  ? 'Closed · Opens Tomorrow at 9:00 AM'
                  : 'مغلق حالياً · يفتح غداً في تمام ٩:٠٠ صباحاً'}
              </h3>

              <div className="mt-2 text-sm text-slate-600 flex items-center gap-2 font-mono">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  {effectiveIsOpen
                    ? lang === 'en'
                      ? `${t.hours.closingCountdown}: ${clinicStatus.countdownEn}`
                      : `${t.hours.closingCountdown}: ${clinicStatus.countdownAr}`
                    : lang === 'en'
                    ? `${t.hours.openingCountdown}: ${clinicStatus.countdownEn}`
                    : `${t.hours.openingCountdown}: ${clinicStatus.countdownAr}`}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-500 flex items-center justify-between">
                <span>{lang === 'en' ? 'Local Time in Qatar:' : 'التوقيت المحلي في قطر:'}</span>
                <span className="font-semibold text-slate-700 font-mono">{clinicStatus.currentDohaTimeFormatted}</span>
              </div>
            </div>

            {/* Emergency Dental Desk */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>{t.hours.emergencyTitle}</span>
              </div>
              <h4 className="text-lg font-bold font-display text-white">
                {lang === 'en' ? 'Urgent Toothache or Dental Trauma?' : 'ألم أسنان حاد أو كسر مفاجئ؟'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.hours.emergencyDesc}
              </p>
              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href={`tel:${CLINIC_INFO.phonePrimary}`}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{CLINIC_INFO.phonePrimary}</span>
                </a>
                <button
                  onClick={onBookClick}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.nav.bookConsultation}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Weekly Schedule Table (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-sm font-bold text-slate-900">
                {lang === 'en' ? 'Day of the Week' : 'اليوم'}
              </span>
              <span className="text-sm font-bold text-slate-900">
                {lang === 'en' ? 'Clinic Hours' : 'أوقات العمل'}
              </span>
            </div>

            <div className="divide-y divide-slate-200/70">
              {WEEKLY_HOURS.map((item) => {
                const isToday = item.dayIndex === clinicStatus.dohaDayIndex;
                return (
                  <div
                    key={item.day}
                    className={`py-3.5 px-3 rounded-lg flex items-center justify-between transition-colors ${
                      isToday
                        ? 'bg-teal-50/90 font-semibold text-teal-900 border border-teal-200/80 shadow-2xs'
                        : 'hover:bg-slate-100/60 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {lang === 'en' ? item.day : item.dayAr}
                      </span>
                      {isToday && (
                        <span className="text-[11px] font-bold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-full">
                          {t.hours.todayBadge}
                        </span>
                      )}
                      {item.isSpecial && (
                        <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60 hidden sm:inline">
                          {lang === 'en' ? 'After Friday Prayers' : 'بعد صلاة الجمعة'}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-mono tabular-nums text-slate-900">
                      {lang === 'en' ? item.displayHours : item.displayHoursAr}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Friday Notice */}
            <div className="mt-4 p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 leading-relaxed flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{lang === 'en' ? 'Friday Timings Note:' : 'ملاحظة مواعيد يوم الجمعة:'}</p>
                <p className="text-blue-800 mt-0.5">{t.hours.fridayNote}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
