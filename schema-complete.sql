-- 1. ลบตารางเก่าทิ้งทั้งหมด (Drop tables if they exist) เพื่อป้องกันโครงสร้างชนกัน (ระวังข้อมูลหายถ้าคุณเคยเพิ่มข้อมูลอะไรเข้าไปแล้ว แต่ถ้ายังไม่มีข้อมูล ให้รันได้เลย)
DROP TABLE IF EXISTS hero_shortcuts;
DROP TABLE IF EXISTS shortcuts;
DROP TABLE IF EXISTS widgets;
DROP TABLE IF EXISTS slides;
DROP TABLE IF EXISTS grade_stats;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS menus;
DROP TABLE IF EXISTS journals;
DROP TABLE IF EXISTS personnel;
DROP TABLE IF EXISTS achievements;
DROP TABLE IF EXISTS news;
DROP TABLE IF EXISTS config;
DROP TABLE IF EXISTS admin_users;

-- 2. สร้างตารางใหม่ทั้งหมด
CREATE TABLE admin_users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    image TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    isDefault BOOLEAN DEFAULT FALSE
);

CREATE TABLE config (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    area VARCHAR(255),
    director JSONB,
    stats JSONB,
    videoUrl TEXT,
    primaryColor VARCHAR(20),
    secondaryColor VARCHAR(20),
    logo TEXT,
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(100),
    facebook TEXT,
    socialMedia JSONB,
    slides JSONB,
    heroShortcuts JSONB,
    bannerImage TEXT,
    bannerSlogan TEXT,
    bannerTextColor VARCHAR(20),
    sloganBorderColor VARCHAR(20),
    sloganTextColor VARCHAR(20),
    bodyBackgroundColor VARCHAR(20),
    bodyTextColor VARCHAR(20),
    footerBackgroundColor VARCHAR(20),
    footerTextColor VARCHAR(20),
    fontFamily VARCHAR(50),
    widgets JSONB,
    visitorStats JSONB
);

CREATE TABLE news (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    image TEXT,
    images JSONB,
    date DATE,
    views INT DEFAULT 0,
    category VARCHAR(50)
);

CREATE TABLE achievements (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    image TEXT,
    images JSONB,
    date DATE,
    views INT DEFAULT 0
);

CREATE TABLE personnel (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100),
    image TEXT,
    department VARCHAR(100),
    rank VARCHAR(100),
    gender VARCHAR(20)
);

CREATE TABLE journals (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    pdfUrl TEXT,
    thumbnail TEXT,
    month VARCHAR(50),
    year VARCHAR(10),
    views INT DEFAULT 0,
    dateStr DATE,
    issue VARCHAR(100)
);

CREATE TABLE menus (
    id VARCHAR(50) PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    path VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    isDefault BOOLEAN DEFAULT FALSE,
    content TEXT,
    image TEXT,
    type VARCHAR(20)
);

CREATE TABLE events (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE,
    type VARCHAR(50)
);

-- 3. ปิด RLS เพื่อให้ใช้งานได้เลยแบบไม่ติด Authentication ของตาราง
ALTER TABLE config DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE news DISABLE ROW LEVEL SECURITY;
ALTER TABLE achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE personnel DISABLE ROW LEVEL SECURITY;
ALTER TABLE journals DISABLE ROW LEVEL SECURITY;
ALTER TABLE menus DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;

-- 4. เพิ่มข้อมูลตั้งต้นสำหรับแอดมิน (ถ้าเพิ่งสร้างตารางแอดมินใหม่)
INSERT INTO admin_users (id, username, password, name, phone, email, isDefault) 
VALUES ('admin1', 'admin', 'kn@25180508', 'Mr.Ratchapol Worrakan', '0815144041', 'kruunoi@gmail.com', true)
ON CONFLICT (id) DO NOTHING;

-- 5. สร้างข้อมูลเริ่มต้นของ Config 
INSERT INTO config (id, name, address, email, phone) 
VALUES (1, 'โรงเรียนวัดสามัคคีธรรม', 'เลขที่ 8 หมู่ 12 ตำบลหนองโพธิ์ อำเภอหนองหญ้าไซ จังหวัดสุพรรณบุรี 72240', 'watsamakkhi@example.ac.th', '081-5144041')
ON CONFLICT (id) DO NOTHING;
