const express = require("express");
const cors = require("cors");
const { PORT, MONGO_URI } = require("./utils/secret");
const DBConnect = require("./config/connection");
const homeRouter = require("./routes/home");

// express app initialize

const app = express();

// express app configurations

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");

// connect db

DBConnect(MONGO_URI);

// routes

app.use("/", homeRouter);

// initialize server at PORT

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT} `);
});
