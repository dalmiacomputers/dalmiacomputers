<?php
// Premium Configuration for Dalmia Computers

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'dalmia_computers');
define('DB_USER', 'dalmia_user');
define('DB_PASS', 'secure_password_2025');
define('DB_CHARSET', 'utf8mb4');

// Security Configuration
define('ADMIN_TOKEN', 'dc_admin_2025_secure_token');
define('ALLOWED_ORIGINS', 'https://dalmiacomputers.in,http://localhost');
define('UPLOAD_MAX_SIZE', 5242880); // 5MB
define('ALLOWED_FILE_TYPES', 'pdf,jpg,jpeg,png');

// API Configuration
define('API_RATE_LIMIT', 100); // requests per hour
define('SESSION_TIMEOUT', 3600); // 1 hour

// Communication APIs
define('MSG91_API_KEY', 'your_msg91_api_key');
define('MSG91_SENDER_ID', 'DALMIA');
define('WHATSAPP_API_TOKEN', 'your_whatsapp_token');

// reCAPTCHA Configuration
define('RECAPTCHA_SITE_KEY', 'your_recaptcha_site_key');
define('RECAPTCHA_SECRET_KEY', 'your_recaptcha_secret_key');

// Email Configuration
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'dalmiacomputers@gmail.com');
define('SMTP_PASSWORD', 'your_app_password');

// Business Information
define('BUSINESS_NAME', 'Dalmia Computers');
define('BUSINESS_PHONE', '+919734290001');
define('BUSINESS_EMAIL', 'dalmiacomputers@gmail.com');
define('BUSINESS_ADDRESS', 'Bikash Bhawan, Near ICICI Bank, Ranchi Road, Purulia - 723101');
define('BUSINESS_GST', '19AEHPD9752K1Z0');

// Feature Flags
define('ENABLE_REVIEWS', true);
define('ENABLE_CHAT', true);
define('ENABLE_NOTIFICATIONS', true);
define('ENABLE_ANALYTICS', true);
?>