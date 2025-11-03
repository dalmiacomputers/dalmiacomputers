# Directory Submission Automation System

Automate your business NAP (Name, Address, Phone) submission to 1000+ free online directories worldwide. Boost your local SEO and online presence effortlessly.

## Features

- **Automated Submissions**: Submit your business information to hundreds of directories with one click
- **OTP Verification**: Automatic handling of SMS, WhatsApp, and Email verification codes
- **Real-time Progress Tracking**: Monitor submission status in real-time dashboard
- **Global Coverage**: Submit to directories in 150+ countries
- **Multi-category Support**: Support for all business categories
- **Browser Automation**: Uses Puppeteer for automated form filling
- **Beautiful Landing Page**: Professional landing page with form wizard
- **Priority Directories**: Focus on high-authority directories first

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Automation**: Puppeteer
- **OTP Services**: Twilio (SMS/WhatsApp), Nodemailer (Email)
- **Queue Management**: Bull + Redis (optional)

## Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- (Optional) Redis for production queue management
- (Optional) Twilio account for SMS/WhatsApp OTP
- (Optional) SMTP server for email OTP

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd directory-submission-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` file and add your configuration:
   - SMTP credentials for email OTP
   - Twilio credentials for SMS/WhatsApp OTP
   - Other optional configurations

4. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

5. **Access the application**
   - Landing page: http://localhost:3000
   - API health check: http://localhost:3000/health

## Configuration

### Email OTP (via SMTP)

Add your SMTP credentials to `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com
```

For Gmail:
1. Enable 2FA in your Google account
2. Generate an App Password
3. Use the App Password in SMTP_PASS

### SMS and WhatsApp OTP (via Twilio)

1. Sign up at [Twilio](https://www.twilio.com)
2. Get your Account SID and Auth Token
3. Purchase a phone number for SMS
4. Enable WhatsApp sandbox or get approved number

Add to `.env`:

```env
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_NUMBER=+14155238886
```

## Usage

### Step 1: Fill Business Information

- Enter your business name, address, phone, email, website
- Select business category
- Add business description

### Step 2: Verify Contact Information

- Choose verification method (Email, SMS, or WhatsApp)
- Enter the 6-digit OTP code received
- Proceed after successful verification

### Step 3: Select Directories

- Browse available directories
- Select directories or use quick filters:
  - Select All
  - Deselect All
  - Top 100 Only
- View selected count

### Step 4: Monitor Progress

- Watch real-time submission progress
- View results for each directory
- Download report when complete

## API Endpoints

### Directories

- `GET /api/directories` - Get all directories
- `GET /api/directories/categories` - Get all categories

### OTP Verification

- `POST /api/otp/send` - Send OTP code
  ```json
  {
    "email": "user@example.com",
    "method": "email"
  }
  ```

- `POST /api/otp/verify` - Verify OTP code
  ```json
  {
    "identifier": "user@example.com",
    "otp": "123456"
  }
  ```

### Submissions

- `POST /api/submission/start` - Start submission process
  ```json
  {
    "businessName": "My Business",
    "phone": "+1234567890",
    "email": "business@example.com",
    "address": "123 Main St",
    "city": "New York",
    "country": "US",
    "selectedDirectories": ["google-business", "yelp"],
    "verified": true
  }
  ```

- `GET /api/submission/status/:jobId` - Get submission status
- `GET /api/submission/history/:email` - Get submission history

## Directory Database

The system includes 30+ major directories by default in `/data/directories.json`. You can add more directories by following this structure:

```json
{
  "id": "unique-id",
  "name": "Directory Name",
  "domain": "example.com",
  "submissionUrl": "https://example.com/submit",
  "domainAuthority": 85,
  "categories": ["all"],
  "countries": ["global"],
  "submissionType": "automated",
  "priority": 1
}
```

## Customization

### Adding New Directories

1. Edit `/data/directories.json`
2. Add directory information with selectors for Puppeteer
3. Restart the server

### Styling

- Edit `/public/css/styles.css` for visual customization
- Modify color scheme using CSS variables in `:root`

### Adding New Features

- Backend routes: `/routes/*.js`
- Services: `/services/*.js`
- Frontend: `/public/js/app.js`

## Demo Mode

The system runs in demo mode by default without external service configuration:

- OTP codes are logged to console
- Submissions are simulated with 90% success rate
- No actual API calls to Twilio or SMTP servers

To enable full functionality, configure the required services in `.env`

## Production Deployment

### Environment Variables

Make sure to set all required environment variables in your production environment.

### Puppeteer in Production

For cloud deployments (Heroku, AWS, etc.), add these Puppeteer arguments:

```javascript
puppeteer.launch({
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage'
  ]
})
```

### Redis for Queue Management

For production, use Redis with Bull for better queue management:

```bash
npm install bull redis
```

Update the submission service to use Bull queues.

## Security Considerations

- Always use HTTPS in production
- Implement rate limiting
- Validate and sanitize all inputs
- Use environment variables for sensitive data
- Implement proper error handling
- Add CAPTCHA for public forms
- Monitor for abuse

## Troubleshooting

### Puppeteer Issues

- Install Chrome/Chromium dependencies on Linux:
  ```bash
  sudo apt-get install -y chromium-browser
  ```

### OTP Not Received

- Check SMTP/Twilio credentials
- Verify phone number format (E.164)
- Check spam/junk folders for emails
- Review console logs for errors

### Submission Failures

- Some directories may require manual verification
- Check directory URL availability
- Verify form selectors are correct
- Monitor rate limiting

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for commercial or personal purposes.

## Support

For issues, questions, or feature requests, please open an issue on GitHub.

## Roadmap

- [ ] Add more international directories
- [ ] Implement advanced OTP handling with email/SMS parsing
- [ ] Add database for persistent storage
- [ ] Create admin dashboard
- [ ] Add bulk submission for multiple businesses
- [ ] Implement webhook notifications
- [ ] Add Chrome extension for manual directory detection
- [ ] Support for custom directory templates

## Disclaimer

This tool is designed for legitimate business listing purposes. Always comply with each directory's terms of service. Automated submissions should respect rate limits and robot.txt files.

---

Made with ❤️ for small businesses and SEO professionals
