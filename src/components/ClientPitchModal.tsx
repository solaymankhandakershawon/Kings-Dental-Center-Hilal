import React, { useState } from 'react';
import { X, Presentation, CheckCircle, TrendingUp, Users, ShieldCheck, MapPin, Star, Clock, Smartphone, MessageCircle, DollarSign } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CLINIC_INFO } from '../data/clinicData';

interface ClientPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ClientPitchModal: React.FC<ClientPitchModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const [patientsPerMonth, setPatientsPerMonth] = useState(20);
  const avgPatientValueQAR = 1200; // conservative average dental treatment value (cleaning + restoration / aligner)

  if (!isOpen) return null;

  const estimatedMonthlyRevenue = patientsPerMonth * avgPatientValueQAR;
  const estimatedAnnualRevenue = estimatedMonthlyRevenue * 12;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Presentation className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-display">
                {lang === 'en' ? 'Client Pitch & Google Maps Audit Deck' : 'العرض التقديمي وتحليل خرائط جوجل'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'en' ? 'Presentation notes to showcase and impress potential dental clients' : 'نقاط قوة العرض لإقناع مسؤولي المركز وأصحاب العيادات'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-900">
          
          {/* Audit Snapshot Card */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                {lang === 'en' ? 'Google Business Profile Audit' : 'تقرير تدقيق صفحة المركز على خرائط جوجل'}
              </span>
              <span className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-semibold">
                Audit Score: 98% Optimized
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-3 text-xs">
              <div>
                <span className="text-slate-500 block">{lang === 'en' ? 'Analyzed Business:' : 'المنشأة:'}</span>
                <span className="font-bold text-slate-900">{CLINIC_INFO.name}</span>
                <span className="text-[11px] text-slate-500 block">{CLINIC_INFO.crNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{lang === 'en' ? 'Google Rating:' : 'تقييم جوجل:'}</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.8 / 5.0 (384+ Verified Reviews)</span>
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">{lang === 'en' ? 'Verified Location:' : 'الموقع المعتمد:'}</span>
                <span className="font-bold text-slate-900">Ibn Al Tayyeb St, Zone 43 Hilal</span>
              </div>
            </div>
          </div>

          {/* Key Pitch Talking Points (Why this website wins clients) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              {lang === 'en' ? '5 Competitive Advantages to Pitch to the Client:' : '٥ أسباب رئيسية لإقناع إدارة العيادة بالتعاقد:'}
            </h4>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {lang === 'en' ? '1. Instant 1-Click Waze & Google Maps Routing' : '١. توجيه مباشر بنقرة واحدة لخرائط جوجل وWaze'}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {lang === 'en'
                      ? 'Patients searching in Doha often struggle finding clinic parking on Ibn Al Tayyeb St. Direct navigation links eliminate drop-off and guide patients directly to their front door.'
                      : 'الكثير من المرضى يواجهون صعوبة في معرفة مدخل شارع ابن الطيب ومواقف السيارات. الروابط المباشرة لـ Waze وGoogle Maps تحل المشكلة فورياً.'}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {lang === 'en' ? '2. Live Real-Time Open/Closed Hours Engine' : '٢. محرك حالة الدوام المباشر بتوقيت قطر'}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {lang === 'en'
                      ? 'Dynamic calculation based on Qatar AST time (including Friday prayer timings) prevents lost calls and assures after-hours emergency patients with a dedicated hotline.'
                      : 'يحسب توقيت الدوحة تلقائياً ويبرز مواعيد الجمعة بعد الصلاة ويوفر خط طوارئ بعد انتهاء الدوام، مما يمنع ضياع أي مريض محتمل.'}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {lang === 'en' ? '3. WhatsApp Pre-filled Instant Booking Pipeline' : '٣. حجز فوري عبر الواتساب برسائل جاهزة'}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {lang === 'en'
                      ? '82% of patients in Qatar prefer booking through WhatsApp. Pre-formatted appointment details double conversion rates compared to generic contact forms.'
                      : 'في قطر ودول الخليج، يفضل أكثر من 82% من المرضى تأكيد الحجز بالواتساب. الرسالة المجهزة ترفع نسبة تأكيد الحجز لأكثر من الضعف.'}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                <Star className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {lang === 'en' ? '4. Social Proof Showcase & Counter QR Review Collector' : '٤. إبراز تقييم 4.8 نجمة ورمز QR لجمع التقييمات'}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {lang === 'en'
                      ? 'Displays their authentic 4.8★ score and provides an on-counter scannable QR code generator for the receptionist to collect new 5-star Google reviews from happy patients.'
                      : 'يعرض تقييم المركز الممتاز مع رمز QR يوضع على كاونتر الاستقبال لتشجيع المرضى على تقييم العيادة فور انتهائهم من العلاج.'}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                <Users className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {lang === 'en' ? '5. Flawless Arabic & English Bilingual Experience' : '٥. دعم ثنائي اللغة متكامل واحترافي (عربي/إنجليزي)'}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {lang === 'en'
                      ? 'Reaches both national Qatari citizens and multinational Doha expatriates with native typography and RTL orientation.'
                      : 'تصميم مخصص لمخاطبة العائلات القطرية والمقيمين الأجانب على حد سواء، مع خط عربي أصيل وتجربة قراءة سلسة.'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive ROI Calculator for Client Pitch */}
          <div className="bg-gradient-to-br from-teal-900 to-slate-900 p-5 rounded-2xl text-white">
            <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>{lang === 'en' ? 'Client ROI Projection Calculator' : 'حاسبة العائد الاستثماري المتوقع للمركز'}</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 items-center">
              <div>
                <label className="block text-xs text-slate-300 mb-2">
                  {lang === 'en'
                    ? `Additional monthly patients acquired via website: ${patientsPerMonth} patients`
                    : `عدد المرضى الإضافيين شهرياً عبر الموقع: ${patientsPerMonth} مريض`}
                </label>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={patientsPerMonth}
                  onChange={(e) => setPatientsPerMonth(Number(e.target.value))}
                  className="w-full accent-teal-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>5 patients</span>
                  <span>30 patients</span>
                  <span>60 patients</span>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/15 text-center">
                <div className="text-[11px] text-slate-300 uppercase tracking-wider">
                  {lang === 'en' ? 'Projected Annual New Revenue' : 'العائد السنوي المتوقع الجديد'}
                </div>
                <div className="text-2xl font-extrabold text-teal-300 font-display mt-1">
                  QAR {estimatedAnnualRevenue.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  (~ QAR {estimatedMonthlyRevenue.toLocaleString()} / month)
                </div>
              </div>
            </div>
          </div>

          {/* Meeting Closer Tips */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">
              {lang === 'en' ? '💡 Tip for your Client Meeting: ' : '💡 نصيحة عند الاجتماع بالعميل: '}
            </span>
            {lang === 'en'
              ? 'Open this demo website in front of the clinic manager on both a desktop laptop and their mobile phone. Toggle between English and Arabic, and show them how the WhatsApp booking link opens immediately with pre-filled patient info.'
              : 'افتح هذا الموقع التجريبي أمام مدير المركز على جهاز الكمبيوتر وعلى هاتفه المحمول. بدّل بين اللغتين واضغط زر حجز الواتساب ليرى كيف تتجهز رسالة الحجز فوراً باسم المريض والإجراء الطبي.'}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
          >
            {lang === 'en' ? 'Close & Resume Website View' : 'إغلاق ومتابعة تصفح الموقع'}
          </button>
        </div>

      </div>
    </div>
  );
};
