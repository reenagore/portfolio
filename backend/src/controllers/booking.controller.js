const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { sanitizeValue } = require("../utils/sanitize");
const {
  sendAdminBookingEmail,
  sendUserBookingConfirmationEmail,
} = require("../services/resend.service");

const escapeRegex = (value = "") =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const submitBooking = asyncHandler(async (req, res) => {
  const body = sanitizeValue(req.body);

  const booking = await Booking.create({
    fullName: body.fullName,
    email: body.email,
    company: body.company || "",
    phone: body.phone || "",
    service: body.service,
    businessStage: body.businessStage || "",
    annualRevenueRange: body.annualRevenueRange || "",
    preferredContactMethod: body.preferredContactMethod || "Email",
    preferredSessionType: body.preferredSessionType || "Virtual",
    preferredDate: body.preferredDate || null,
    preferredTime: body.preferredTime || "",
    challengeSummary: body.challengeSummary,
    goals: body.goals || "",
    source: body.source || "Website",
  });

  try {
    await Promise.all([
      sendAdminBookingEmail({
        fullName: booking.fullName,
        email: booking.email,
        company: booking.company,
        phone: booking.phone,
        service: booking.service,
        businessStage: booking.businessStage,
        annualRevenueRange: booking.annualRevenueRange,
        preferredContactMethod: booking.preferredContactMethod,
        preferredSessionType: booking.preferredSessionType,
        preferredDate: booking.preferredDate
          ? new Date(booking.preferredDate).toISOString()
          : "",
        preferredTime: booking.preferredTime,
        challengeSummary: booking.challengeSummary,
        goals: booking.goals,
        source: booking.source,
      }),
      sendUserBookingConfirmationEmail({
        fullName: booking.fullName,
        email: booking.email,
        service: booking.service,
      }),
    ]);
  } catch (emailError) {
    console.error("Booking email sending failed:", emailError);
  }

  res.status(201).json({
    success: true,
    message: "Consultation request submitted successfully",
    data: {
      id: booking._id,
      fullName: booking.fullName,
      email: booking.email,
      service: booking.service,
      status: booking.status,
      createdAt: booking.createdAt,
    },
  });
});

const getAdminBookings = asyncHandler(async (req, res) => {
  const { status, service, search = "", page = 1, limit = 20 } = req.query;

  const query = {};

  if (status) query.status = status;
  if (service) query.service = service;

  if (search) {
    const escapedSearch = escapeRegex(search);

    query.$or = [
      { fullName: { $regex: escapedSearch, $options: "i" } },
      { email: { $regex: escapedSearch, $options: "i" } },
      { company: { $regex: escapedSearch, $options: "i" } },
      { challengeSummary: { $regex: escapedSearch, $options: "i" } },
    ];
  }

  const safeLimit = Math.min(Number(limit) || 20, 100);
  const safePage = Math.max(Number(page) || 1, 1);
  const skip = (safePage - 1) * safeLimit;

  const [bookings, total] = await Promise.all([
    Booking.find(query)
      .select("-__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(safeLimit),
    Booking.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: bookings,
    meta: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    },
  });
});

const getAdminBookingById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new ApiError(400, "Invalid booking ID");
  }

  const booking = await Booking.findById(req.params.id).select("-__v");

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  res.status(200).json({
    success: true,
    data: booking,
  });
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new ApiError(400, "Invalid booking ID");
  }

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  const body = sanitizeValue(req.body);

  if (body.status) {
    booking.status = body.status;

    if (body.status === "contacted" && !booking.contactedAt) {
      booking.contactedAt = new Date();
    }

    if (body.status === "scheduled" && !booking.scheduledAt) {
      booking.scheduledAt = new Date();
    }

    if (body.status === "closed" && !booking.closedAt) {
      booking.closedAt = new Date();
    }
  }

  if (body.internalNotes !== undefined) {
    booking.internalNotes = body.internalNotes;
  }

  await booking.save();

  res.status(200).json({
    success: true,
    message: "Booking updated successfully",
    data: booking,
  });
});

const deleteBooking = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new ApiError(400, "Invalid booking ID");
  }

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  await booking.deleteOne();

  res.status(200).json({
    success: true,
    message: "Booking deleted successfully",
  });
});

module.exports = {
  submitBooking,
  getAdminBookings,
  getAdminBookingById,
  updateBookingStatus,
  deleteBooking,
};