/**
 * Email templates for XplodeMail service
 */

/**
 * Returns a beautiful, responsive confirmation email for the client.
 * Matches the style of the "Thank You" success message.
 * 
 * @param {string} name - Name of the client
 * @returns {string} HTML email string
 */
function getClientConfirmationEmail(name) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - Xplode</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #020403;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #ffffff;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-spacing: 0;
      width: 100%;
    }
    td {
      padding: 0;
    }
    img {
      border: 0;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #020403;
      padding-bottom: 40px;
      padding-top: 40px;
    }
    .main-table {
      background-color: #080c0a;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border-spacing: 0;
      font-family: sans-serif;
      color: #ffffff;
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    }
    .content-padding {
      padding: 40px 30px;
    }
    .success-icon-container {
      margin-bottom: 24px;
      text-align: center;
    }
    .success-icon {
      display: inline-block;
      width: 72px;
      height: 72px;
      line-height: 72px;
      border-radius: 24px;
      background-color: rgba(111, 230, 198, 0.15);
      color: #9cf8dd;
      font-size: 32px;
      text-align: center;
      font-weight: bold;
    }
    .title {
      font-size: 32px;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 12px;
      color: #ffffff;
      text-align: center;
    }
    .subtitle {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
      margin-top: 0;
      margin-bottom: 32px;
      text-align: center;
    }
    .inbox-card {
      background-color: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 32px;
      text-align: center;
    }
    .inbox-icon-container {
      margin-bottom: 16px;
    }
    .inbox-icon {
      display: inline-block;
      width: 48px;
      height: 48px;
      line-height: 48px;
      border-radius: 12px;
      background-color: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.9);
      font-size: 20px;
      text-align: center;
    }
    .inbox-title {
      font-size: 20px;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 8px;
      color: #ffffff;
    }
    .inbox-desc {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      margin: 0;
      line-height: 1.5;
    }
    .highlight {
      color: #9cf8dd;
      font-weight: 600;
    }
    .section-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: rgba(255, 255, 255, 0.4);
      margin-top: 0;
      margin-bottom: 20px;
      text-align: center;
    }
    .step-item {
      margin-bottom: 20px;
      width: 100%;
    }
    .step-number-col {
      width: 44px;
      vertical-align: top;
    }
    .step-number {
      display: inline-block;
      width: 28px;
      height: 28px;
      line-height: 28px;
      border-radius: 50%;
      background-color: rgba(111, 230, 198, 0.15);
      color: #9cf8dd;
      font-size: 13px;
      font-weight: 700;
      text-align: center;
    }
    .step-text-col {
      vertical-align: middle;
      padding-top: 4px;
    }
    .step-text {
      font-size: 15px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
      line-height: 1.4;
    }
    .btn-container {
      text-align: center;
      margin-top: 40px;
    }
    .btn {
      display: inline-block;
      background-color: #ffffff;
      color: #020403 !important;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.3);
      margin-top: 40px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding-top: 24px;
    }
  </style>
</head>
<body>
  <center class="wrapper">
    <table class="main-table" role="presentation">
      <tr>
        <td class="content-padding">
          
          <!-- Success Check Icon -->
          <div class="success-icon-container">
            <span class="success-icon">✓</span>
          </div>

          <!-- Thank You Message -->
          <h1 class="title">Thank You!</h1>
          <p class="subtitle">Hello ${name}, your information has been received.</p>

          <!-- Check Your Inbox Card -->
          <div class="inbox-card">
            <div class="inbox-icon-container">
              <span class="inbox-icon">✉</span>
            </div>
            <h2 class="inbox-title">Check Your Inbox</h2>
            <p class="inbox-desc">
              Expect your personalized AI implementation guide in your inbox within <span class="highlight">3 to 5 minutes</span>.
            </p>
          </div>

          <!-- What's Next Section -->
          <h3 class="section-title">What's Next?</h3>
          
          <table role="presentation" class="step-item">
            <tr>
              <td class="step-number-col">
                <span class="step-number">1</span>
              </td>
              <td class="step-text-col">
                <p class="step-text">Review your customized AI implementation roadmap</p>
              </td>
            </tr>
          </table>

          <table role="presentation" class="step-item">
            <tr>
              <td class="step-number-col">
                <span class="step-number">2</span>
              </td>
              <td class="step-text-col">
                <p class="step-text">Identify quick wins and long-term opportunities</p>
              </td>
            </tr>
          </table>

          <table role="presentation" class="step-item">
            <tr>
              <td class="step-number-col">
                <span class="step-number">3</span>
              </td>
              <td class="step-text-col">
                <p class="step-text">Schedule a follow-up call with our AI automation experts</p>
              </td>
            </tr>
          </table>

          <!-- Button -->
          <div class="btn-container">
            <a href="https://xplode.in" target="_blank" class="btn">Visit Xplode Site</a>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p>© 2026 Xplode. All rights reserved.</p>
            <p>You received this email because you submitted a contact request on our website.</p>
          </div>

        </td>
      </tr>
    </table>
  </center>
