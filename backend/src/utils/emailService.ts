// 📂 src/utils/emailService.ts
import nodemailer from "nodemailer";

// ✅ Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Send Application Confirmation Email
export const sendApplicationConfirmation = async (
  email: string,
  fullName: string,
  loanAmount: number,
  loanType: string
) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Sterling & Co Financials" <noreply@sterling.com>',
      to: email,
      subject: "Loan Application Received - Sterling & Co Financials",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .status-badge { display: inline-block; padding: 8px 16px; background: #fbbf24; color: #78350f; border-radius: 20px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏦 Application Received!</h1>
            </div>
            <div class="content">
              <p>Dear <strong>${fullName}</strong>,</p>
              
              <p>Thank you for choosing Sterling & Co Financials. We have successfully received your loan application and it is now under review.</p>
              
              <div class="info-box">
                <h3>📋 Application Details:</h3>
                <p><strong>Loan Type:</strong> ${loanType}</p>
                <p><strong>Loan Amount:</strong> $${loanAmount.toLocaleString()}</p>
                <p><strong>Status:</strong> <span class="status-badge">PENDING REVIEW</span></p>
              </div>
              
              <p>Our team will review your application and get back to you within 2-3 business days. You will receive another email once a decision has been made.</p>
              
              <p>If you have any questions, please don't hesitate to contact us.</p>
              
              <p>Best regards,<br><strong>Sterling & Co Financials Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Sterling & Co Financials. All rights reserved.</p>
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to ${email}`);
  } catch (error: any) {
    console.error("❌ Error sending confirmation email:", error);
    throw error;
  }
};

// ✅ Send Approval Email
export const sendApprovalEmail = async (
  email: string,
  fullName: string,
  loanAmount: number,
  loanType: string,
  loanDuration: string
) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Sterling & Co Financials" <noreply@sterling.com>',
      to: email,
      subject: "🎉 Loan Application Approved - Sterling & Co Financials",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #10b981; border-radius: 5px; }
            .success-badge { display: inline-block; padding: 8px 16px; background: #10b981; color: white; border-radius: 20px; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .cta-button { display: inline-block; padding: 12px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Congratulations!</h1>
              <p style="font-size: 18px; margin: 10px 0;">Your Loan Has Been Approved</p>
            </div>
            <div class="content">
              <p>Dear <strong>${fullName}</strong>,</p>
              
              <p>We are pleased to inform you that your loan application has been <strong>APPROVED</strong>! 🎊</p>
              
              <div class="info-box">
                <h3>✅ Approved Loan Details:</h3>
                <p><strong>Loan Type:</strong> ${loanType}</p>
                <p><strong>Loan Amount:</strong> $${loanAmount.toLocaleString()}</p>
                <p><strong>Duration:</strong> ${loanDuration}</p>
                <p><strong>Status:</strong> <span class="success-badge">APPROVED</span></p>
              </div>
              
              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>Our team will contact you within 24 hours to discuss the terms and conditions</li>
                <li>Please have your identification documents ready</li>
                <li>We will schedule a final verification meeting</li>
              </ul>
              
              <p>Thank you for choosing Sterling & Co Financials. We look forward to serving you!</p>
              
              <p>Best regards,<br><strong>Sterling & Co Financials Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Sterling & Co Financials. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Approval email sent to ${email}`);
  } catch (error: any) {
    console.error("❌ Error sending approval email:", error);
    throw error;
  }
};

// ✅ Send Rejection Email
export const sendRejectionEmail = async (
  email: string,
  fullName: string,
  loanAmount: number,
  loanType: string
) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Sterling & Co Financials" <noreply@sterling.com>',
      to: email,
      subject: "Loan Application Update - Sterling & Co Financials",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #ef4444; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Application Update</h1>
            </div>
            <div class="content">
              <p>Dear <strong>${fullName}</strong>,</p>
              
              <p>Thank you for your interest in Sterling & Co Financials. After careful review of your application, we regret to inform you that we are unable to approve your loan request at this time.</p>
              
              <div class="info-box">
                <h3>📋 Application Details:</h3>
                <p><strong>Loan Type:</strong> ${loanType}</p>
                <p><strong>Loan Amount:</strong> $${loanAmount.toLocaleString()}</p>
              </div>
              
              <p><strong>What's Next?</strong></p>
              <ul>
                <li>You may reapply after 90 days</li>
                <li>Consider improving your credit score or financial documentation</li>
                <li>Contact us for guidance on strengthening future applications</li>
              </ul>
              
              <p>We appreciate your understanding and encourage you to reach out if you have any questions.</p>
              
              <p>Best regards,<br><strong>Sterling & Co Financials Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Sterling & Co Financials. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Rejection email sent to ${email}`);
  } catch (error: any) {
    console.error("❌ Error sending rejection email:", error);
    throw error;
  }
};