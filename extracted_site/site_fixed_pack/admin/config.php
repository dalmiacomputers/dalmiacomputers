<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
declare(strict_types=1);
define('DC_DB_HOST', getenv('DC_DB_HOST') ?: 'localhost');
define('DC_DB_NAME', getenv('DC_DB_NAME') ?: 'dalmia_db');
define('DC_DB_USER', getenv('DC_DB_USER') ?: 'dalmia_user');
define('DC_DB_PASS', getenv('DC_DB_PASS') ?: '');

define('DC_ADMIN_EMAIL', 'dalmiacomputers@gmail.com');
define('DC_ADMIN_PIN', '123456'); // change after upload

define('DC_RECAPTCHA_SITE', getenv('DC_RECAPTCHA_SITE') ?: 'SITE_KEY_HERE');
define('DC_RECAPTCHA_SECRET', getenv('DC_RECAPTCHA_SECRET') ?: 'SECRET_KEY_HERE');

define('DC_EXPORT_DIR', __DIR__ . '/../public/pages');
define('DC_UPLOAD_DIR', __DIR__ . '/../uploads');

$pdo = new PDO('mysql:host='.DC_DB_HOST.';dbname='.DC_DB_NAME.';charset=utf8mb4', DC_DB_USER, DC_DB_PASS, [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE =&gt; PDO::FETCH_ASSOC
]);
?&gt;