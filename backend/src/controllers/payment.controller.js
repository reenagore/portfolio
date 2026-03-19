const crypto = require("crypto");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { sanitizeValue } = require("../utils/sanitize");
const {
  initializeTransaction,
  verifyTransaction,
  verifyWebhookSignature,
} = require("../services/paystack.service");
const env = require("../config/env");

const generateReference = () => {
  return `RG-${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
};

const mapPaystackStatus = (status = "") => {
  const allowedStatuses = [
    "abandoned",
    "failed",
    "ongoing",
    "pending",
    "processing",
    "queued",
    "reversed",
    "success",
  ];

  return allowedStatuses.includes(status) ? status : "pending";
};

const initializePayment = asyncHandler(async (req, res) => {
  const body = sanitizeValue(req.body);

  const email = body.email;
  const fullName = body.fullName || "";
  const amount = Number(body.amount);
  const currency = body.currency || env.paystackCurrency;
  const purpose = body.purpose || "consultation";
  const service = body.service || "";
  const bookingId = body.bookingId || null;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  if (!amount || Number.isNaN(amount) || amount <= 0) {
    throw new ApiError(400, "A valid amount is required");
  }

  let booking = null;
  if (bookingId) {
    booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new ApiError(404, "Related booking not found");
    }
  }

  const reference = generateReference();

  const metadata = {
    fullName,
    purpose,
    service,
    bookingId: booking ? booking._id.toString() : null,
    custom_fields: [
      {
        display_name: "Customer Name",
        variable_name: "customer_name",
        value: fullName || "Not provided",
      },
      {
        display_name: "Purpose",
        variable_name: "purpose",
        value: purpose,
      },
      {
        display_name: "Service",
        variable_name: "service",
        value: service || "Not provided",
      },
    ],
  };

  const payload = {
    email,
    amount: Math.round(amount * 100),
    currency,
    reference,
    callback_url: body.callbackUrl || env.paystackCallbackUrl,
    metadata,
  };

  const paystackResponse = await initializeTransaction(payload);

  if (!paystackResponse.status || !paystackResponse.data) {
    throw new ApiError(502, "Failed to initialize Paystack transaction");
  }

  const payment = await Payment.create({
    booking: booking ? booking._id : null,
    email,
    fullName,
    amount,
    currency,
    reference,
    paystackAccessCode: paystackResponse.data.access_code || "",
    paystackAuthorizationUrl: paystackResponse.data.authorization_url || "",
    purpose,
    service,
    status: "pending",
    metadata,
    rawInitializeResponse: paystackResponse,
  });

  res.status(201).json({
    success: true,
    message: "Payment initialized successfully",
    data: {
      paymentId: payment._id,
      reference: payment.reference,
      authorizationUrl: payment.paystackAuthorizationUrl,
      accessCode: payment.paystackAccessCode,
      amount: payment.amount,
      currency: payment.currency,
    },
  });
});

const verifyPaymentByReference = asyncHandler(async (req, res) => {
  const { reference } = req.params;

  if (!reference) {
    throw new ApiError(400, "Payment reference is required");
  }

  const payment = await Payment.findOne({ reference });

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  const paystackResponse = await verifyTransaction(reference);

  if (!paystackResponse.status || !paystackResponse.data) {
    throw new ApiError(502, "Failed to verify transaction with Paystack");
  }

  const paystackData = paystackResponse.data;
  const mappedStatus = mapPaystackStatus(paystackData.status);

  payment.status = mappedStatus;
  payment.channel = paystackData.channel || payment.channel;
  payment.gatewayResponse =
    paystackData.gateway_response || payment.gatewayResponse;
  payment.customerCode =
    paystackData.customer?.customer_code || payment.customerCode;
  payment.rawVerifyResponse = paystackResponse;

  if (mappedStatus === "success" && !payment.paidAt) {
    payment.paidAt = paystackData.paid_at ? new Date(paystackData.paid_at) : new Date();
  }

  await payment.save();

  if (payment.booking && mappedStatus === "success") {
    await Booking.findByIdAndUpdate(payment.booking, {
      $set: {
        status: "scheduled",
      },
    });
  }

  res.status(200).json({
    success: true,
    message: "Payment verification completed",
    data: payment,
  });
});

const handlePaystackWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers["x-paystack-signature"];
  const rawBody = req.rawBody;

  const isValid = verifyWebhookSignature(rawBody, signature);

  if (!isValid) {
    throw new ApiError(401, "Invalid Paystack webhook signature");
  }

  const event = req.body;

  if (event.event === "charge.success") {
    const paystackData = event.data;
    const reference = paystackData.reference;

    const payment = await Payment.findOne({ reference });

    if (payment) {
      payment.status = "success";
      payment.channel = paystackData.channel || payment.channel;
      payment.gatewayResponse =
        paystackData.gateway_response || payment.gatewayResponse;
      payment.customerCode =
        paystackData.customer?.customer_code || payment.customerCode;
      payment.rawVerifyResponse = event;
      payment.paidAt = paystackData.paid_at
        ? new Date(paystackData.paid_at)
        : new Date();

      await payment.save();

      if (payment.booking) {
        await Booking.findByIdAndUpdate(payment.booking, {
          $set: {
            status: "scheduled",
          },
        });
      }
    }
  }

  res.status(200).json({ received: true });
});

const getAdminPayments = asyncHandler(async (req, res) => {
  const { status, purpose, search = "", page = 1, limit = 20 } = req.query;

  const query = {};

  if (status) query.status = status;
  if (purpose) query.purpose = purpose;

  if (search) {
    query.$or = [
      { email: { $regex: search, $options: "i" } },
      { fullName: { $regex: search, $options: "i" } },
      { reference: { $regex: search, $options: "i" } },
      { service: { $regex: search, $options: "i" } },
    ];
  }

  const safeLimit = Math.min(Number(limit) || 20, 100);
  const safePage = Math.max(Number(page) || 1, 1);
  const skip = (safePage - 1) * safeLimit;

  const [payments, total] = await Promise.all([
    Payment.find(query)
      .populate("booking")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(safeLimit),
    Payment.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: payments,
    meta: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    },
  });
});

const getAdminPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id).populate("booking");

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  res.status(200).json({
    success: true,
    data: payment,
  });
});

module.exports = {
  initializePayment,
  verifyPaymentByReference,
  handlePaystackWebhook,
  getAdminPayments,
  getAdminPaymentById,
};