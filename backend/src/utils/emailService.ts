// 📂 src/utils/emailService.ts
import dotenv from "dotenv";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Sterling & Co Financials <onboarding@resend.dev>";

// ✅ Send OTP Email
export const sendOtpEmail = async (email: string, name: string, otp: string) => {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Your Sterling & Co Verification Code",
    html: `
      <h2>Hello ${name},</h2>
      <p>Your OTP verification code is:</p>
      <h1 style="letter-spacing:8px;color:#1d4ed8">${otp}</h1>
      <p>This code expires in <strong>5 minutes</strong>.</p>
    `,
  });
};

// ✅ Send Application Confirmation Email
export const sendApplicationConfirmation = async (
  email: string,
  fullName: string,
  loanAmount: number,
  loanType: string
) => {
  try {
    await resend.emails.send({
      from: FROM,
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
              <p>Our team will review your application and get back to you within 2-3 business days.</p>
              <p>Best regards,<br><strong>Sterling & Co Financials Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Sterling & Co Financials. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
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
    await resend.emails.send({
      from: FROM,
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
              <p>Our team will contact you within 24 hours to discuss the terms and conditions.</p>
              <p>Best regards,<br><strong>Sterling & Co Financials Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Sterling & Co Financials. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
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
    await resend.emails.send({
      from: FROM,
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
              <p>After careful review, we regret to inform you that we are unable to approve your loan request at this time.</p>
              <div class="info-box">
                <h3>📋 Application Details:</h3>
                <p><strong>Loan Type:</strong> ${loanType}</p>
                <p><strong>Loan Amount:</strong> $${loanAmount.toLocaleString()}</p>
              </div>
              <p>You may reapply after 90 days. Contact us if you have any questions.</p>
              <p>Best regards,<br><strong>Sterling & Co Financials Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Sterling & Co Financials. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log(`✅ Rejection email sent to ${email}`);
  } catch (error: any) {
    console.error("❌ Error sending rejection email:", error);
    throw error;
  }
};