
import { SchoolConfig, NewsItem, Achievement, Personnel, Journal, MenuItem, CalendarEvent, AdminUser } from '@/types';

export const formatThaiDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  
  const months = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  
  let year = date.getFullYear();
  // ป้องกันการบวก 543 ซ้ำซ้อน หากปีที่ได้มาเป็น พ.ศ. อยู่แล้ว (เช่น 2569)
  // โดยสมมติว่าถ้าปีมากกว่า 2400 แสดงว่าเป็น พ.ศ. แล้ว
  if (year < 2400) {
    year += 543;
  }
  
  return `${date.getDate()} ${months[date.getMonth()]} ${year}`;
};

export const stripHtml = (html: string) => {
  if (!html) return '';
  // Simple regex to strip HTML tags
  return html.replace(/<[^>]*>?/gm, '');
};

export const INITIAL_ADMINS: AdminUser[] = [
  { 
    id: 'admin1', 
    username: 'admin', 
    password: 'admin8888', 
    name: 'Mr.Ratchapon Worrakan', 
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander', 
    phone: '0815144041',
    email: 'kruunoi@gmail.com',
    isDefault: true 
  }
];

export const INITIAL_CONFIG: SchoolConfig = {
  name: "โรงเรียนวัดสามัคคีธรรม",
  area: "สำนักงานเขตพื้นที่การศึกษาประถมศึกษาสุพรรณบุรี เขต 3",
  director: {
    id: "dir1",
    name: "นายสมชาย ใจดี",
    position: "ผู้อำนวยการโรงเรียน",
    image: "", 
    department: "ฝ่ายบริหาร",
    rank: "ผู้อำนวยการชำนาญการพิเศษ",
    gender: 'male'
  },
  stats: {
    totalStudents: 42,
    maleStudents: 22,
    femaleStudents: 20,
    totalStaff: 15,
    gradeStats: [
      { id: 'g1', grade: "อนุบาล 2", male: 1, female: 1 },
      { id: 'g2', grade: "อนุบาล 3", male: 3, female: 4 },
      { id: 'g3', grade: "ประถมศึกษาปีที่ 1", male: 2, female: 3 },
      { id: 'g4', grade: "ประถมศึกษาปีที่ 2", male: 3, female: 0 },
      { id: 'g5', grade: "ประถมศึกษาปีที่ 3", male: 0, female: 5 },
      { id: 'g6', grade: "ประถมศึกษาปีที่ 4", male: 3, female: 2 },
      { id: 'g7', grade: "ประถมศึกษาปีที่ 5", male: 7, female: 2 },
      { id: 'g8', grade: "ประถมศึกษาปีที่ 6", male: 3, female: 3 },
    ]
  },
  videoUrl: "https://www.youtube.com/embed/nTdb2QZ5ZaQ?si=pOW08WT26ejJalyB",
  primaryColor: "#0f172a", // เปลี่ยนจากน้ำเงินเป็นดำ (Slate-900)
  secondaryColor: "#facc15",
  logo: "https://picsum.photos/seed/logo/200/200",
  address: "เลขที่ 8 หมู่ 12 ตำบลหนองโพธิ์ อำเภอหนองหญ้าไซ จังหวัดสุพรรณบุรี 72240",
  phone: "081-5144041",
  email: "watsamakkhi@example.ac.th",
  facebook: "https://facebook.com/watsamakkhi",
  socialMedia: {
    facebook: { url: "https://facebook.com/watsamakkhi", visible: true },
    line: { url: "https://line.me/ti/p/@watsamakkhi", visible: true },
    youtube: { url: "https://youtube.com/@watsamakkhi", visible: true }
  },
  slides: [
    { id: 's1', image: 'https://picsum.photos/seed/school-activity-1/1200/600', title: 'กิจกรรมพัฒนาผู้เรียน', description: 'ส่งเสริมการเรียนรู้นอกห้องเรียนเพื่อประสบการณ์ที่กว้างไกล' },
    { id: 's2', image: 'https://picsum.photos/seed/school-activity-2/1200/600', title: 'การเรียนการสอนยุคใหม่', description: 'ใช้เทคโนโลยีเข้ามามีส่วนร่วมในการจัดการเรียนรู้' },
    { id: 's3', image: 'https://picsum.photos/seed/school-activity-3/1200/600', title: 'กิจกรรมวันสำคัญ', description: 'ปล่งฝังคุณธรรม จริยธรรม และวัฒนธรรมไทย' },
  ],
  bannerImage: "https://images.unsplash.com/photo-1523050853064-814041697262?q=80&w=2070",
  bannerSlogan: "สร้างคนดี มีความรู้ คู่คุณธรรม นำเทคโนโลยี",
  bannerTextColor: "#ffffff",
  sloganBorderColor: "#fbbf24",
  sloganTextColor: "#0f172a",
  bodyBackgroundColor: "#f8fafc",
  bodyTextColor: "#334155",
  footerBackgroundColor: "#0f172a",
  footerTextColor: "#94a3b8",
  fontFamily: "Kanit",
    widgets: [
      {
        id: 'w1',
        title: 'ลิงก์หน่วยงานที่เกี่ยวข้อง',
        type: 'shortcut',
        position: 'banner',
        isActive: true,
        showTitle: true,
        shortcuts: [
          { id: 'sc1', title: 'กระทรวงศึกษาธิการ', image: 'https://moe360.moe.go.th/wp-content/uploads/2021/04/Logo-MOE-1.png', url: 'https://www.moe.go.th/', isActive: true },
          { id: 'sc2', title: 'สพฐ.', image: 'https://www.obec.go.th/wp-content/uploads/2019/04/logo-obec.png', url: 'https://www.obec.go.th/', isActive: true },
          { id: 'sc3', title: 'คุรุสภา', image: 'https://www.ksp.or.th/wp-content/uploads/2023/12/logo-ksp.png', url: 'https://www.ksp.or.th/', isActive: true },
          { id: 'sc4', title: 'สทศ. (O-NET)', image: 'https://www.niets.or.th/uploads/logo/logo.png', url: 'https://www.niets.or.th/', isActive: true }
        ]
      }
    ],
    heroShortcuts: [
      { id: 'hs1', title: 'เกี่ยวกับโรงเรียน', image: '', url: '#/about', isActive: true, type: 'link' },
      { id: 'hs2', title: 'ดูข่าวสารล่าสุด', image: '', url: '#/news', isActive: true, type: 'link' },
    ],
    visitorStats: {
      today: 124,
      thisMonth: 3450,
      total: 128450
    }
};

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: "n1",
    title: "กิจกรรมวันแม่แห่งชาติ ประจำปี 2567",
    content: "โรงเรียนวัดสามัคคีธรรม จัดกิจกรรมเฉลิมพระเกียรติเนื่องในโอกาสวันเฉลิมพระชนมพรรษา สมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง",
    image: "https://picsum.photos/seed/news1/800/400",
    date: "2024-08-12",
    views: 1245,
    category: "Activity"
  },
  {
    id: "n2",
    title: "โครงการทัศนศึกษา แหล่งเรียนรู้ภูมิปัญญาท้องถิ่น",
    content: "พานักเรียนเข้าศึกษาดูงาน ณ พิพิธภัณฑสถานแห่งชาติ เพื่อเสริมสร้างประสบการณ์นอกห้องเรียน",
    image: "https://picsum.photos/seed/news2/800/400",
    date: "2024-07-20",
    views: 856,
    category: "Academic"
  },
  {
    id: "n3",
    title: "การแข่งขันกีฬาสีภายใน 'สามัคคีธรรมเกมส์'",
    content: "ร่วมชมและเชียร์การแข่งขันกีฬาสี เพื่อเสริมสร้างความสามัคคีและสุขภาพที่แข็งแรงของนักเรียน",
    image: "https://picsum.photos/seed/news3/800/400",
    date: "2024-06-15",
    views: 2103,
    category: "Activity"
  },
  {
    id: "n4",
    title: "อบรมเชิงปฏิบัติการ การใช้เทคโนโลยีดิจิทัลเพื่อการเรียนรู้",
    content: "ครูและบุคลากรเข้าร่วมการอบรมพัฒนาทักษะการใช้สื่อ ICT ในการจัดการเรียนการสอนยุคใหม่",
    image: "https://picsum.photos/seed/news4/800/400",
    date: "2024-05-30",
    views: 540,
    category: "PR"
  },
  {
    id: "n5",
    title: "กิจกรรมค่ายภาษาอังกฤษ English Summer Camp",
    content: "นักเรียนเข้าร่วมกิจกรรมค่ายภาษาอังกฤษเพื่อพัฒนาทักษะการสื่อสารกับเจ้าของภาษาอย่างสนุกสนาน",
    image: "https://picsum.photos/seed/news5/800/400",
    date: "2024-04-12",
    views: 1120,
    category: "Activity"
  },
  {
    id: "n6",
    title: "โครงการโรงเรียนสีขาว ปลอดยาเสพติด",
    content: "สร้างภูมิคุ้มกันให้นักเรียนห่างไกลยาเสพติดและอบายมุขทุกรูปแบบ เพื่ออนาคตที่สดใส",
    image: "https://picsum.photos/seed/news6/800/400",
    date: "2024-03-25",
    views: 780,
    category: "PR"
  }
];

