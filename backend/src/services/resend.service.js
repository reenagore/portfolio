const { Resend } = require("resend");
const env = require("../config/env");

const resend = new Resend(env.resendApiKey);

const sendAdminContactEmail = async ({
  fullName,
  email,
  company,
  subject,
  message,
}) => {
  return resend.emails.send({
    from: env.resendFromEmail,
    to: env.adminEmail,
    subject: subject
      ? `New Contact Form: ${subject}`
      : "New Contact Form Submission",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject || "Not provided"}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    `,
  });
};

const sendUserConfirmationEmail = async ({ fullName, email }) => {
  return resend.emails.send({
    from: env.resendFromEmail,
    to: email,
    subject: "We received your message",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Hello ${fullName},</p>
        <p>Thank you for reaching out. Your message has been received successfully.</p>
        <p>We will review it and get back to you as soon as possible.</p>
        <p>Best regards,<br />Reena Gore Team</p>
      </div>
    `,
  });
};

const sendAdminBookingEmail = async ({
  fullName,
  email,
  company,
  phone,
  service,
  businessStage,
  annualRevenueRange,
  preferredContactMethod,
  preferredSessionType,
  preferredDate,
  preferredTime,
  challengeSummary,
  goals,
  source,
}) => {
  return resend.emails.send({
    from: env.resendFromEmail,
    to: env.adminEmail,
    subject: `New Consultation Booking: ${service}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Consultation Booking</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Business Stage:</strong> ${businessStage || "Not provided"}</p>
        <p><strong>Annual Revenue Range:</strong> ${annualRevenueRange || "Not provided"}</p>
        <p><strong>Preferred Contact Method:</strong> ${preferredContactMethod || "Not provided"}</p>
        <p><strong>Preferred Session Type:</strong> ${preferredSessionType || "Not provided"}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate || "Not provided"}</p>
        <p><strong>Preferred Time:</strong> ${preferredTime || "Not provided"}</p>
        <p><strong>Source:</strong> ${source || "Website"}</p>
        <hr />
        <p><strong>Challenge Summary:</strong></p>
        <p>${challengeSummary}</p>
        <hr />
        <p><strong>Goals:</strong></p>
        <p>${goals || "Not provided"}</p>
      </div>
    `,
  });
};

const sendUserBookingConfirmationEmail = async ({
  fullName,
  email,
  service,
}) => {
  return resend.emails.send({
    from: env.resendFromEmail,
    to: email,
    subject: "Your consultation request has been received",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Hello ${fullName},</p>
        <p>Thank you for submitting your consultation request for <strong>${service}</strong>.</p>
        <p>Your request has been received successfully, and the team will review it shortly.</p>
        <p>If your request is a fit, you will be contacted with the next steps.</p>
        <p>Best regards,<br />Reena Gore Team</p>
      </div>
    `,
  });
};

module.exports = {
  sendAdminContactEmail,
  sendUserConfirmationEmail,
  sendAdminBookingEmail,
  sendUserBookingConfirmationEmail,
};