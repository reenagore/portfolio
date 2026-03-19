const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { uploadToCloudinary } = require("../services/cloudinary.service");

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No image file uploaded");
  }

  const folder = req.body.folder || "reena-gore/general";
  const uploaded = await uploadToCloudinary(req.file.path, folder);

  res.status(200).json({
    success: true,
    message: "Image uploaded successfully",
    data: {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
      width: uploaded.width,
      height: uploaded.height,
      format: uploaded.format,
    },
  });
});

module.exports = {
  uploadImage,
};