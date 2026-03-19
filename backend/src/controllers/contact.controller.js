const ContactMessage = require("../models/ContactMessage");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { sanitizeValue } = require("../utils/sanitize");
const {
  sendAdminContactEmail,
  sendUserConfirmationEmail,
} = require("../services/resend.service");

const submitContactForm = asyncHandler(async (req, res) => {
  const sanitizedBody = sanitizeValue(req.body);

  const fullName = sanitizedBody.fullName;
  const email = sanitizedBody.email;
  const company = sanitizedBody.company || "";
  const subject = sanitizedBody.subject || "";
  const message = sanitizedBody.message;

  const contactMessage = await ContactMessage.create({
    fullName,
    email,
    company,
    subject,
    message,
  });

  if (!contactMessage) {
    throw new ApiError(500, "Failed to save contact message");
  }

  try {
    await Promise.all([
      sendAdminContactEmail({ fullName, email, company, subject, message }),
      sendUserConfirmationEmail({ fullName, email }),
    ]);
  } catch (emailError) {
    console.error("Email sending failed:", emailError.message);
  }

  res.status(201).json({
    success: true,
    message: "Your message has been sent successfully",
    data: {
      id: contactMessage._id,
      fullName: contactMessage.fullName,
      email: contactMessage.email,
      subject: contactMessage.subject,
      status: contactMessage.status,
      createdAt: contactMessage.createdAt,
    },
  });
});

module.exports = {
  submitContactForm,
};