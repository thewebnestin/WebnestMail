require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { contactRateLimiter, validateContactRequest } = require('./middleware');
const { getClientConfirmationEmail, getAdminNotificationEmail } = require('./templates');

// Validate environment variables on startup
const requiredEnvVars = ['GMAIL_USER', 'GMAIL_APP_PASSWORD', 'ADMIN_EMAIL'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error(`[${new Date().toISOString()}] FATAL STARTUP ERROR: Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const app = express();

// Trust proxy if deployed behind Render/Vercel/Heroku proxy for correct IP rate limiting
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit body size to prevent abuse

// Root route for health check
app.get('/', (req, res) => {
  res.status(200).send('WebnestMail API is running and ready to send emails!');
});

// SMTP transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Verify transporter connection at startup
transporter.verify((error, success) => {
  if (error) {
    console.error(`[${new Date().toISOString()}] SMTP Transporter verification failed:`, error.message);
  } else {
    console.log(`[${new Date().toISOString()}] SMTP Transporter is ready to send messages`);
  }
});

// POST /contact - Rate limited and validated
app.post('/contact', contactRateLimiter, validateContactRequest, async (req, res, next) => {
  const { name, email, phone, message } = req.body;

  try {
    // Send Admin Notification (Critical: determines success of the API request)
    await transporter.sendMail({
      from: `"Webnest Lead Alert" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Lead: Contact Message from ${name}`,
      html: getAdminNotificationEmail(name, email, phone, message)
    });
    
    console.log(`[${new Date().toISOString()}] Admin notification sent successfully for submission by ${name} (${email})`);

    // Send Client Confirmation (Non-Critical auto-reply: fails gracefully)
    transporter.sendMail({
      from: `"Webnest Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Thank you for reaching out to Webnest!',
      html: getClientConfirmationEmail(name)
    }).then(() => {
      console.log(`[${new Date().toISOString()}] Client confirmation email sent successfully to ${email}`);
    }).catch(clientMailError => {
      console.warn(`[${new Date().toISOString()}] Non-critical: Failed to send confirmation email to client ${email}:`, clientMailError.message);
    });

    return res.status(200).json({
      status: 1,
      message: 'Message sent successfully.'
    });

  } catch (err) {
    return next(err); // Forward to global error handler
  }
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Internal Server Error:`, err);
  res.status(500).json({
    status: 0,
    message: 'Failed to process contact request. Please try again later.'
  });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Email service running on port ${PORT}`);
});

// Graceful Shutdown Handler
const gracefulShutdown = (signal) => {
  console.log(`[${new Date().toISOString()}] Received ${signal}. Starting graceful shutdown...`);
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });

  // Force shutdown after 10s if connections persist
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
