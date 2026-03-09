-- ปิดการใช้งาน RLS สำหรับตารางทั้งหมดชั่วคราวเพื่อให้ Frontend ของเรา (ที่ยังไม่ได้เชื่อม Auth อย่างเต็มรูปแบบ) สามารถเขียน/อ่านได้
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE school_config DISABLE ROW LEVEL SECURITY;
ALTER TABLE news DISABLE ROW LEVEL SECURITY;
ALTER TABLE achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE personnel DISABLE ROW LEVEL SECURITY;
ALTER TABLE journals DISABLE ROW LEVEL SECURITY;
ALTER TABLE menus DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE grade_stats DISABLE ROW LEVEL SECURITY;
ALTER TABLE slides DISABLE ROW LEVEL SECURITY;
ALTER TABLE widgets DISABLE ROW LEVEL SECURITY;
ALTER TABLE shortcuts DISABLE ROW LEVEL SECURITY;
ALTER TABLE hero_shortcuts DISABLE ROW LEVEL SECURITY;

-- หรือถ้าตารางยังไม่ได้ถูกสร้างตาม Schema ใหม่ ให้รันคำสั่งทั้งหมดที่มีในกล่องข้อความนี้
