const rateLimit = require('express-rate-limit');

/**
 * Rate limiting middleware to prevent contact form spamming.
 * Limits each IP to 5 requests per 15 minutes.
 */
const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Increased limit for testing (50 requests per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: 0,
    message: 'Too many contact requests from this IP. Please try again in 15 minutes.'
  }
});

/**
 * Validation middleware for the contact form request body.
 */
const validateContactRequest = (req, res, next) => {
  const { name, email, phone, message } = req.body;

  // Trim text inputs if they are strings to prevent whitespace-only submissions
  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanEmail = typeof email === 'string' ? email.trim() : '';
  const cleanPhone = typeof phone === 'string' ? phone.trim() : '';
  const cleanMessage = typeof message === 'string' ? message.trim() : '';

  // Check required fields
  if (!cleanName || !cleanEmail || !cleanPhone || !cleanMessage) {
    return res.status(400).json({
      status: 0,
      message: 'All fields (name, email, phone, message) are required and cannot be empty.'
    });
  }

  // Regex validation for email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({
      status: 0,
      message: 'Please provide a valid email address.'
    });
  }

  // Simple validation for phone number (length check and digits/symbols)
  const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return res.status(400).json({
      status: 0,
      message: 'Please provide a valid phone number (7-20 characters).'
    });
  }

  // Re-assign cleaned inputs back to body for subsequent handlers to use
  req.body.name = cleanName;
  req.body.email = cleanEmail;
  req.body.phone = cleanPhone;
  req.body.message = cleanMessage;

  next();
};

module.exports = {
  contactRateLimiter,
  validateContactRequest
};
