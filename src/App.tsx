/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { getClinicStatus, ClinicStatus } from './utils/hoursHelper';
import { PitchBanner } from './components/PitchBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HoursSection } from './components/HoursSection';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ServicesSection } from './components/ServicesSection';
import { DoctorsSection } from './components/DoctorsSection';
import { AppointmentModal } from './components/AppointmentModal';
import { ClientPitchModal } from './components/ClientPitchModal';
import { Footer } from './components/Footer';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from './data/clinicData';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isSimulatedClosed, setIsSimulatedClosed] = useState<boolean>(false);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingService, setBookingService] = useState<string>('');
  const [bookingDoctor, setBookingDoctor] = useState<string>('');
  const [clinicStatus, setClinicStatus] = useState<ClinicStatus>(() => getClinicStatus('en'));

  // Update status every 30s
  useEffect(() => {
    const timer = setInterval(() => {
      setClinicStatus(getClinicStatus(lang));
    }, 30000);
    return () => clearInterval(timer);
  }, [lang]);

  // Update on lang change
  useEffect(() => {
    setClinicStatus(getClinicStatus(lang));
    // Set document direction for Arabic support
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleOpenBooking = (service?: string, doctor?: string) => {
    if (service) setBookingService(service);
    if (doctor) setBookingDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      
      {/* 24/7 Dental Emergency Alert Bar */}
      <div className="bg-emerald-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-xs">
        <span>🚨</span>
        <span>
          {lang === 'en'
            ? '24/7 Dental Emergency Services Available in Hilal, Doha | '
            : 'خدمة طوارئ الأسنان متاحة على مدار الساعة في الهلال، الدوحة | '}
        </span>
        <a
          href={`tel:${CLINIC_INFO.phonePrimary}`}
          className="underline hover:text-emerald-100 font-bold whitespace-nowrap"
        >
          {lang === 'en' ? `Call Now: ${CLINIC_INFO.phonePrimary}` : `اتصل الآن: ${CLINIC_INFO.phonePrimary}`}
        </a>
      </div>

      {/* 1. Client Presentation Mode / Audit Ribbon */}
      <PitchBanner
        lang={lang}
        onLanguageChange={setLang}
        onOpenPitchModal={() => setIsPitchModalOpen(true)}
        isSimulatedClosed={isSimulatedClosed}
        onToggleSimulatedClosed={() => setIsSimulatedClosed(!isSimulatedClosed)}
      />

      {/* 2. Top Navigation Bar (Strict 3-zone contract) */}
      <Navbar
        lang={lang}
        onBookClick={() => handleOpenBooking()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero
          lang={lang}
          clinicStatus={clinicStatus}
          isSimulatedClosed={isSimulatedClosed}
          onBookClick={() => handleOpenBooking()}
        />

        {/* 4. Store Hours & Live Real-time Status (Explicitly Requested Focus) */}
        <HoursSection
          lang={lang}
          clinicStatus={clinicStatus}
          isSimulatedClosed={isSimulatedClosed}
          onBookClick={() => handleOpenBooking()}
        />

        {/* 5. Location & Interactive Navigation (Explicitly Requested Focus) */}
        <LocationSection
          lang={lang}
        />

        {/* 6. Verified Google Reviews Showcase (Explicitly Requested Focus) */}
        <ReviewsSection
          lang={lang}
        />

        {/* 7. Clinical Services & Transparent Pricing */}
        <ServicesSection
          lang={lang}
          onSelectService={(serviceTitle) => handleOpenBooking(serviceTitle)}
        />

        {/* 8. Medical Specialists Team */}
        <DoctorsSection
          lang={lang}
          onBookWithDoctor={(doctorName) => handleOpenBooking(undefined, doctorName)}
        />
      </main>

      {/* 9. Refined Footer */}
      <Footer lang={lang} />

      {/* Interactive Booking Modal */}
      <AppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setBookingService('');
          setBookingDoctor('');
        }}
        lang={lang}
        initialService={bookingService}
        initialDoctor={bookingDoctor}
      />

      {/* Client Pitch & Google Maps Audit Deck Modal */}
      <ClientPitchModal
        isOpen={isPitchModalOpen}
        onClose={() => setIsPitchModalOpen(false)}
        lang={lang}
      />

      {/* Mobile Floating Sticky Action Bar (Strictly capped to < 15% height) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-2.5 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center gap-2 shadow-lg">
        <a
          href={`tel:${CLINIC_INFO.phonePrimary}`}
          className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-teal-600" />
          <span>{lang === 'en' ? 'Call Clinic' : 'اتصال'}</span>
        </a>
        <a
          href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent('Hello Kings Dental Center Hilal, I would like to inquire about appointments.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
        <button
          onClick={() => handleOpenBooking()}
          className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'Book' : 'حجز'}</span>
        </button>
      </div>

    </div>
  );
}
