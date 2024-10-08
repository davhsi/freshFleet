const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail's built-in service
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Optional: Set to false if you encounter any TLS issues
  },
  logger: true, // Enable logging
  debug: true, // Enable debug output
});

const sendResetPasswordEmail = async (to, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: 'Password Reset',
    text: `You requested a password reset. Click the following link to reset your password: ${resetUrl}`,
    html: `<p>You requested a password reset. Click the following link to reset your password: <a href="${resetUrl}">Reset Password</a></p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', to); // Log the recipient's email
    console.log('Email sent response:', info.response); // Log email sent response
  } catch (error) {
    console.error('Error sending email:', error); // Log the error for debugging
    throw new Error('Could not send password reset email');
  }
};

module.exports = sendResetPasswordEmail;
