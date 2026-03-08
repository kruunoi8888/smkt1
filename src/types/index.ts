
export interface NewsItem {
  id: string;
  title: string;
  content: string;
  image: string; // Main image
  images?: string[]; // Additional images
  date: string;
  views: number;
  category: 'PR' | 'Activity' | 'Academic';
}

export interface GradeStat {
  id: string;
  grade: string;
  male: number;
  female: number;
}

export interface Achievement {
  id: string;
  title: string;
  content: string; // เพิ่มฟิลด์เนื้อหา
  image: string;
  images?: string[]; // เพิ่มฟิลด์รูปภาพประกอบ
  date: string;
  views?: number; // เพิ่มฟิลด์จำนวนผู้เข้าชม
}

export interface Personnel {
  id: string;
  name: string;
  position: string;
  image: string;
  department: string;
  rank?: string;
  gender?: 'male' | 'female';
}

export interface Journal {
  id: string;
  title: string;
  pdfUrl: string;
  thumbnail: string;
  month?: string;
  year?: string;
  views: number;
  dateStr: string;
  issue: string;
}

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  isActive: boolean; // Toggle visibility
  content?: string; // Custom page content
  image?: string; // Custom page image
  type: 'link' | 'page';
  isDefault?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'holiday' | 'activity' | 'meeting' | 'exam';
}

export interface SchoolStats {
  totalStudents: number;
  maleStudents: number;
  femaleStudents: number;
  totalStaff: number;
  gradeStats: GradeStat[];
}

export interface SchoolSlide {
  id: string;
  image: string;
  title?: string;
  description?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  password: string;
  name: string;
  image: string;
  phone?: string;
  email?: string;
  isDefault?: boolean;
}

export interface ShortcutItem {
  id: string;
  title: string;
  image?: string;
  url: string;
  isActive: boolean;
  type?: 'link' | 'page';
  content?: string;
  bgColor?: string;
  textColor?: string;
}

export interface WidgetItem {
  id: string;
  title: string;
  type: 'shortcut' | 'iframe' | 'html' | 'custom';
  position: 'banner' | 'middle' | 'bottom';
  isActive: boolean;
  showTitle?: boolean; // Toggle title visibility
  shortcuts?: ShortcutItem[];
  content?: string;
}

export interface SchoolConfig {
  name: string;
  area: string;
  director: Personnel;
  stats: SchoolStats;
  videoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  socialMedia?: {
    facebook: { url: string; visible: boolean };
    line: { url: string; visible: boolean };
    youtube: { url: string; visible: boolean };
  };
  slides: SchoolSlide[];
  bannerImage: string;
  bannerSlogan: string;
  bannerTextColor?: string;
  sloganBorderColor?: string;
  sloganTextColor?: string;
  bodyBackgroundColor?: string;
  bodyTextColor?: string;
  footerBackgroundColor?: string;
  footerTextColor?: string;
  fontFamily?: string;
  widgets?: WidgetItem[];
  heroShortcuts?: ShortcutItem[];
  visitorStats?: {
    today: number;
    thisMonth: number;
    total: number;
  };
}
