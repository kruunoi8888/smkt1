-- Database Schema for School Portal

CREATE TABLE IF NOT EXISTS admin_users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    image TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    isDefault BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS school_config (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    area VARCHAR(255),
    director_id VARCHAR(50),
    videoUrl TEXT,
    primaryColor VARCHAR(20),
    secondaryColor VARCHAR(20),
    logo TEXT,
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(100),
    facebook TEXT,
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
    visitor_today INT DEFAULT 0,
    visitor_month INT DEFAULT 0,
    visitor_total INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS news (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    image TEXT,
    images TEXT, -- JSON array
    date DATE,
    views INT DEFAULT 0,
    category VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS achievements (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    image TEXT,
    images TEXT, -- JSON array
    date DATE,
    views INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS personnel (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100),
    image TEXT,
    department VARCHAR(100),
    rank VARCHAR(100),
    gender ENUM('male', 'female')
);

CREATE TABLE IF NOT EXISTS journals (
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

CREATE TABLE IF NOT EXISTS menus (
    id VARCHAR(50) PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    path VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    content TEXT,
    image TEXT,
    type ENUM('link', 'page')
);

CREATE TABLE IF NOT EXISTS events (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE,
    type ENUM('holiday', 'activity', 'meeting', 'exam')
);

CREATE TABLE IF NOT EXISTS grade_stats (
    id VARCHAR(50) PRIMARY KEY,
    grade VARCHAR(50),
    male INT DEFAULT 0,
    female INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS slides (
    id VARCHAR(50) PRIMARY KEY,
    image TEXT,
    title VARCHAR(255),
    description TEXT
);

CREATE TABLE IF NOT EXISTS widgets (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255),
    type ENUM('shortcut', 'iframe', 'html', 'custom'),
    position ENUM('banner', 'middle', 'bottom'),
    isActive BOOLEAN DEFAULT TRUE,
    showTitle BOOLEAN DEFAULT TRUE,
    content TEXT
);

CREATE TABLE IF NOT EXISTS shortcuts (
    id VARCHAR(50) PRIMARY KEY,
    widget_id VARCHAR(50),
    title VARCHAR(255),
    image TEXT,
    url TEXT,
    isActive BOOLEAN DEFAULT TRUE,
    type ENUM('link', 'page'),
    content TEXT,
    bgColor VARCHAR(20),
    textColor VARCHAR(20),
    FOREIGN KEY (widget_id) REFERENCES widgets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hero_shortcuts (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255),
    image TEXT,
    url TEXT,
    isActive BOOLEAN DEFAULT TRUE,
    type ENUM('link', 'page'),
    content TEXT,
    bgColor VARCHAR(20),
    textColor VARCHAR(20)
);
