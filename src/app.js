const express = require("express");
const cors = require("cors");
const { PORT, MONGO_URI } = require("./utils/secret");
const DBConnect = require("./config/connection");
const homeRouter = require("./apiControllers/home");
const userRouter = require("./apiControllers/user/user.router");
const { errorHandlerAll } = require("./utils/error");
const morgan = require("morgan");
const passport = require("passport");
// express app initialize

const app = express();

// passport

const configPassport = require("./config/passport");
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

// handle errors

app.use("*", errorHandlerAll);

// initialize server at PORT

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT} `);
});
