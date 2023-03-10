const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

exports.PORT = process.env.PORT;
exports.MONGO_URI = process.env.MONGO_URI;
exports.JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
exports.JWT_ACCESS_TOKEN_EXPIRES = process.env.JWT_ACCESS_TOKEN_EXPIRES;
exports.JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
exports.JWT_REFRESH_TOKEN_EXPIRES = process.env.JWT_REFRESH_TOKEN_EXPIRES;
// module.exports = { PORT, MONGO_URI, JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRES };
