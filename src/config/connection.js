const mongoose = require("mongoose");

const DBConnect = async (MONGO_URI) => {
  const connection = await mongoose.connect(MONGO_URI);
  console.log("connection to db established");
  return connection;
};

module.exports = DBConnect;
