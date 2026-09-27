import React from 'react';
import { Presentation, Globe, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { CLINIC_INFO } from '../data/clinicData';

interface PitchBannerProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenPitchModal: () => void;
  isSimulatedClosed: boolean;
  onToggleSimulatedClosed: () => void;
}

export const PitchBanner: React.FC<PitchBannerProps> = ({
  lang,
  onLanguageChange,
  onOpenPitchModal,
  isSimulatedClosed,
  onToggleSimulatedClosed,
}) => {
  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Google Maps Analysis info */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 font-semibold text-teal-400">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Google Maps Profile Analyzed</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300 font-medium">
            {CLINIC_INFO.name} ({CLINIC_INFO.crNumber})
          </span>
          <span className="text-slate-500 hidden md:inline">· 4.8★ (1,400+ Reviews)</span>
          <a
            href={CLINIC_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white underline decoration-slate-600 inline-flex items-center gap-1"
          >
            <span>View Source on Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Right: Pitch Deck Button, Open/Closed simulator, and Language Toggle */}
        <div className="flex items-center gap-2.5 ml-auto">
          {/* Simulation toggle */}
          <button
            onClick={onToggleSimulatedClosed}
            title="Toggle between real time and simulated closed state to demonstrate dynamic status"
            className="text-[11px] px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/60"
          >
            {isSimulatedClosed ? 'Simulating: Closed 🌙' : 'Simulating: Real Time ☀️'}
          </button>

          {/* Client Pitch Modal button */}
          <button
            onClick={onOpenPitchModal}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-teal-500/15 text-teal-300 hover:bg-teal-500/25 border border-teal-500/30 font-medium transition-colors cursor-pointer"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Client Pitch Deck' : 'العرض التقديمي للعميل'}</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-800 rounded p-0.5 border border-slate-700">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                lang === 'en' ? 'bg-teal-500 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('ar')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                lang === 'ar' ? 'bg-teal-500 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              العربية
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