</body>
</html>
  `;
}

/**
 * Returns a clean, professional dashboard notification email for the admin.
 * 
 * @param {string} name - Client name
 * @param {string} email - Client email
 * @param {string} phone - Client phone number
 * @param {string} message - Form message
 * @returns {string} HTML email string
 */
function getAdminNotificationEmail(name, email, phone, message) {
  const formattedMessage = message.replace(/\n/g, '<br>');
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Submission</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #333333;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-spacing: 0;
      width: 100%;
    }
    td {
      padding: 0;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f4f6f8;
      padding-bottom: 40px;
      padding-top: 40px;
    }
    .main-table {
      background-color: #ffffff;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border-spacing: 0;
      border-radius: 16px;
      border: 1px solid #e1e4e8;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .header {
      background-color: #020403;
      padding: 30px;
      text-align: center;
    }
    .header-title {
      color: #ffffff;
      font-size: 22px;
      font-weight: 700;
      margin: 0;
      letter-spacing: 0.5px;
    }
    .header-subtitle {
      color: #6fe6c6;
      font-size: 14px;
      margin-top: 5px;
      margin-bottom: 0;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .content-padding {
      padding: 40px 30px;
    }
    .intro-text {
      font-size: 16px;
      line-height: 1.5;
      color: #555555;
      margin-top: 0;
      margin-bottom: 30px;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    .info-table th, .info-table td {
      border: 1px solid #e1e4e8;
      padding: 12px 16px;
      text-align: left;
      font-size: 14px;
    }
    .info-table th {
      background-color: #f8f9fa;
      color: #555555;
      width: 120px;
      font-weight: 600;
    }
    .info-table td {
      color: #1a1a1a;
    }
    .message-box {
      background-color: #f8f9fa;
      border-left: 4px solid #6fe6c6;
      padding: 16px;
      border-radius: 0 8px 8px 0;
      font-size: 14px;
      line-height: 1.6;
      color: #2b2b2b;
      margin-bottom: 35px;
      word-break: break-word;
    }
    .btn-group {
      text-align: center;
      margin-bottom: 10px;
    }
    .btn {
      display: inline-block;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 8px;
      margin: 5px;
    }
    .btn-primary {
      background-color: #020403;
      color: #ffffff !important;
      border: 1px solid #020403;
    }
    .btn-secondary {
      background-color: #ffffff;
      color: #333333 !important;
      border: 1px solid #cccccc;
    }
    .footer {
      text-align: center;
      font-size: 11px;
      color: #888888;
      margin-top: 30px;
      border-top: 1px solid #e1e4e8;
      padding-top: 20px;
    }
  </style>
</head>
<body>
  <center class="wrapper">
    <table class="main-table" role="presentation">
      <tr>
        <td class="header">
          <h1 class="header-title">Xplode</h1>
          <p class="header-subtitle">New Form Submission</p>
        </td>
      </tr>
      <tr>
        <td class="content-padding">
          <p class="intro-text">
            Hello Team, you have received a new contact message through the Xplode website contact form.
          </p>

          <table role="presentation" class="info-table">
            <tr>
              <th>Name</th>
              <td>${name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td><a href="mailto:${email}" style="color: #4fb39b; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <th>Phone</th>
              <td><a href="tel:${phone}" style="color: #4fb39b; text-decoration: none;">${phone}</a></td>
            </tr>
          </table>

          <h3 style="font-size: 15px; margin-top: 0; margin-bottom: 10px; color: #1a1a1a;">Message Details:</h3>
          <div class="message-box">
            ${formattedMessage}
          </div>

          <div class="btn-group">
            <a href="mailto:${email}" class="btn btn-primary">Reply to Email</a>
            <a href="tel:${phone}" class="btn btn-secondary">Call Client</a>
          </div>

          <div class="footer">
            <p>This notification was automatically sent by the XplodeMail API service.</p>
          </div>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
  `;
}

module.exports = {
  getClientConfirmationEmail,
  getAdminNotificationEmail
};
