import React, { useState } from 'react';
import { Star, CheckCircle, QrCode, ExternalLink, ThumbsUp, MessageSquare, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Language, GoogleReview } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { GOOGLE_REVIEWS, CLINIC_INFO } from '../data/clinicData';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});

  const filteredReviews = selectedFilter === 'all'
    ? GOOGLE_REVIEWS
    : GOOGLE_REVIEWS.filter((r) => r.category === selectedFilter);

  const handleHelpfulClick = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
            {lang === 'en' ? 'Social Proof & Reputation' : 'السمعة والتقييمات الموثقة'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-display">
            {t.reviews.sectionTitle}
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            {t.reviews.sectionSubtitle}
          </p>
        </div>

        {/* Top Proof Strip: Google Rating Banner & Trust Metrics */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-12">
          
          {/* Overall Google Score */}
          <div className="lg:col-span-4 flex items-center gap-5 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0">
            <div className="w-18 h-18 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center shrink-0 shadow-2xs">
              <span className="text-3xl font-extrabold text-slate-900 font-display">
                {t.reviews.overallRating}
              </span>
              <div className="flex items-center text-amber-400 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <span>Google Reviews</span>
                <span className="text-xs text-blue-600 font-medium">✓ Verified</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {t.reviews.basedOn}
              </p>
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-xs text-teal-700 hover:text-teal-900 font-semibold inline-flex items-center gap-1"
              >
                <span>{lang === 'en' ? 'Verify on Google Maps' : 'تحقق عبر خرائط جوجل'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Social Proof Metrics (8 cols) */}
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>99%</span>
              </div>
              <div className="text-xs font-semibold text-slate-900 mt-1">{t.reviews.hygieneScore}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{lang === 'en' ? 'Strict hospital sterilization' : 'تعقيم بمعايير المستشفيات'}</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-sm">
                <HeartHandshake className="w-4 h-4 text-teal-600" />
                <span>98%</span>
              </div>
              <div className="text-xs font-semibold text-slate-900 mt-1">{t.reviews.painFreeScore}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{lang === 'en' ? 'Gentle computerized anesthesia' : 'تخدير رقمي بدون ألم'}</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                <span>96%</span>
              </div>
              <div className="text-xs font-semibold text-slate-900 mt-1">{t.reviews.punctualScore}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{lang === 'en' ? 'No long waiting room delay' : 'مواعيد دقيقة دون انتظار'}</div>
            </div>
          </div>

        </div>

        {/* Filter Bar (Interactive Functional Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-medium scrollbar-none">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            {t.reviews.filterAll}
          </button>
          <button
            onClick={() => setSelectedFilter('orthodontics')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === 'orthodontics'
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            {t.reviews.filterOrthodontics}
          </button>
          <button
            onClick={() => setSelectedFilter('implants')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === 'implants'
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            {t.reviews.filterImplants}
          </button>
          <button
            onClick={() => setSelectedFilter('cosmetic')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === 'cosmetic'
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            {t.reviews.filterCosmetic}
          </button>
          <button
            onClick={() => setSelectedFilter('pediatric')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === 'pediatric'
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            {t.reviews.filterPediatric}
          </button>
          <button
            onClick={() => setSelectedFilter('general')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === 'general'
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            {t.reviews.filterGeneral}
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const helpfulCount = helpfulCounts[rev.id] || 0;
            return (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-sm transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Top user row */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm shrink-0">
                        {(lang === 'en' ? rev.author : rev.authorAr).charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{lang === 'en' ? rev.author : rev.authorAr}</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {rev.isLocalGuide
                            ? (lang === 'en' ? `Local Guide · ${rev.reviewsCount} reviews` : `مرشد محلي · ${rev.reviewsCount} تقييماً`)
                            : (lang === 'en' ? rev.date : rev.dateAr)}
                        </div>
                      </div>
                    </div>

                    {/* Google 'G' icon watermark */}
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                      G
                    </div>
                  </div>

                  {/* Rating Stars & Procedure */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">·</span>
                    <span className="text-xs font-medium text-teal-700">
                      {lang === 'en' ? rev.procedure : rev.procedureAr}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{lang === 'en' ? rev.text : rev.textAr}"
                  </p>
                </div>

                {/* Helpful button */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-[11px]">
                    {lang === 'en' ? rev.date : rev.dateAr}
                  </span>

                  <button
                    onClick={() => handleHelpfulClick(rev.id)}
                    className="inline-flex items-center gap-1 text-slate-500 hover:text-teal-700 transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Helpful' : 'مفيد'}</span>
                    {helpfulCount > 0 && <span className="font-semibold text-teal-600">({helpfulCount})</span>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout: Leave a Google Review + Scan QR code for clinic counter */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white border border-slate-700 shadow-md">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <MessageSquare className="w-4 h-4" />
                <span>{lang === 'en' ? 'Patient Voice Matters' : 'صوت المرضى في قطر'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                {t.reviews.leaveReviewTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                {t.reviews.leaveReviewDesc}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors"
                >
                  <Star className="w-4 h-4 fill-slate-950 text-slate-950" />
                  <span>{t.reviews.leaveReviewBtn}</span>
                </a>
              </div>
            </div>

            {/* Right: Simulated QR code for clinic reception desk */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs text-center">
              <div className="w-28 h-28 bg-white p-2 rounded-lg flex items-center justify-center shadow-inner">
                {/* SVG QR Code Simulation for Google Maps Review */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                  <path d="M0,0 h30 v30 h-30 z M5,5 v20 h20 v-20 z M10,10 h10 v10 h-10 z" />
                  <path d="M70,0 h30 v30 h-30 z M75,5 v20 h20 v-20 z M80,10 h10 v10 h-10 z" />
                  <path d="M0,70 h30 v30 h-30 z M5,75 v20 h20 v-20 z M10,80 h10 v10 h-10 z" />
                  <rect x="35" y="5" width="10" height="20" />
                  <rect x="50" y="5" width="10" height="10" />
                  <rect x="40" y="35" width="20" height="15" />
                  <rect x="5" y="35" width="15" height="10" />
                  <rect x="25" y="45" width="10" height="15" />
                  <rect x="70" y="35" width="25" height="10" />
                  <rect x="35" y="70" width="10" height="25" />
                  <rect x="50" y="80" width="15" height="15" />
                  <rect x="70" y="65" width="10" height="15" />
                  <rect x="85" y="75" width="10" height="20" />
                </svg>
              </div>
              <div className="text-[11px] text-slate-300 mt-2 font-medium">
                {t.reviews.qrDesc}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
