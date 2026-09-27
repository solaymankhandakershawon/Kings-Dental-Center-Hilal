import { WEEKLY_HOURS } from '../data/clinicData';
import { Language } from '../types';

export interface ClinicStatus {
  isOpen: boolean;
  statusLabelEn: string;
  statusLabelAr: string;
  countdownEn: string;
  countdownAr: string;
  todayScheduleEn: string;
  todayScheduleAr: string;
  currentDohaTimeFormatted: string;
  dohaDayIndex: number;
}

/**
 * Returns current status of Kings Dental Center Hilal using Doha Time (UTC+3)
 */
export function getClinicStatus(lang: Language = 'en'): ClinicStatus {
  const now = new Date();
  
  // Calculate Doha Time (UTC + 3 hours)
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const dohaTime = new Date(utc + 3 * 3600000);
  
  const dayIndex = dohaTime.getDay(); // 0 is Sunday, 6 is Saturday, 5 is Friday
  const currentHour = dohaTime.getHours();
  const currentMinutes = dohaTime.getMinutes();
  const currentTotalMinutes = currentHour * 60 + currentMinutes;

  const todayConfig = WEEKLY_HOURS.find((h) => h.dayIndex === dayIndex) || WEEKLY_HOURS[0];
  
  const [openH, openM] = todayConfig.openTime.split(':').map(Number);
  const [closeH, closeM] = todayConfig.closeTime.split(':').map(Number);
  
  const openTotalMinutes = openH * 60 + openM;
  const closeTotalMinutes = closeH * 60 + closeM;

  const isOpen = currentTotalMinutes >= openTotalMinutes && currentTotalMinutes < closeTotalMinutes;
  
  let countdownEn = '';
  let countdownAr = '';

  if (isOpen) {
    const diff = closeTotalMinutes - currentTotalMinutes;
    const hoursRemaining = Math.floor(diff / 60);
    const minsRemaining = diff % 60;
    if (hoursRemaining > 0) {
      countdownEn = `${hoursRemaining}h ${minsRemaining}m left today`;
      countdownAr = `متبقي ${hoursRemaining} س و ${minsRemaining} د اليوم`;
    } else {
      countdownEn = `${minsRemaining}m left today`;
      countdownAr = `متبقي ${minsRemaining} دقيقة اليوم`;
    }
  } else {
    if (currentTotalMinutes < openTotalMinutes) {
      const diff = openTotalMinutes - currentTotalMinutes;
      const hoursRemaining = Math.floor(diff / 60);
      const minsRemaining = diff % 60;
      countdownEn = `Opens in ${hoursRemaining}h ${minsRemaining}m`;
      countdownAr = `يفتح بعد ${hoursRemaining} س و ${minsRemaining} د`;
    } else {
      // After close: calculate time until tomorrow open
      const tomorrowIndex = (dayIndex + 1) % 7;
      const tomorrowConfig = WEEKLY_HOURS.find((h) => h.dayIndex === tomorrowIndex) || WEEKLY_HOURS[0];
      countdownEn = `Opens tomorrow at ${tomorrowConfig.displayHours.split('–')[0].trim()}`;
      countdownAr = `يفتح غداً في تمام ${tomorrowConfig.displayHoursAr.split('–')[0].trim()}`;
    }
  }

  // Format current Doha time string (e.g., "10:35 PM AST")
  const hours12 = currentHour % 12 || 12;
  const ampm = currentHour >= 12 ? 'PM' : 'AM';
  const ampmAr = currentHour >= 12 ? 'مساءً' : 'صباحاً';
  const minsFormatted = currentMinutes.toString().padStart(2, '0');
  const dohaTimeStr = `${hours12}:${minsFormatted} ${ampm} AST (Doha)`;

  return {
    isOpen,
    statusLabelEn: isOpen ? `Open Now · Closes at ${todayConfig.displayHours.split('–')[1]?.trim() || '11:00 PM'}` : `Closed Now · Opens at ${openH}:${openM.toString().padStart(2, '0')} AM`,
    statusLabelAr: isOpen ? `مفتوح الآن · يغلق عند ${todayConfig.displayHoursAr.split('–')[1]?.trim() || '١١:٠٠ م'}` : `مغلق حالياً · يفتح في موعده الرسمي`,
    countdownEn,
    countdownAr,
    todayScheduleEn: `${todayConfig.day}: ${todayConfig.displayHours}`,
    todayScheduleAr: `${todayConfig.dayAr}: ${todayConfig.displayHoursAr}`,
    currentDohaTimeFormatted: dohaTimeStr,
    dohaDayIndex: dayIndex,
  };
}
