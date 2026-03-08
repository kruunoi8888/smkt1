import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // Mock Data Store (In-memory for preview)
  let mockData: any = {
    config: {
      id: 1,
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
      primaryColor: "#0f172a",
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
    },
    news: [
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
      }
    ],
    achievements: [
      { 
        id: "a1", 
        title: "รางวัลเหรียญทอง การแข่งขันหุ่นยนต์ระดับจังหวัด", 
        content: "นักเรียนโรงเรียนวัดสามัคคีธรรม ได้รับรางวัลเหรียญทองจากการแข่งขันหุ่นยนต์ระดับจังหวัด ประจำปีการศึกษา 2567",
        image: "https://picsum.photos/seed/a1/600/400", 
        images: ["https://picsum.photos/seed/a1-1/600/400"],
        date: "2024-05-15", 
        views: 1540 
      }
    ],
    personnel: [
      { id: "dir", name: "นายสมชาย ใจดี", position: "ผู้อำนวยการโรงเรียน", image: "", department: "บริหาร", rank: "ผู้อำนวยการชำนาญการพิเศษ", gender: 'male' },
      { id: "dep1", name: "นางสาวสมหญิง มุ่งมั่น", position: "รองผู้อำนวยการโรงเรียน", image: "", department: "บริหาร", rank: "รองผู้อำนวยการชำนาญการ", gender: 'female' }
    ],
    journals: [
      { id: "j1", title: "นิเทศ เยี่ยมชม ให้กำลังใจ", pdfUrl: "#", thumbnail: "https://picsum.photos/seed/j1/400/600", month: "สิงหาคม", year: "2567", views: 452, dateStr: "2024-08-01", issue: "ฉบับที่ 1 เดือนสิงหาคม 2567" }
    ],
    menus: [
      { id: "m1", label: "หน้าแรก", path: "#/", isActive: true, type: 'link', isDefault: true },
      { id: "m2", label: "เกี่ยวกับโรงเรียน", path: "#/about", isActive: true, type: 'link', isDefault: true },
      { id: "m3", label: "ทำเนียบบุคลากร", path: "#/staff", isActive: true, type: 'link', isDefault: true },
      { id: "m4", label: "ข่าวสาร", path: "#/news", isActive: true, type: 'link', isDefault: true },
      { id: "m5", label: "วารสาร", path: "#/journals", isActive: true, type: 'link', isDefault: true },
      { id: "m6", label: "ติดต่อเรา", path: "#/contact", isActive: true, type: 'link', isDefault: true },
    ],
    events: [
      { id: 'e1', title: 'ประชุมผู้ปกครอง', description: 'ประชุมชี้แจงแนวทางการจัดการเรียนการสอนภาคเรียนที่ 1', date: '2024-05-15', type: 'meeting' }
    ],
    admin_users: [
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
    ]
  };

  // API Routes (Mocking PHP Backend)
  app.post("/api/auth.php", (req, res) => {
    const { action } = req.query;
    const { username, password } = req.body;

    if (action === 'login') {
      const user = mockData.admin_users.find((u: any) => u.username === username && u.password === password);
      if (user) {
        res.json({ success: true, isLoggedIn: true, user: { id: user.id, username: user.username } });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else if (action === 'check') {
      res.json({ success: true, isLoggedIn: true, user: mockData.admin_users[0] });
    } else if (action === 'logout') {
      res.json({ success: true, isLoggedIn: false });
    }
  });

  app.get("/api/auth.php", (req, res) => {
    const { action } = req.query;
    if (action === 'check') {
      res.json({ success: true, isLoggedIn: true, user: mockData.admin_users[0] });
    } else if (action === 'logout') {
      res.json({ success: true, isLoggedIn: false });
    }
  });

  app.get("/api/data.php", (req, res) => {
    const { type, id } = req.query;
    const table = type as string;

    if (table === 'config') {
      res.json(mockData.config);
    } else if (mockData[table]) {
      if (id) {
        const item = mockData[table].find((i: any) => i.id === id);
        res.json(item || { error: "Not found" });
      } else {
        res.json(mockData[table]);
      }
    } else {
      res.status(400).json({ error: "Invalid type" });
    }
  });

  app.post("/api/data.php", (req, res) => {
    const { type } = req.query;
    const table = type as string;
    const data = req.body;

    if (table === 'config') {
      mockData.config = { ...mockData.config, ...data };
      res.json({ success: true });
    } else if (mockData[table]) {
      const index = mockData[table].findIndex((i: any) => i.id === data.id);
      if (index !== -1) {
        mockData[table][index] = data;
      } else {
        mockData[table].push(data);
      }
      res.json({ success: true, id: data.id });
    } else {
      res.status(400).json({ error: "Invalid type" });
    }
  });

  app.delete("/api/data.php", (req, res) => {
    const { type, id } = req.query;
    const table = type as string;

    if (mockData[table]) {
      mockData[table] = mockData[table].filter((i: any) => i.id !== id);
      res.json({ success: true });
    } else {
      res.status(400).json({ error: "Invalid type" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
