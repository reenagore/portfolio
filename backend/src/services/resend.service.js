const { Resend } = require("resend");
const env = require("../config/env");

const resend = new Resend(env.resendApiKey);

const sendAdminContactEmail = async ({
  fullName,
  email,
  phone,
  company,
  subject,
  message,
}) => {
  return resend.emails.send({
    from: `Reena Gore <${env.resendFromEmail}>`,
    to: env.adminEmail,
    subject: `New Contact Inquiry`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "-"}</p>
      <p><strong>Company:</strong> ${company || "-"}</p>
      <p><strong>Subject:</strong> ${subject || "-"}</p>
      <hr/>
      <p>${message}</p>
    `,
  });
};

const sendUserContactConfirmationEmail = async ({
  fullName,
  email,
}) => {
  return resend.emails.send({
    from: `Reena Gore <${env.resendFromEmail}>`,
    to: email,
    subject: "We’ve received your message",
    html: `
      <p>Hello ${fullName},</p>
      <p>Thank you for reaching out. Your message has been received.</p>
      <p>Our team will respond shortly.</p>
      <p>— Reena Gore Team</p>
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
    from: `Reena Gore <${env.resendFromEmail}>`,
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
    from: `Reena Gore <${env.resendFromEmail}>`,
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


const sendAdminProgramRegistrationEmail = async ({
  programTitle,
  fullName,
  email,
  phone,
  company,
  role,
  message,
}) => {
  return resend.emails.send({
    from: `Reena Gore <${env.resendFromEmail}>`,
    to: env.adminEmail,
    subject: `New Program Registration: ${programTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Program Registration</h2>
        <p><strong>Program:</strong> ${programTitle}</p>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Role:</strong> ${role || "Not provided"}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message || "No message provided"}</p>
      </div>
    `,
  });
};

const sendUserProgramRegistrationConfirmationEmail = async ({
  fullName,
  email,
  programTitle,
}) => {
  return resend.emails.send({
    from: `Reena Gore <${env.resendFromEmail}>`,
    to: email,
    subject: `Registration Received: ${programTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Hello ${fullName},</p>
        <p>Thank you for registering for <strong>${programTitle}</strong>.</p>
        <p>Your registration has been received successfully. The team will review it and follow up with the next steps.</p>
        <p>Best regards,<br />Reena Gore Team</p>
      </div>
    `,
  });
};


// Pre-order details

const sendAdminBookPreorderEmail = async ({
  bookTitle,
  fullName,
  email,
  phone,
  company,
  quantity,
  amount,
  paymentReference,
}) => {
  return resend.emails.send({
    from: `Reena Gore <${env.resendFromEmail}>`,
    to: env.adminEmail,
    subject: `New Book Pre-order: ${bookTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Book Pre-order</h2>
        <p><strong>Book:</strong> ${bookTitle}</p>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Payment Reference:</strong> ${paymentReference || "Pending"}</p>
      </div>
    `,
  });
};

const sendUserBookPreorderConfirmationEmail = async ({
  fullName,
  email,
  bookTitle,
  quantity,
}) => {
  return resend.emails.send({
    from: `Reena Gore <${env.resendFromEmail}>`,
    to: email,
    subject: `Pre-order Received: ${bookTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Hello ${fullName},</p>
        <p>Thank you for pre-ordering <strong>${bookTitle}</strong>.</p>
        <p>Your request for <strong>${quantity}</strong> copie(s) has been received successfully.</p>
        <p>You will be contacted with updates regarding your pre-order.</p>
        <p>Best regards,<br />Reena Gore Team</p>
      </div>
    `,
  });
};

const sendAdminProgrammeOrderEmail = async ({
  programmeTitle,
  fullName,
  email,
  phone,
  company,
  role,
  amount,
  paymentReference,
}) => {
  return resend.emails.send({
    from: `Reena Gore <${env.resendFromEmail}>`,
    to: env.adminEmail,
    subject: `New Paid Programme Registration: ${programmeTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Paid Programme Registration</h2>
        <p><strong>Programme:</strong> ${programmeTitle}</p>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Role:</strong> ${role || "Not provided"}</p>
        <p><strong>Amount:</strong> KES ${amount}</p>
        <p><strong>Payment Reference:</strong> ${paymentReference}</p>
      </div>
    `,
  });
};

const sendUserProgrammeOrderConfirmationEmail = async ({
  fullName,
  email,
  programmeTitle,
  amount,
}) => {
  return resend.emails.send({
    from: `Reena Gore <${env.resendFromEmail}>`,
    to: email,
    subject: `Registration Confirmed: ${programmeTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Hello ${fullName},</p>
        <p>Your payment for <strong>${programmeTitle}</strong> has been received successfully.</p>
        <p><strong>Amount Paid:</strong> KES ${amount}</p>
        <p>Our team will follow up with programme logistics and attendance details.</p>
        <p>Best regards,<br/>LYNKRZ Team</p>
      </div>
    `,
  });
};

module.exports = {
  sendAdminContactEmail,
  sendUserContactConfirmationEmail,
  sendAdminBookingEmail,
  sendUserBookingConfirmationEmail,
  sendAdminProgramRegistrationEmail,
  sendUserProgramRegistrationConfirmationEmail,
  sendUserBookPreorderConfirmationEmail,
  sendAdminBookPreorderEmail, 
  sendUserProgrammeOrderConfirmationEmail,
  sendAdminProgrammeOrderEmail
};