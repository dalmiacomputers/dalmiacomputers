<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__.'/db.php'; cors();
$pdo = db();
$sql = <<<SQL
CREATE TABLE IF NOT EXISTS dc_customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mobile VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(120), email VARCHAR(160), address TEXT,
  ptype VARCHAR(40), brand VARCHAR(80), serial VARCHAR(120),
  pdate DATE NULL, wend DATE NULL, pref VARCHAR(20), notes TEXT,
  invoice_path VARCHAR(255), source VARCHAR(40),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS dc_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mobile VARCHAR(20) NOT NULL, title VARCHAR(160), category VARCHAR(80), notes TEXT,
  status ENUM('pending','added','notified') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS dc_contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mobile VARCHAR(20), name VARCHAR(120), email VARCHAR(160), subject VARCHAR(180), message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS dc_careers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mobile VARCHAR(20), name VARCHAR(120), email VARCHAR(160), role VARCHAR(120),
  experience TEXT, whyjoin TEXT, resume_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS dc_exchange (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mobile VARCHAR(20), category VARCHAR(30), answers JSON, estimate INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS dc_qa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT, answer TEXT, lang VARCHAR(8) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS dc_blog (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(160) UNIQUE, title VARCHAR(200), lang VARCHAR(8) DEFAULT 'en',
  html MEDIUMTEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NULL
);
SQL;
try{ $pdo->exec($sql); out(['ok'=&gt;true,'msg'=&gt;'Tables ensured']); }catch(Exception $e){ out(['ok'=&gt;false,'err'=&gt;$e-&gt;getMessage()],500); }
