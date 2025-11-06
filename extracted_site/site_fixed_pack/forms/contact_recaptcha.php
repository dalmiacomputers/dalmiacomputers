<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Dalmia Computers</title>
    <meta name="recaptcha-site-key" content="<?php echo defined('RECAPTCHA_SITE_KEY') ? RECAPTCHA_SITE_KEY : 'your_site_key'; ?>">
    <meta name="csrf-token" content="<?php echo bin2hex(random_bytes(32)); ?>">
    <link rel="stylesheet" href="/assets/css/premium-theme.css">
</head>
<body>
    <div class="container">
        <h1>Contact Us</h1>
        
        <form id="contact-form" data-recaptcha="true" data-ajax="true" data-action="contact" action="/api/save_contact.php" data-success-message="Thank you! We'll contact you soon.">
            <div class="form-group">
                <label>Name *</label>
                <input type="text" name="name" required>
            </div>
            
            <div class="form-group">
                <label>Mobile *</label>
                <input type="tel" name="mobile" pattern="[6-9][0-9]{9}" required>
            </div>
            
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email">
            </div>
            
            <div class="form-group">
                <label>Service Required *</label>
                <select name="service" required>
                    <option value="">Select Service</option>
                    <option value="laptop">Laptop Purchase</option>
                    <option value="desktop">Desktop Purchase</option>
                    <option value="printer">Printer Purchase</option>
                    <option value="cctv">CCTV Installation</option>
                    <option value="repair">Repair Service</option>
                    <option value="amc">AMC Plan</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Message *</label>
                <textarea name="message" rows="4" required></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary">Send Message</button>
            
            <p class="small">This site is protected by reCAPTCHA and the Google 
                <a href="https://policies.google.com/privacy">Privacy Policy</a> and 
                <a href="https://policies.google.com/terms">Terms of Service</a> apply.
            </p>
        </form>
    </div>
    
    <script src="/assets/js/recaptcha-handler.js"></script>
</body>
</html>