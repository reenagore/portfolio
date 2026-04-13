const Contact = require("../models/Contact");
const asyncHandler = require("../utils/asyncHandler");
const {
  sendAdminContactEmail,
  sendUserContactConfirmationEmail,
} = require("../services/resend.service");

const submitContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);

  try {
    await Promise.all([
      sendAdminContactEmail(contact),
      sendUserContactConfirmationEmail(contact),
    ]);
  } catch (err) {
    console.error("Email error:", err.message);
  }

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
  });
});

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    data: contacts,
  });
});

const updateContactStatus = asyncHandler(async (req, res) => {
  const item = await Contact.findById(req.params.id);

  if (!item) throw new Error("Not found");

  item.status = req.body.status || item.status;
  await item.save();

  res.json({
    success: true,
    data: item,
  });
});

module.exports = {
  submitContact,
  getContacts,
  updateContactStatus,
};