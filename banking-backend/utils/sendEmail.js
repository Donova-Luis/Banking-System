const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,         // e.g., yourbankalerts@gmail.com
    pass: process.env.ADMIN_EMAIL_PASSWORD // App password from Gmail
  }
});

const sendEmail = async (subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_ALERT_RECEIVER, // Where admin alerts go
      subject,
      text
    });
    console.log("📧 Email alert sent.");
  } catch (error) {
    console.error("❌ Email alert failed:", error);
  }
};

module.exports = sendEmail;
