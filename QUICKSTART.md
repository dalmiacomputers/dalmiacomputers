# Quick Start Guide

Get your directory submission automation system running in 5 minutes!

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Start the server
npm start
```

## Access the Application

Open your browser and go to: **http://localhost:3000**

## Demo Mode

The system works out-of-the-box in demo mode:

- ✅ Landing page is fully functional
- ✅ OTP codes are shown in console logs
- ✅ Submissions are simulated (90% success rate)
- ✅ No external services required

### View OTP Codes

When testing OTP verification, check your terminal for messages like:

```
Email OTP (Demo Mode): 123456 for user@example.com
SMS OTP (Demo Mode): 654321 for +1234567890
```

## Enabling Real Features

### 1. Email OTP (Gmail Example)

Edit `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youremail@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com
```

**Get Gmail App Password:**
1. Go to Google Account Settings
2. Enable 2-Factor Authentication
3. Generate App Password for "Mail"
4. Use that password in SMTP_PASS

### 2. SMS/WhatsApp OTP (Twilio)

1. Sign up at https://www.twilio.com (free trial available)
2. Get your credentials from Twilio Console
3. Edit `.env`:

```env
TWILIO_ACCOUNT_SID=ACxxxx...
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_NUMBER=+14155238886
```

## Test the System

### Step 1: Submit Business Info

1. Go to http://localhost:3000
2. Scroll to "Submit Your Business Now"
3. Fill in your business information
4. Click "Next: Verify Contact"

### Step 2: Verify with OTP

1. Choose verification method (Email/SMS/WhatsApp)
2. Click "Send Verification Code"
3. Check your terminal for the OTP code (demo mode)
4. Enter the code and click "Verify Code"

### Step 3: Select Directories

1. Choose directories to submit to
2. Use filters: "Select All", "Top 100 Only"
3. Click "Start Submission"

### Step 4: Watch Progress

1. See real-time progress bar
2. View submission results
3. Download report when complete

## Troubleshooting

### Port Already in Use

```bash
# Change port in .env
PORT=3001
```

### Installation Errors

```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules
npm install
```

### Puppeteer Issues on Linux

```bash
# Install Chrome dependencies
sudo apt-get install -y \
  chromium-browser \
  libx11-xcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxi6 \
  libxtst6 \
  libnss3 \
  libcups2 \
  libxss1 \
  libxrandr2 \
  libasound2 \
  libatk1.0-0 \
  libgtk-3-0
```

## API Testing

Use curl or Postman to test the API:

```bash
# Health check
curl http://localhost:3000/health

# Get all directories
curl http://localhost:3000/api/directories

# Get categories
curl http://localhost:3000/api/directories/categories

# Send OTP
curl -X POST http://localhost:3000/api/otp/send \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","method":"email"}'

# Verify OTP
curl -X POST http://localhost:3000/api/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"identifier":"test@example.com","otp":"123456"}'
```

## Included Directories

The system includes 30+ major directories:

**High Priority (DA 90+):**
- Google Business Profile (DA 100)
- Apple Maps Connect (DA 100)
- Facebook Business (DA 96)
- Bing Places (DA 95)
- Yelp (DA 94)
- And more...

**Medium Priority (DA 70-89):**
- Yahoo Local, Foursquare, TomTom, etc.

**Standard (DA 60-69):**
- Hotfrog, Brownbook, Cylex, etc.

## Adding More Directories

Edit `data/directories.json`:

```json
{
  "id": "my-directory",
  "name": "My Directory",
  "domain": "mydirectory.com",
  "submissionUrl": "https://mydirectory.com/submit",
  "domainAuthority": 75,
  "categories": ["all"],
  "countries": ["global"],
  "submissionType": "automated",
  "priority": 2
}
```

## Production Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Heroku

```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set SMTP_HOST=smtp.gmail.com
heroku config:set SMTP_USER=youremail@gmail.com
# ... etc

# Deploy
git push heroku main
```

## Next Steps

1. ✅ Test in demo mode
2. Configure real OTP services
3. Add more directories to the database
4. Customize the landing page design
5. Set up monitoring and logging
6. Deploy to production

## Need Help?

- Check the full README.md for detailed documentation
- Review console logs for debugging
- Check the /routes and /services folders for code
- Test API endpoints individually

Happy automating! 🚀
