const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.send("<h1> Hello Noob </h1>");
});

module.exports = homeRouter;
