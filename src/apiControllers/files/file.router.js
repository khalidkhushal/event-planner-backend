const { Router } = require("express");
const fileService = require("../../services/files/upload");
const { apiRes } = require("../../utils/apiHelpers");
const { apiError } = require("../../utils/error");
const { AuthMiddleware } = require("../../middlewares/authMiddleware");
const { fileMiddleware } = require("../../middlewares/file.middleware");
const fileRouter = Router();

fileRouter.post(
  "/upload",
  [AuthMiddleware(), fileMiddleware],
  async (req, res, next) => {
    try {
      const file = req.file;
      const upload = await fileService.uploadFile(file);
      apiRes(res, upload);
    } catch (e) {
      apiError(res, e, 400, next);
    }
  }
);
module.exports = fileRouter;