export const INITIAL_PERSONNEL: Personnel[] = [
  { id: "dir", name: "นายสมชาย ใจดี", position: "ผู้อำนวยการโรงเรียน", image: "", department: "บริหาร", rank: "ผู้อำนวยการชำนาญการพิเศษ", gender: 'male' },
  { id: "dep1", name: "นางสาวสมหญิง มุ่งมั่น", position: "รองผู้อำนวยการโรงเรียน", image: "", department: "บริหาร", rank: "รองผู้อำนวยการชำนาญการ", gender: 'female' },
  { id: "p1", name: "นางสาวพรทิพย์ สุขุม", position: "ครู", image: "", department: "วิชาการ", rank: "ครูชำนาญการพิเศษ", gender: 'female' },
  { id: "p2", name: "นายวิชัย มั่นคง", position: "ครู", image: "", department: "ปกครอง", rank: "ครูชำนาญการ", gender: 'male' },
  { id: "p3", name: "นางแก้วใจ ใฝ่เรียน", position: "ครู", image: "", department: "วิชาการ", rank: "ครูชำนาญการพิเศษ", gender: 'female' },
  { id: "p4", name: "นายมานพ เก่งกาจ", position: "ครู", image: "", department: "พละศึกษา", rank: "ครู คศ.1", gender: 'male' },
  { id: "p5", name: "นางมณี รัตนไพศาล", position: "ครู", image: "", department: "ภาษาไทย", rank: "ครูชำนาญการ", gender: 'female' },
  { id: "p6", name: "นายอานนท์ มีทรัพย์", position: "ครู", image: "", department: "คณิตศาสตร์", rank: "ครูชำนาญการพิเศษ", gender: 'male' },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { 
    id: "a1", 
    title: "รางวัลเหรียญทอง การแข่งขันหุ่นยนต์ระดับจังหวัด", 
    content: "นักเรียนโรงเรียนวัดสามัคคีธรรม ได้รับรางวัลเหรียญทองจากการแข่งขันหุ่นยนต์ระดับจังหวัด ประจำปีการศึกษา 2567 โดยแสดงทักษะการเขียนโปรแกรมและการออกแบบหุ่นยนต์ที่ยอดเยี่ยม สามารถแก้โจทย์ปัญหาที่ซับซ้อนได้อย่างรวดเร็วและแม่นยำ สร้างความภาคภูมิใจให้กับโรงเรียนเป็นอย่างยิ่ง",
    image: "https://picsum.photos/seed/a1/600/400", 
    images: ["https://picsum.photos/seed/a1-1/600/400", "https://picsum.photos/seed/a1-2/600/400", "https://picsum.photos/seed/a1-3/600/400"],
    date: "2024-05-15", 
    views: 1540 
  },
  { 
    id: "a2", 
    title: "โรงเรียนส่งเสริมสุขภาพ ระดับทอง ประจำปี 2567", 
    content: "โรงเรียนวัดสามัคคีธรรม ผ่านการประเมินโรงเรียนส่งเสริมสุขภาพ ระดับทอง ประจำปี 2567 จากกระทรวงสาธารณสุข สะท้อนถึงการจัดการด้านสุขาภิบาล อาหาร และสิ่งแวดล้อมในโรงเรียนที่ได้มาตรฐานสากล เพื่อสุขภาวะที่ดีของนักเรียนและบุคลากรทุกคน",
    image: "https://picsum.photos/seed/a2/600/400", 
    images: ["https://picsum.photos/seed/a2-1/600/400", "https://picsum.photos/seed/a2-2/600/400"],
    date: "2024-06-10", 
    views: 980 
  },
  { 
    id: "a3", 
    title: "รางวัลสถานศึกษาสีขาว ปลอดยาเสพติดดีเด่น", 
    content: "โรงเรียนได้รับรางวัลสถานศึกษาสีขาว ปลอดยาเสพติดและอบายมุขดีเด่น ระดับทอง ประจำปีการศึกษา 2567 จากการดำเนินโครงการเชิงรุกเพื่อสร้างภูมิคุ้มกันให้นักเรียนห่างไกลจากยาเสพติด โดยได้รับความร่วมมือจากผู้ปกครองและชุมชนเป็นอย่างดี",
    image: "https://picsum.photos/seed/a3/600/400", 
    images: ["https://picsum.photos/seed/a3-1/600/400", "https://picsum.photos/seed/a3-2/600/400", "https://picsum.photos/seed/a3-3/600/400"],
    date: "2024-07-05", 
    views: 2310 
  },
  { 
    id: "a4", 
    title: "เหรียญเงิน การแข่งขันตอบปัญหาวิชาการระดับเขต", 
    content: "ขอแสดงความยินดีกับตัวแทนนักเรียนที่ได้รับรางวัลเหรียญเงิน จากการแข่งขันตอบปัญหาวิชาการระดับเขตพื้นที่การศึกษา ในกลุ่มสาระการเรียนรู้คณิตศาสตร์และวิทยาศาสตร์ แสดงถึงความเป็นเลิศทางวิชาการและความมุ่งมั่นในการศึกษาหาความรู้",
    image: "https://picsum.photos/seed/a4/600/400", 
    images: ["https://picsum.photos/seed/a4-1/600/400"],
    date: "2024-08-20", 
    views: 765 
  },
  { 
    id: "a5", 
    title: "รางวัลชนะเลิศ การประกวดโครงงานวิทยาศาสตร์", 
    content: "นักเรียนระดับชั้นประถมศึกษาปีที่ 6 ได้รับรางวัลชนะเลิศอันดับ 1 ในการประกวดโครงงานวิทยาศาสตร์ระดับจังหวัด ด้วยผลงาน 'เครื่องกรองน้ำธรรมชาติจากวัสดุเหลือใช้ในท้องถิ่น' ซึ่งเป็นนวัตกรรมที่ช่วยรักษาสิ่งแวดล้อมและใช้งานได้จริง",
    image: "https://picsum.photos/seed/a5/600/400", 
    images: ["https://picsum.photos/seed/a5-1/600/400", "https://picsum.photos/seed/a5-2/600/400"],
    date: "2024-09-12", 
    views: 1290 
  },
  { 
    id: "a6", 
    title: "รางวัลดีเด่น ด้านการจัดการศึกษาแนวทางใหม่", 
    content: "โรงเรียนวัดสามัคคีธรรม ได้รับรางวัลสถานศึกษาดีเด่นด้านการจัดการเรียนการสอนแบบ Active Learning และการบูรณาการเทคโนโลยีเข้ากับบทเรียน ช่วยให้นักเรียนเกิดความสนใจและพัฒนาทักษะการเรียนรู้ด้วยตนเองอย่างมีประสิทธิภาพ",
    image: "https://picsum.photos/seed/a6/600/400", 
    images: ["https://picsum.photos/seed/a6-1/600/400", "https://picsum.photos/seed/a6-2/600/400"],
    date: "2024-10-02", 
    views: 1105 
  },
];

