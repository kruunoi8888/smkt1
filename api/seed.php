<?php
require_once 'db.php';

// This script seeds the database with initial data
// WARNING: This will truncate existing data in the tables mentioned below

$tables_to_clear = ['news', 'achievements', 'personnel', 'journals', 'menus', 'events', 'grade_stats', 'slides', 'widgets', 'shortcuts', 'hero_shortcuts', 'admin_users', 'school_config'];

try {
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0");
    foreach ($tables_to_clear as $t) {
        $pdo->exec("TRUNCATE TABLE $t");
    }
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");

    // Admin Users
    $admins = [
        ['admin1', 'admin', 'admin8888', 'Mr.Ratchapon Worrakan', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander', '0815144041', 'kruunoi@gmail.com', 1]
    ];
    $stmt = $pdo->prepare("INSERT INTO admin_users (id, username, password, name, image, phone, email, isDefault) VALUES (?,?,?,?,?,?,?,?)");
    foreach ($admins as $a) $stmt->execute($a);

    // School Config
    $pdo->exec("INSERT INTO school_config (id, name, area, director_id, videoUrl, primaryColor, secondaryColor, logo, address, phone, email, facebook, bannerImage, bannerSlogan, bannerTextColor, sloganBorderColor, sloganTextColor, bodyBackgroundColor, bodyTextColor, footerBackgroundColor, footerTextColor, fontFamily, visitor_today, visitor_month, visitor_total) 
    VALUES (1, 'โรงเรียนวัดสามัคคีธรรม', 'สำนักงานเขตพื้นที่การศึกษาประถมศึกษาสุพรรณบุรี เขต 3', 'dir1', 'https://www.youtube.com/embed/nTdb2QZ5ZaQ?si=pOW08WT26ejJalyB', '#0f172a', '#facc15', 'https://picsum.photos/seed/logo/200/200', 'เลขที่ 8 หมู่ 12 ตำบลหนองโพธิ์ อำเภอหนองหญ้าไซ จังหวัดสุพรรณบุรี 72240', '081-5144041', 'watsamakkhi@example.ac.th', 'https://facebook.com/watsamakkhi', 'https://images.unsplash.com/photo-1523050853064-814041697262?q=80&w=2070', 'สร้างคนดี มีความรู้ คู่คุณธรรม นำเทคโนโลยี', '#ffffff', '#fbbf24', '#0f172a', '#f8fafc', '#334155', '#0f172a', '#94a3b8', 'Kanit', 124, 3450, 128450)");

    // Personnel
    $personnel = [
        ['dir1', 'นายสมชาย ใจดี', 'ผู้อำนวยการโรงเรียน', '', 'ฝ่ายบริหาร', 'ผู้อำนวยการชำนาญการพิเศษ', 'male'],
        ['dep1', 'นางสาวสมหญิง มุ่งมั่น', 'รองผู้อำนวยการโรงเรียน', '', 'บริหาร', 'รองผู้อำนวยการชำนาญการ', 'female'],
        ['p1', 'นางสาวพรทิพย์ สุขุม', 'ครู', '', 'วิชาการ', 'ครูชำนาญการพิเศษ', 'female'],
        ['p2', 'นายวิชัย มั่นคง', 'ครู', '', 'ปกครอง', 'ครูชำนาญการ', 'male'],
        ['p3', 'นางแก้วใจ ใฝ่เรียน', 'ครู', '', 'วิชาการ', 'ครูชำนาญการพิเศษ', 'female'],
        ['p4', 'นายมานพ เก่งกาจ', 'ครู', '', 'พละศึกษา', 'ครู คศ.1', 'male'],
        ['p5', 'นางมณี รัตนไพศาล', 'ครู', '', 'ภาษาไทย', 'ครูชำนาญการ', 'female'],
        ['p6', 'นายอานนท์ มีทรัพย์', 'ครู', '', 'คณิตศาสตร์', 'ครูชำนาญการพิเศษ', 'male']
    ];
    $stmt = $pdo->prepare("INSERT INTO personnel (id, name, position, image, department, rank, gender) VALUES (?,?,?,?,?,?,?)");
    foreach ($personnel as $p) $stmt->execute($p);

    // News
    $news = [
        ['n1', 'กิจกรรมวันแม่แห่งชาติ ประจำปี 2567', 'โรงเรียนวัดสามัคคีธรรม จัดกิจกรรมเฉลิมพระเกียรติเนื่องในโอกาสวันเฉลิมพระชนมพรรษา สมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง', 'https://picsum.photos/seed/news1/800/400', '[]', '2024-08-12', 1245, 'Activity'],
        ['n2', 'โครงการทัศนศึกษา แหล่งเรียนรู้ภูมิปัญญาท้องถิ่น', 'พานักเรียนเข้าศึกษาดูงาน ณ พิพิธภัณฑสถานแห่งชาติ เพื่อเสริมสร้างประสบการณ์นอกห้องเรียน', 'https://picsum.photos/seed/news2/800/400', '[]', '2024-07-20', 856, 'Academic'],
        ['n3', 'การแข่งขันกีฬาสีภายใน \'สามัคคีธรรมเกมส์\'', 'ร่วมชมและเชียร์การแข่งขันกีฬาสี เพื่อเสริมสร้างความสามัคคีและสุขภาพที่แข็งแรงของนักเรียน', 'https://picsum.photos/seed/news3/800/400', '[]', '2024-06-15', 2103, 'Activity'],
        ['n4', 'อบรมเชิงปฏิบัติการ การใช้เทคโนโลยีดิจิทัลเพื่อการเรียนรู้', 'ครูและบุคลากรเข้าร่วมการอบรมพัฒนาทักษะการใช้สื่อ ICT ในการจัดการเรียนการสอนยุคใหม่', 'https://picsum.photos/seed/news4/800/400', '[]', '2024-05-30', 540, 'PR'],
        ['n5', 'กิจกรรมค่ายภาษาอังกฤษ English Summer Camp', 'นักเรียนเข้าร่วมกิจกรรมค่ายภาษาอังกฤษเพื่อพัฒนาทักษะการสื่อสารกับเจ้าของภาษาอย่างสนุกสนาน', 'https://picsum.photos/seed/news5/800/400', '[]', '2024-04-12', 1120, 'Activity'],
        ['n6', 'โครงการโรงเรียนสีขาว ปลอดยาเสพติด', 'สร้างภูมิคุ้มกันให้นักเรียนห่างไกลยาเสพติดและอบายมุขทุกรูปแบบ เพื่ออนาคตที่สดใส', 'https://picsum.photos/seed/news6/800/400', '[]', '2024-03-25', 780, 'PR']
    ];
    $stmt = $pdo->prepare("INSERT INTO news (id, title, content, image, images, date, views, category) VALUES (?,?,?,?,?,?,?,?)");
    foreach ($news as $n) $stmt->execute($n);

    // Achievements
    $achievements = [
        ['a1', 'รางวัลเหรียญทอง การแข่งขันหุ่นยนต์ระดับจังหวัด', 'นักเรียนโรงเรียนวัดสามัคคีธรรม ได้รับรางวัลเหรียญทองจากการแข่งขันหุ่นยนต์ระดับจังหวัด ประจำปีการศึกษา 2567 โดยแสดงทักษะการเขียนโปรแกรมและการออกแบบหุ่นยนต์ที่ยอดเยี่ยม สามารถแก้โจทย์ปัญหาที่ซับซ้อนได้อย่างรวดเร็วและแม่นยำ สร้างความภาคภูมิใจให้กับโรงเรียนเป็นอย่างยิ่ง', 'https://picsum.photos/seed/a1/600/400', '["https://picsum.photos/seed/a1-1/600/400", "https://picsum.photos/seed/a1-2/600/400", "https://picsum.photos/seed/a1-3/600/400"]', '2024-05-15', 1540],
        ['a2', 'โรงเรียนส่งเสริมสุขภาพ ระดับทอง ประจำปี 2567', 'โรงเรียนวัดสามัคคีธรรม ผ่านการประเมินโรงเรียนส่งเสริมสุขภาพ ระดับทอง ประจำปี 2567 จากกระทรวงสาธารณสุข สะท้อนถึงการจัดการด้านสุขาภิบาล อาหาร และสิ่งแวดล้อมในโรงเรียนที่ได้มาตรฐานสากล เพื่อสุขภาวะที่ดีของนักเรียนและบุคลากรทุกคน', 'https://picsum.photos/seed/a2/600/400', '["https://picsum.photos/seed/a2-1/600/400", "https://picsum.photos/seed/a2-2/600/400"]', '2024-06-10', 980],
        ['a3', 'รางวัลสถานศึกษาสีขาว ปลอดยาเสพติดดีเด่น', 'โรงเรียนได้รับรางวัลสถานศึกษาสีขาว ปลอดยาเสพติดและอบายมุขดีเด่น ระดับทอง ประจำปีการศึกษา 2567 จากการดำเนินโครงการเชิงรุกเพื่อสร้างภูมิคุ้มกันให้นักเรียนห่างไกลจากยาเสพติด โดยได้รับความร่วมมือจากผู้ปกครองและชุมชนเป็นอย่างดี', 'https://picsum.photos/seed/a3/600/400', '["https://picsum.photos/seed/a3-1/600/400", "https://picsum.photos/seed/a3-2/600/400", "https://picsum.photos/seed/a3-3/600/400"]', '2024-07-05', 2310]
    ];
    $stmt = $pdo->prepare("INSERT INTO achievements (id, title, content, image, images, date, views) VALUES (?,?,?,?,?,?,?)");
    foreach ($achievements as $a) $stmt->execute($a);

    // Journals
    $journals = [
        ['j1', 'นิเทศ เยี่ยมชม ให้กำลังใจ', '#', 'https://picsum.photos/seed/j1/400/600', 'สิงหาคม', '2567', 452, '2024-08-01', 'ฉบับที่ 1 เดือนสิงหาคม 2567'],
        ['j2', 'กิจกรรมวันแม่แห่งชาติและวันสำคัญทางศาสนา', '#', 'https://picsum.photos/seed/j2/400/600', 'กรกฎาคม', '2567', 320, '2024-07-01', 'ฉบับเดือนกรกฎาคม 2567'],
        ['j3', 'โครงการทัศนศึกษาแหล่งเรียนรู้ภูมิปัญญาสองพี่น้อง', '#', 'https://picsum.photos/seed/j3/400/600', 'มิถุนายน', '2567', 280, '2024-06-01', 'ฉบับเดือนมิถุนายน 2567'],
        ['j4', 'การเตรียมความพร้อมก่อนเปิดภาคเรียนและการจัดทำแผนการสอน', '#', 'https://picsum.photos/seed/j4/400/600', 'พฤษภาคม', '2567', 512, '2024-05-01', 'ฉบับที่ 2 ประจำปีการศึกษา 2567']
    ];
    $stmt = $pdo->prepare("INSERT INTO journals (id, title, pdfUrl, thumbnail, month, year, views, dateStr, issue) VALUES (?,?,?,?,?,?,?,?,?)");
    foreach ($journals as $j) $stmt->execute($j);

    // Menus
    $menus = [
        ['m1', 'หน้าแรก', '#/', 1, '', '', 'link'],
        ['m2', 'เกี่ยวกับโรงเรียน', '#/about', 1, '', '', 'link'],
        ['m3', 'ทำเนียบบุคลากร', '#/staff', 1, '', '', 'link'],
        ['m4', 'ข่าวสาร', '#/news', 1, '', '', 'link'],
        ['m5', 'วารสาร', '#/journals', 1, '', '', 'link'],
        ['m6', 'ติดต่อเรา', '#/contact', 1, '', '', 'link']
    ];
    $stmt = $pdo->prepare("INSERT INTO menus (id, label, path, isActive, content, image, type) VALUES (?,?,?,?,?,?,?)");
    foreach ($menus as $m) $stmt->execute($m);

    // Events
    $events = [
        ['e1', 'ประชุมผู้ปกครอง', 'ประชุมชี้แจงแนวทางการจัดการเรียนการสอนภาคเรียนที่ 1', '2024-05-15', 'meeting'],
        ['e2', 'วันสถาปนาโรงเรียน', 'พิธีทำบุญเนื่องในวันคล้ายวันสถาปนาโรงเรียน', '2024-06-10', 'activity'],
        ['e3', 'สอบกลางภาค', 'กำหนดการสอบกลางภาคเรียนที่ 1/2567', '2024-07-18', 'exam'],
        ['e4', 'กิจกรรมวันแม่', 'กิจกรรมเฉลิมพระเกียรติและวันแม่แห่งชาติ', '2024-08-12', 'activity']
    ];
    $stmt = $pdo->prepare("INSERT INTO events (id, title, description, date, type) VALUES (?,?,?,?,?)");
    foreach ($events as $e) $stmt->execute($e);

    // Grade Stats
    $grade_stats = [
        ['g1', 'อนุบาล 2', 1, 1],
        ['g2', 'อนุบาล 3', 3, 4],
        ['g3', 'ประถมศึกษาปีที่ 1', 2, 3],
        ['g4', 'ประถมศึกษาปีที่ 2', 3, 0],
        ['g5', 'ประถมศึกษาปีที่ 3', 0, 5],
        ['g6', 'ประถมศึกษาปีที่ 4', 3, 2],
        ['g7', 'ประถมศึกษาปีที่ 5', 7, 2],
        ['g8', 'ประถมศึกษาปีที่ 6', 3, 3]
    ];
    $stmt = $pdo->prepare("INSERT INTO grade_stats (id, grade, male, female) VALUES (?,?,?,?)");
    foreach ($grade_stats as $gs) $stmt->execute($gs);

    // Slides
    $slides = [
        ['s1', 'https://picsum.photos/seed/school-activity-1/1200/600', 'กิจกรรมพัฒนาผู้เรียน', 'ส่งเสริมการเรียนรู้นอกห้องเรียนเพื่อประสบการณ์ที่กว้างไกล'],
        ['s2', 'https://picsum.photos/seed/school-activity-2/1200/600', 'การเรียนการสอนยุคใหม่', 'ใช้เทคโนโลยีเข้ามามีส่วนร่วมในการจัดการเรียนรู้'],
        ['s3', 'https://picsum.photos/seed/school-activity-3/1200/600', 'กิจกรรมวันสำคัญ', 'ปล่งฝังคุณธรรม จริยธรรม และวัฒนธรรมไทย']
    ];
    $stmt = $pdo->prepare("INSERT INTO slides (id, image, title, description) VALUES (?,?,?,?)");
    foreach ($slides as $s) $stmt->execute($s);

    // Widgets
    $pdo->exec("INSERT INTO widgets (id, title, type, position, isActive, showTitle, content) VALUES ('w1', 'ลิงก์หน่วยงานที่เกี่ยวข้อง', 'shortcut', 'banner', 1, 1, '')");

    // Shortcuts
    $shortcuts = [
        ['sc1', 'w1', 'กระทรวงศึกษาธิการ', 'https://moe360.moe.go.th/wp-content/uploads/2021/04/Logo-MOE-1.png', 'https://www.moe.go.th/', 1, 'link', '', '', ''],
        ['sc2', 'w1', 'สพฐ.', 'https://www.obec.go.th/wp-content/uploads/2019/04/logo-obec.png', 'https://www.obec.go.th/', 1, 'link', '', '', ''],
        ['sc3', 'w1', 'คุรุสภา', 'https://www.ksp.or.th/wp-content/uploads/2023/12/logo-ksp.png', 'https://www.ksp.or.th/', 1, 'link', '', '', ''],
        ['sc4', 'w1', 'สทศ. (O-NET)', 'https://www.niets.or.th/uploads/logo/logo.png', 'https://www.niets.or.th/', 1, 'link', '', '', '']
    ];
    $stmt = $pdo->prepare("INSERT INTO shortcuts (id, widget_id, title, image, url, isActive, type, content, bgColor, textColor) VALUES (?,?,?,?,?,?,?,?,?,?)");
    foreach ($shortcuts as $sc) $stmt->execute($sc);

    // Hero Shortcuts
    $hero_shortcuts = [
        ['hs1', 'เกี่ยวกับโรงเรียน', '', '#/about', 1, 'link', '', '', ''],
        ['hs2', 'ดูข่าวสารล่าสุด', '', '#/news', 1, 'link', '', '', '']
    ];
    $stmt = $pdo->prepare("INSERT INTO hero_shortcuts (id, title, image, url, isActive, type, content, bgColor, textColor) VALUES (?,?,?,?,?,?,?,?,?)");
    foreach ($hero_shortcuts as $hs) $stmt->execute($hs);

    echo json_encode(["success" => true, "message" => "Database seeded successfully"]);

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
