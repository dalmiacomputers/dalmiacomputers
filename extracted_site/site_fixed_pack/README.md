# Dalmia Universal PHP Connector (v1)

This pack adds a **single, central database** for all forms on your site (keyed by **mobile number**) + invoice upload.

## 1) Files in this zip
```
/api/
  config.php           ← put DB creds + allowed origins + admin token
  db.php               ← PDO + CORS + helpers
  universal-leads.php  ← POST JSON to create/update profile
  get_profile.php      ← GET ?m=mobile to fetch
  upload.php           ← POST multipart (mobile + invoice)
  export_json.php      ← GET ?token=ADMIN_TOKEN to download all

/forms/
  support.php          ← Customer Care (server-backed)
  profile.php          ← Shareable profile edit (server-backed)

/assets/js/
  universal-client.js  ← Frontend helper (posts to API, handles upload)

/uploads/             ← invoice files land here (auto-created)

schema.sql            ← MySQL table for `dc_customers`
README.md             ← this file
```

## 2) Setup on cPanel (GoDaddy)
1. Create a MySQL database + user. Give full permissions.
2. In **phpMyAdmin**, run `schema.sql` to create table.
3. Edit `/api/config.php` with your DB name, user, pass. Change `ADMIN_TOKEN` to a strong secret.
4. Upload entire zip to your document root, extract. Ensure `/uploads` is writable (755 or 775).
5. Test endpoints:
   - `https://YOURDOMAIN/api/get_profile.php?m=9734290001`
   - POST JSON to `https://YOURDOMAIN/api/universal-leads.php`

## 3) Wiring your pages
- Replace old Customer Care page with `/forms/support.php` **or** copy the form markup & include `<script src="/assets/js/universal-client.js"></script>`; then change `onsubmit="saveUniversalAPI(this,'support')"`.
- Use `/forms/profile.php?m=MOBILE` as the **share link** in WhatsApp/SMS campaigns.

## 4) cURL examples
Create/Update:
```bash
curl -X POST https://YOURDOMAIN/api/universal-leads.php  -H "Content-Type: application/json"  -d '{"mobile":"9734290001","name":"Amit","ptype":"Laptop","brand":"HP"}'
```

Upload invoice:
```bash
curl -X POST https://YOURDOMAIN/api/upload.php  -F "mobile=9734290001" -F "invoice=@/path/invoice.pdf"
```

Export (admin):
```bash
curl "https://YOURDOMAIN/api/export_json.php?token=YOUR_ADMIN_TOKEN" -O
```

## 5) Security notes
- `ADMIN_TOKEN` protects export. Keep it secret.
- For file uploads, only **PDF/JPG/PNG** are allowed; paths are randomized and stored server-side.
- CORS is limited to `ALLOWED_ORIGINS` in `config.php`.

## 6) Expand later
- Add endpoints for Lucky Draw / Selfie Contest using the same `mobile` key.
- Add SMTP (PHPMailer) to confirm submissions.
- Add reCAPTCHA v3 if you want bot protection.

— Built for Dalmia Computers · 2025-11-04
