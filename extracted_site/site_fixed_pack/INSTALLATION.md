# Installation Guide - Dalmia Universal PHP Connector

## Fixed Issues
✅ HTML encoding problems in PHP files
✅ Security vulnerabilities in file uploads
✅ CSRF protection added
✅ Input validation improved
✅ Error handling enhanced
✅ .htaccess security headers added
✅ Upload directory protection

## Setup Instructions

### 1. Database Setup
1. Create MySQL database and user
2. Import `schema.sql` to create the `dc_customers` table
3. Update `api/config.php` with your database credentials

### 2. File Upload
1. Ensure `uploads/` directory exists and is writable (755 permissions)
2. The `.htaccess` file in uploads/ prevents PHP execution for security

### 3. Configuration
Edit `api/config.php`:
```php
define('DB_HOST','localhost');
define('DB_NAME','your_database_name');
define('DB_USER','your_db_username');
define('DB_PASS','your_db_password');
define('ADMIN_TOKEN','your_secure_admin_token_here');
define('ALLOWED_ORIGINS','https://yourdomain.com');
```

### 4. Security Features Added
- File upload validation (PDF, JPG, PNG only, max 5MB)
- CSRF token protection
- Input sanitization
- SQL injection prevention
- XSS protection headers
- Directory traversal protection

### 5. API Endpoints
- `POST /api/universal-leads.php` - Create/update customer profile
- `GET /api/get_profile.php?m=mobile` - Get customer profile
- `POST /api/upload.php` - Upload invoice files
- `GET /api/export_json.php?token=ADMIN_TOKEN` - Export all data (admin only)

### 6. Forms
- `/forms/support.php` - Customer care form
- `/forms/profile.php?m=mobile` - Profile update form (shareable link)

### 7. Testing
Test the endpoints:
```bash
# Create profile
curl -X POST https://yourdomain.com/api/universal-leads.php \
  -H "Content-Type: application/json" \
  -d '{"mobile":"9734290001","name":"Test User","ptype":"Laptop"}'

# Get profile
curl "https://yourdomain.com/api/get_profile.php?m=9734290001"
```

## Security Notes
- All file uploads are validated and stored securely
- CSRF tokens protect against cross-site request forgery
- Input validation prevents SQL injection and XSS
- Admin token required for data export
- Upload directory prevents PHP execution