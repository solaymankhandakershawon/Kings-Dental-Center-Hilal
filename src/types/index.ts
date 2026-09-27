export type Language = 'en' | 'ar';

export interface WorkingHoursDay {
  day: string;
  dayAr: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, etc.
  openTime: string; // "09:00"
  closeTime: string; // "23:00"
  displayHours: string;
  displayHoursAr: string;
  isSpecial?: boolean;
}

export interface GoogleReview {
  id: string;
  author: string;
  authorAr: string;
  avatar: string;
  isLocalGuide: boolean;
  reviewsCount?: number;
  rating: number;
  date: string;
  dateAr: string;
  category: 'orthodontics' | 'implants' | 'cosmetic' | 'general' | 'pediatric';
  text: string;
  textAr: string;
  procedure: string;
  procedureAr: string;
}

export interface DentalService {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  shortDesc: string;
  shortDescAr: string;
  details: string[];
  detailsAr: string[];
  estimatedDuration: string;
  estimatedPriceQAR: string;
  popular?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  nameAr: string;
  title: string;
  titleAr: string;
  specialty: string;
  specialtyAr: string;
  experience: string;
  education: string;
  image: string;
}

export interface DohaLandmark {
  name: string;
  nameAr: string;
  driveTime: string;
  distance: string;
  routeTip: string;
  routeTipAr: string;
}
