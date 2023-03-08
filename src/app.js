const express = require("express");
const cors = require("cors");
const { PORT, MONGO_URI } = require("./utils/secret");
const DBConnect = require("./config/connection");

// express app initialize

const app = express();

// express app configurations

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "html");

// connect db

DBConnect(MONGO_URI);

// initialize servier at PORT

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT} at http://localhost:${PORT} `);
});
