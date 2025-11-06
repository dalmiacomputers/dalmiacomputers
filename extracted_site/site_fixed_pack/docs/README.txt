
Dalmia CMS — Option C (Static Export) v4.3.1

1) Create database and import docs/schema.sql
2) Edit admin/config.php with DB credentials and change DC_ADMIN_PIN
3) Upload whole package to /public_html
4) Visit /admin/login.php —> enter PIN —> fill Global Settings
5) Open "Pages" section — fill Products/Services/Contact content & schema (already prepared in earlier pack if you paste)
6) Click "Export Static" — pages will write to /public/pages/<slug>/index.html
7) Link nav to /pages/<slug> on your live site
