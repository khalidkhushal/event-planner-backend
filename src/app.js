const express = require("express");
const cors = require("cors");
const DBConnect = require("./config/connection");
const morgan = require("morgan");
const passport = require("passport");
const { PORT, MONGO_URI } = require("./utils/secret");
const { errorHandlerAll } = require("./utils/error");
const homeRouter = require("./apiControllers/home");
const userRouter = require("./apiControllers/user/user.router");
const eventRouter = require("./apiControllers/event/event.router");
const configPassport = require("./config/passport");
const fileRouter = require("./apiControllers/files/file.router");

// express app initialize

const app = express();

// passport

configPassport(passport);

// express app configurations

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");
app.use(morgan("dev"));

// connect db

DBConnect(MONGO_URI);

// routes

app.use("/", homeRouter);
app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);
app.use("/api/file", fileRouter);

// handle errors
app.use("*", errorHandlerAll);

// initialize server at PORT

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT} `);
});