export const INITIAL_JOURNALS: Journal[] = [
  { id: "j1", title: "นิเทศ เยี่ยมชม ให้กำลังใจ", pdfUrl: "#", thumbnail: "https://picsum.photos/seed/j1/400/600", month: "สิงหาคม", year: "2567", views: 452, dateStr: "2024-08-01", issue: "ฉบับที่ 1 เดือนสิงหาคม 2567" },
  { id: "j2", title: "กิจกรรมวันแม่แห่งชาติและวันสำคัญทางศาสนา", pdfUrl: "#", thumbnail: "https://picsum.photos/seed/j2/400/600", month: "กรกฎาคม", year: "2567", views: 320, dateStr: "2024-07-01", issue: "ฉบับเดือนกรกฎาคม 2567" },
  { id: "j3", title: "โครงการทัศนศึกษาแหล่งเรียนรู้ภูมิปัญญาสองพี่น้อง", pdfUrl: "#", thumbnail: "https://picsum.photos/seed/j3/400/600", month: "มิถุนายน", year: "2567", views: 280, dateStr: "2024-06-01", issue: "ฉบับเดือนมิถุนายน 2567" },
  { id: "j4", title: "การเตรียมความพร้อมก่อนเปิดภาคเรียนและการจัดทำแผนการสอน", pdfUrl: "#", thumbnail: "https://picsum.photos/seed/j4/400/600", month: "พฤษภาคม", year: "2567", views: 512, dateStr: "2024-05-01", issue: "ฉบับที่ 2 ประจำปีการศึกษา 2567" },
  { id: "j5", title: "สรุปผลงานวิชาการและกิจกรรมเด่นในรอบไตรมาส", pdfUrl: "#", thumbnail: "https://picsum.photos/seed/j5/400/600", month: "เมษายน", year: "2567", views: 198, dateStr: "2024-04-01", issue: "ฉบับเดือนเมษายน 2567" },
  { id: "j6", title: "การแข่งขันกีฬาสีภายในโรงเรียน 'สามัคคีธรรมเกมส์'", pdfUrl: "#", thumbnail: "https://picsum.photos/seed/j6/400/600", month: "มีนาคม", year: "2567", views: 405, dateStr: "2024-03-01", issue: "ฉบับที่ 3 ประจำปี 2566" },
  { id: "j7", title: "กิจกรรมวันเด็กแห่งชาติและวันครู ประจำปี 2567", pdfUrl: "#", thumbnail: "https://picsum.photos/seed/j7/400/600", month: "กุมภาพันธ์", year: "2567", views: 234, dateStr: "2024-02-01", issue: "ฉบับเดือนกุมภาพันธ์ 2567" },
  { id: "j8", title: "สวัสดีปีใหม่และกิจกรรมทำบุญตักบาตรที่โรงเรียน", pdfUrl: "#", thumbnail: "https://picsum.photos/seed/j8/400/600", month: "มกราคม", year: "2567", views: 367, dateStr: "2024-01-01", issue: "ฉบับที่ 1 ประจำปี 2567" },
];

