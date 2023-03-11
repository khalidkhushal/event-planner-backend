const jwt = require("jsonwebtoken");
const { addHoursInCurrentDate } = require("../utils/common");
const { JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRES } = require("../utils/secret");

exports.getTokens = (userId, email) => {
  const accessExpiresIn = addHoursInCurrentDate(JWT_ACCESS_TOKEN_EXPIRES);

  const payload = {
    userId,
    email,
  };

  const accessToken = jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRES * 60 * 60 });

  return { accessToken, expiresIn: accessExpiresIn };
};
