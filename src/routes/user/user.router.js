const { Router } = require("express");
const userService = require("../../services/user/user.service");
const { apiRes } = require("../../utils/apiHelpers");
const userRouter = Router();

userRouter.post("/", [], async (req, res, next) => {
  const data = req.body;
  const user = await userService.createUser(data);
  apiRes(res, user);
});

userRouter.get("/search", [], async (req, res, next) => {
  const email = req.query.email;
  const users = await userService.searchUsers(email);
  apiRes(res, users);
});

module.exports = userRouter;
