-- เพิ่มคอลัมน์ bannerImage ลงในตาราง config
ALTER TABLE config ADD COLUMN IF NOT EXISTS "bannerImage" TEXT;
