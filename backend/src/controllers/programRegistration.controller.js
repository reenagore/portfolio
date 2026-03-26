const ProgramRegistration = require("../models/Registration");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { sanitizeValue } = require("../utils/sanitize");
const {
  sendAdminProgramRegistrationEmail,
  sendUserProgramRegistrationConfirmationEmail,
} = require("../services/resend.service");

const submitProgramRegistration = asyncHandler(async (req, res) => {
  const body = sanitizeValue(req.body);

  const registration = await ProgramRegistration.create({
    programTitle: body.programTitle,
    programSlug: body.programSlug,
    fullName: body.fullName,
    email: body.email,
    phone: body.phone || "",
    company: body.company || "",
    role: body.role || "",
    message: body.message || "",
  });

  try {
    await Promise.all([
      sendAdminProgramRegistrationEmail({
        programTitle: registration.programTitle,
        fullName: registration.fullName,
        email: registration.email,
        phone: registration.phone,
        company: registration.company,
        role: registration.role,
        message: registration.message,
      }),
      sendUserProgramRegistrationConfirmationEmail({
        fullName: registration.fullName,
        email: registration.email,
        programTitle: registration.programTitle,
      }),
    ]);
  } catch (emailError) {
    console.error("Program registration email failed:", emailError.message);
  }

  res.status(201).json({
    success: true,
    message: "Program registration submitted successfully",
    data: {
      id: registration._id,
      programTitle: registration.programTitle,
      fullName: registration.fullName,
      email: registration.email,
      status: registration.status,
      createdAt: registration.createdAt,
    },
  });
});

const getAdminProgramRegistrations = asyncHandler(async (req, res) => {
  const { status, programSlug, search = "" } = req.query;

  const query = {};

  if (status) query.status = status;
  if (programSlug) query.programSlug = programSlug;

  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { programTitle: { $regex: search, $options: "i" } },
    ];
  }

  const items = await ProgramRegistration.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: items,
  });
});

const getAdminProgramRegistrationById = asyncHandler(async (req, res) => {
  const item = await ProgramRegistration.findById(req.params.id);

  if (!item) {
    throw new ApiError(404, "Program registration not found");
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});

const updateProgramRegistrationStatus = asyncHandler(async (req, res) => {
  const item = await ProgramRegistration.findById(req.params.id);

  if (!item) {
    throw new ApiError(404, "Program registration not found");
  }

  const body = sanitizeValue(req.body);

  if (body.status) {
    item.status = body.status;
  }

  await item.save();

  res.status(200).json({
    success: true,
    message: "Program registration updated successfully",
    data: item,
  });
});

module.exports = {
  submitProgramRegistration,
  getAdminProgramRegistrations,
  getAdminProgramRegistrationById,
  updateProgramRegistrationStatus,
};