const BookPreorder = require("../models/Preorder");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { sanitizeValue } = require("../utils/sanitize");
const {
  sendAdminBookPreorderEmail,
  sendUserBookPreorderConfirmationEmail,
} = require("../services/resend.service");

const createBookPreorder = asyncHandler(async (req, res) => {
  const body = sanitizeValue(req.body);

  const preorder = await BookPreorder.create({
    bookTitle: body.bookTitle || "Decoding Business for Growth",
    fullName: body.fullName,
    email: body.email,
    phone: body.phone || "",
    company: body.company || "",
    quantity: Number(body.quantity || 1),
    amount: Number(body.amount),
    paymentReference: body.paymentReference || "",
    paymentStatus: body.paymentStatus || "pending",
  });

  try {
    await Promise.all([
      sendAdminBookPreorderEmail({
        bookTitle: preorder.bookTitle,
        fullName: preorder.fullName,
        email: preorder.email,
        phone: preorder.phone,
        company: preorder.company,
        quantity: preorder.quantity,
        amount: preorder.amount,
        paymentReference: preorder.paymentReference,
      }),
      sendUserBookPreorderConfirmationEmail({
        fullName: preorder.fullName,
        email: preorder.email,
        bookTitle: preorder.bookTitle,
        quantity: preorder.quantity,
      }),
    ]);
  } catch (emailError) {
    console.error("Book preorder email failed:", emailError.message);
  }

  res.status(201).json({
    success: true,
    message: "Book pre-order submitted successfully",
    data: preorder,
  });
});

const getAdminBookPreorders = asyncHandler(async (req, res) => {
  const items = await BookPreorder.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: items,
  });
});

const updateBookPreorderStatus = asyncHandler(async (req, res) => {
  const item = await BookPreorder.findById(req.params.id);

  if (!item) {
    throw new ApiError(404, "Book preorder not found");
  }

  const body = sanitizeValue(req.body);

  if (body.status) item.status = body.status;
  if (body.paymentStatus) item.paymentStatus = body.paymentStatus;

  await item.save();

  res.status(200).json({
    success: true,
    message: "Book preorder updated successfully",
    data: item,
  });
});

module.exports = {
  createBookPreorder,
  getAdminBookPreorders,
  updateBookPreorderStatus,
};