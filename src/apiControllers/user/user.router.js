const { Router } = require("express");
const userService = require("../../services/user/user.service");
const { apiRes } = require("../../utils/apiHelpers");
const userRouter = Router();
const { apiError } = require("../../utils/error");
const { AuthMiddleware } = require("../../middlewares/authMiddleware");

userRouter.post("/login", [], async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.findOrCreateUser({ email, password });
    apiRes(res, result);
  } catch (err) {
    apiError(res, err, 400, next);
  }
});

userRouter.get("/search", [AuthMiddleware()], async (req, res, next) => {
  try {
    const email = req.query.email;
    const users = await userService.searchUsers(email);
    apiRes(res, users);
  } catch (err) {
    apiError(res, err, 400, next);
  }
});

userRouter.patch("/update", [AuthMiddleware()], async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const {oldPassword, newPassword} = req.body
    const result = await userService.updatePassword(userId, {oldPassword, newPassword});
    apiRes(res, result);
  } catch (err) {
    apiError(res, err, 400, next);
  }
});

userRouter.delete("/delete", [AuthMiddleware()], async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const result = await userService.delete(userId);
    apiRes(res, result);
  } catch (err) {
    apiError(res, err, 400, next);
  }
});

module.exports = userRouter;
