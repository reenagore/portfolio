const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const compressImage = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const inputPath = req.file.path;
    const outputFilename = `compressed-${Date.now()}.webp`;
    const outputPath = path.join(path.dirname(inputPath), outputFilename);

    await sharp(inputPath)
      .rotate()
      .resize({
        width: 1600,
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
      })
      .toFile(outputPath);

    if (fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
    }

    req.file.path = outputPath;
    req.file.filename = outputFilename;
    req.file.mimetype = "image/webp";

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = compressImage;