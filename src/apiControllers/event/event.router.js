const { Router } = require("express");
const userService = require("../../services/user/user.service");
const { apiRes } = require("../../utils/apiHelpers");
const eventRouter = Router();
const { apiError } = require("../../utils/error");
const { AuthMiddleware } = require("../../middlewares/authMiddleware");
const { catchAsync, extractPagePerPageFromReq } = require("../../utils/common");
const eventService = require("../../services/events/event.service");

eventRouter.post("/", [AuthMiddleware()], async (req, res, next) => {
  try {
    const { userId } = req.user;
    const result = await eventService.create(userId, req.body);
    apiRes(res, result);
  } catch (err) {
    apiError(res, err, 400, next);
  }
});

eventRouter.get("/list", [AuthMiddleware()], async (req, res, next) => {
  try {
    const { page, perPage } = extractPagePerPageFromReq(req);
    const users = await eventService.list(page, perPage);
    apiRes(res, users);
  } catch (err) {
    apiError(res, err, 400, next);
  }
});

eventRouter.get("/list/:userId", [AuthMiddleware()], async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { page, perPage } = extractPagePerPageFromReq(req);
    const result = await eventService.listbyUserId(userId, page, perPage);
    apiRes(res, result);
  } catch (err) {
    apiError(res, err, 400, next);
  }
});

eventRouter.get("/get/:id", [AuthMiddleware()], async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const result = await eventService.getbyId(eventId);
    apiRes(res, result);
  } catch (err) {
    apiError(res, err, 400, next);
  }
});

module.exports = eventRouter;
