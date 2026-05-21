require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// SMTP transporter using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

// POST /contact
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({
            status: 0,
            message: 'name, email, and message are required.'
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: 0,
            message: 'Invalid email address.'
        });
    }

    try {
        await transporter.sendMail({
            from: `"Contact Form" <${process.env.GMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            replyTo: email,
            subject: `New Contact Message from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <table style="border-collapse:collapse; width:100%; font-family:Arial,sans-serif;">
                    <tr>
                        <td style="padding:8px; border:1px solid #ddd; background:#f9f9f9; width:120px;"><strong>Name</strong></td>
                        <td style="padding:8px; border:1px solid #ddd;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #ddd; background:#f9f9f9;"><strong>Email</strong></td>
                        <td style="padding:8px; border:1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding:8px; border:1px solid #ddd; background:#f9f9f9;"><strong>Message</strong></td>
                        <td style="padding:8px; border:1px solid #ddd;">${message.replace(/\n/g, '<br>')}</td>
                    </tr>
                </table>
            `
        });

        return res.status(200).json({
            status: 1,
            message: 'Message sent successfully.'
        });

    } catch (err) {
        console.error('Email error:', err.message);
        return res.status(500).json({
            status: 0,
            message: 'Failed to send email. Please try again later.'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Email service running on port ${PORT}`);
});
