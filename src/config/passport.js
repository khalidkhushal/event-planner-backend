const userDAO = require("../dataAccess/user/user.dao");
const { apiError } = require("../utils/error");
const { JWT_ACCESS_TOKEN_SECRET } = require("../utils/secret");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

module.exports = passport = (passport) => {
  passport.use(
    "jwt",
    new JWTstrategy(
      {
        secretOrKey: JWT_ACCESS_TOKEN_SECRET,
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          console.log("error");
          done(error);
        }
      }
    )
  );
};
