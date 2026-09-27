import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle, MessageCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CLINIC_INFO, DENTAL_SERVICES, DOCTORS } from '../data/clinicData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialService?: string;
  initialDoctor?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialService = '',
  initialDoctor = '',
}) => {
  const t = TRANSLATIONS[lang];

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(initialService || DENTAL_SERVICES[0].title);
  const [selectedDoctor, setSelectedDoctor] = useState(initialDoctor || '');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('10:00 AM – 11:00 AM');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmitDirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    const refCode = `KDC-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(refCode);
    setIsSubmitted(true);
  };

  const handleWhatsAppBooking = () => {
    const textMessage = `*New Appointment Request - Kings Dental Center Hilal*
• Patient Name: ${fullName || 'Not specified'}
• Contact: ${phone || 'Not specified'}
• Treatment: ${selectedService}
• Preferred Doctor: ${selectedDoctor || 'Any available specialist'}
• Date: ${date}
• Time Slot: ${timeSlot}
• Notes: ${notes || 'None'}
• Source: Website Demo / Google Maps Hilal`;

    const encoded = encodeURIComponent(textMessage);
    window.open(`https://wa.me/${CLINIC_INFO.whatsapp}?text=${encoded}`, '_blank');
    onClose();
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-display">
              {t.booking.title}
            </h3>
            <p className="text-xs text-slate-300">
              {t.booking.subtitle}
            </p>
          </div>
          <button
            onClick={resetForm}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-900">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold font-display text-slate-900">
                {t.booking.successTitle}
              </h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 inline-block text-xs font-mono text-slate-700">
                <span>Confirmation Ref: </span>
                <span className="font-bold text-teal-700">{bookingRef}</span>
              </div>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {t.booking.successMsg}
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 transition-colors"
                >
                  {t.booking.close}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitDirect} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.booking.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'en' ? 'e.g. Jassem Al-Baker' : 'مثال: جاسم الباكر'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.booking.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+974 3000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.booking.procedure}
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                  >
                    {DENTAL_SERVICES.map((s) => (
                      <option key={s.id} value={lang === 'en' ? s.title : s.titleAr}>
                        {lang === 'en' ? s.title : s.titleAr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.booking.doctor}
                  </label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                  >
                    <option value="">{lang === 'en' ? 'Any Available Specialist' : 'أي طبيب أخصائي متاح'}</option>
                    {DOCTORS.map((d) => (
                      <option key={d.id} value={lang === 'en' ? d.name : d.nameAr}>
                        {lang === 'en' ? `${d.name} (${d.specialty.split('&')[0]})` : d.nameAr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.booking.date}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.booking.timeSlot}
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                  >
                    <option value="09:00 AM – 11:00 AM">Morning (09:00 AM – 11:00 AM)</option>
                    <option value="11:00 AM – 01:00 PM">Noon (11:00 AM – 01:00 PM)</option>
                    <option value="04:00 PM – 06:00 PM">Afternoon (04:00 PM – 06:00 PM)</option>
                    <option value="06:00 PM – 08:30 PM">Evening (06:00 PM – 08:30 PM)</option>
                    <option value="08:30 PM – 11:00 PM">Late Evening (08:30 PM – 11:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.booking.notes}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'en' ? 'Describe any sensitivity, emergency pain, or specific concerns...' : 'اكتب أي تفاصيل بخصوص الأعراض أو الاستفسارات...'}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.booking.sendWhatsApp}</span>
                </button>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
                >
                  {t.booking.submitDirect}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
