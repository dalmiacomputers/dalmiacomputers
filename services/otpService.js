const nodemailer = require('nodemailer');
require('dotenv').config();

// Email transporter (configure with your SMTP settings)
let emailTransporter = null;

if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    emailTransporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
}

// Send OTP via Email
async function sendEmailOTP(email, otp) {
    try {
        if (!emailTransporter) {
            console.log('Email OTP (Demo Mode):', otp, 'for', email);
            return {
                success: true,
                message: `Demo mode: OTP is ${otp}`,
                demo: true
            };
        }

        const mailOptions = {
            from: process.env.SMTP_FROM || 'noreply@directorysubmission.com',
            to: email,
            subject: 'Your Verification Code - Directory Submission',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">Directory Submission Verification</h2>
                    <p>Your verification code is:</p>
                    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
                        ${otp}
                    </div>
                    <p>This code will expire in 5 minutes.</p>
                    <p>If you didn't request this code, please ignore this email.</p>
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
                    <p style="color: #6b7280; font-size: 12px;">
                        This is an automated message from Directory Submission Pro.
                    </p>
                </div>
            `
        };

        const info = await emailTransporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);

        return {
            success: true,
            messageId: info.messageId
        };
    } catch (error) {
        console.error('Email send error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Send OTP via SMS (Twilio)
async function sendSMSOTP(phone, otp) {
    try {
        // Check if Twilio is configured
        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
            console.log('SMS OTP (Demo Mode):', otp, 'for', phone);
            return {
                success: true,
                message: `Demo mode: OTP is ${otp}`,
                demo: true
            };
        }

        const twilio = require('twilio');
        const client = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );

        const message = await client.messages.create({
            body: `Your Directory Submission verification code is: ${otp}. Valid for 5 minutes.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        });

        console.log('SMS sent:', message.sid);

        return {
            success: true,
            messageSid: message.sid
        };
    } catch (error) {
        console.error('SMS send error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Send OTP via WhatsApp (Twilio)
async function sendWhatsAppOTP(phone, otp) {
    try {
        // Check if Twilio is configured
        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
            console.log('WhatsApp OTP (Demo Mode):', otp, 'for', phone);
            return {
                success: true,
                message: `Demo mode: OTP is ${otp}`,
                demo: true
            };
        }

        const twilio = require('twilio');
        const client = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );

        const message = await client.messages.create({
            body: `Your Directory Submission verification code is: ${otp}. Valid for 5 minutes.`,
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
            to: `whatsapp:${phone}`
        });

        console.log('WhatsApp message sent:', message.sid);

        return {
            success: true,
            messageSid: message.sid
        };
    } catch (error) {
        console.error('WhatsApp send error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

module.exports = {
    sendEmailOTP,
    sendSMSOTP,
    sendWhatsAppOTP
};
