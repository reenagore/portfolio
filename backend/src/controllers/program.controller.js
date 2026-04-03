const crypto = require("crypto");
const ProgrammeOrder = require("../models/ProgramOrder");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { sanitizeValue } = require("../utils/sanitize");
const paystack = require("../services/paystack.service");
const env = require("../config/env");
const {
  sendAdminProgrammeOrderEmail,
  sendUserProgrammeOrderConfirmationEmail,
} = require("../services/resend.service");

const PROGRAMME_TITLE = "Finance for Non-Finance Professionals";
const PROGRAMME_SLUG = "finance-for-non-finance-professionals";
const PROGRAMME_AMOUNT = 45000; 

const initiateProgrammeOrder = asyncHandler(async (req, res) => {
  const body = sanitizeValue(req.body);

  const fullName = body.fullName?.trim();
  const email = body.email?.trim()?.toLowerCase();
  const phone = body.phone?.trim() || "";
  const company = body.company?.trim() || "";
  const role = body.role?.trim() || "";

  if (!fullName || !email) {
    throw new ApiError(400, "Full name and email are required");
  }

  const reference = `prog_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;

  const order = await ProgrammeOrder.create({
    programmeTitle: PROGRAMME_TITLE,
    programmeSlug: PROGRAMME_SLUG,
    fullName,
    email,
    phone,
    company,
    role,
    amount: PROGRAMME_AMOUNT,
    currency: "KES",
    paymentReference: reference,
    paymentStatus: "pending",
  });

  const callbackUrl = `${env.frontendUrl}/programmes/${PROGRAMME_SLUG}/verify`;

  const response = await paystack.post("/transaction/initialize", {
    email,
    amount: PROGRAMME_AMOUNT * 100,
    reference,
    currency: "KES",
    callback_url: callbackUrl,
    metadata: {
      fullName,
      programmeTitle: PROGRAMME_TITLE,
      programmeSlug: PROGRAMME_SLUG,
      orderId: order._id.toString(),
    },
  });

  const paymentData = response.data?.data;

  if (!paymentData?.authorization_url) {
    throw new ApiError(500, "Failed to initialize payment");
  }

  res.status(200).json({
    success: true,
    message: "Programme payment initialized successfully",
    data: {
      authorizationUrl: paymentData.authorization_url,
      reference,
      amount: PROGRAMME_AMOUNT,
      currency: "KES",
    },
  });
});

const verifyProgrammeOrder = asyncHandler(async (req, res) => {
  const { reference } = req.query;

  if (!reference) {
    throw new ApiError(400, "Payment reference is required");
  }

  const order = await ProgrammeOrder.findOne({ paymentReference: reference });

  if (!order) {
    throw new ApiError(404, "Programme order not found");
  }

  const response = await paystack.get(`/transaction/verify/${reference}`);
  const paymentData = response.data?.data;

  if (!paymentData) {
    throw new ApiError(400, "Unable to verify payment");
  }

  if (paymentData.status === "success") {
    const wasAlreadyPaid = order.paymentStatus === "paid";

    order.paymentStatus = "paid";
    order.status = "confirmed";
    await order.save();

    if (!wasAlreadyPaid) {
      try {
        await Promise.all([
          sendAdminProgrammeOrderEmail({
            programmeTitle: order.programmeTitle,
            fullName: order.fullName,
            email: order.email,
            phone: order.phone,
            company: order.company,
            role: order.role,
            amount: order.amount,
            paymentReference: order.paymentReference,
          }),
          sendUserProgrammeOrderConfirmationEmail({
            fullName: order.fullName,
            email: order.email,
            programmeTitle: order.programmeTitle,
            amount: order.amount,
          }),
        ]);
      } catch (emailError) {
        console.error("Programme order email failed:", emailError.message);
      }
    }
  } else {
    order.paymentStatus = "failed";
    await order.save();
  }

  res.status(200).json({
    success: true,
    message: "Programme payment verification completed",
    data: order,
  });
});

const getAdminProgrammeOrders = asyncHandler(async (req, res) => {
  const items = await ProgrammeOrder.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: items,
  });
});

module.exports = {
  initiateProgrammeOrder,
  verifyProgrammeOrder,
  getAdminProgrammeOrders,
};