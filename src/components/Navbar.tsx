import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CLINIC_INFO } from '../data/clinicData';

interface NavbarProps {
  lang: Language;
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onBookClick }) => {
  const t = TRANSLATIONS[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display flex items-center gap-2 shrink-0 hover:text-teal-700 transition-colors"
        >
          <span className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            K
          </span>
          <span className="truncate">{lang === 'en' ? 'Kings Dental Center' : 'مركز كينغز للأسنان'}</span>
        </a>

        {/* Zone 2: 4-6 nav links, 1-2 word labels, single-line */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#services" className="hover:text-teal-700 transition-colors whitespace-nowrap">
            {t.nav.treatments}
          </a>
          <a href="#hours" className="hover:text-teal-700 transition-colors whitespace-nowrap">
            {t.nav.hours}
          </a>
          <a href="#reviews" className="hover:text-teal-700 transition-colors whitespace-nowrap">
            {t.nav.reviews}
          </a>
          <a href="#location" className="hover:text-teal-700 transition-colors whitespace-nowrap">
            {t.nav.location}
          </a>
          <a href="#doctors" className="hover:text-teal-700 transition-colors whitespace-nowrap">
            {lang === 'en' ? 'Specialists' : 'الأطباء'}
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent('Hello Kings Dental Center Hilal, I would like to inquire about dental appointments.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span className="whitespace-nowrap">{CLINIC_INFO.phonePrimary}</span>
          </a>

          <button
            onClick={onBookClick}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.nav.bookConsultation}</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium hover:text-teal-600"
          >
            {t.nav.treatments}
          </a>
          <a
            href="#hours"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium hover:text-teal-600"
          >
            {t.nav.hours}
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium hover:text-teal-600"
          >
            {t.nav.reviews}
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium hover:text-teal-600"
          >
            {t.nav.location}
          </a>
          <a
            href="#doctors"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium hover:text-teal-600"
          >
            {lang === 'en' ? 'Specialists' : 'الأطباء'}
          </a>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${CLINIC_INFO.phonePrimary}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-100 text-slate-800 text-sm font-semibold"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>{CLINIC_INFO.phonePrimary}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
