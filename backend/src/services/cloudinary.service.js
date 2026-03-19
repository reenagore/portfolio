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

const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;

  return cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
};