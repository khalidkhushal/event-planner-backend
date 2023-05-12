const multer = require("multer");

const multerUploader = multer({
  dest: "assets/uploads",
  limits: { fileSize: 50 * 1024 * 1024 },
});

exports.fileMiddleware = [multerUploader.single("file")];
