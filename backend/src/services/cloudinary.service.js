const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (filePath, folder = "reena-gore") => {
  try {
    return await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

const uploadRawFileToCloudinary = async (
  filePath,
  folder = "reena-gore/products/files"
) => {
  try {
    return await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "raw",
      use_filename: true,
      unique_filename: true,
    });
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

module.exports = {
  uploadToCloudinary,
  uploadRawFileToCloudinary,
};