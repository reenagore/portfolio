const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (filePath, folder = "reena-gore") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });

    return result;
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

const uploadRawFileToCloudinary = async (filePath, folder = "reena-gore/files") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "raw",
      use_filename: true,
      unique_filename: true,
    });

    return result;
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  if (!publicId) return null;

  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
};

module.exports = {
  uploadToCloudinary,
  uploadRawFileToCloudinary,
  deleteFromCloudinary,
};