export const INITIAL_MENUS: MenuItem[] = [
  { id: "m1", label: "หน้าแรก", path: "#/", isActive: true, type: 'link', isDefault: true },
  { id: "m2", label: "เกี่ยวกับโรงเรียน", path: "#/about", isActive: true, type: 'link', isDefault: true },
  { id: "m3", label: "ทำเนียบบุคลากร", path: "#/staff", isActive: true, type: 'link', isDefault: true },
  { id: "m4", label: "ข่าวสาร", path: "#/news", isActive: true, type: 'link', isDefault: true },
  { id: "m5", label: "วารสาร", path: "#/journals", isActive: true, type: 'link', isDefault: true },
  { id: "m6", label: "ติดต่อเรา", path: "#/contact", isActive: true, type: 'link', isDefault: true },
];

export const INITIAL_EVENTS: CalendarEvent[] = [
  { id: 'e1', title: 'ประชุมผู้ปกครอง', description: 'ประชุมชี้แจงแนวทางการจัดการเรียนการสอนภาคเรียนที่ 1', date: '2024-05-15', type: 'meeting' },
  { id: 'e2', title: 'วันสถาปนาโรงเรียน', description: 'พิธีทำบุญเนื่องในวันคล้ายวันสถาปนาโรงเรียน', date: '2024-06-10', type: 'activity' },
  { id: 'e3', title: 'สอบกลางภาค', description: 'กำหนดการสอบกลางภาคเรียนที่ 1/2567', date: '2024-07-18', type: 'exam' },
  { id: 'e4', title: 'กิจกรรมวันแม่', description: 'กิจกรรมเฉลิมพระเกียรติและวันแม่แห่งชาติ', date: '2024-08-12', type: 'activity' },
];
