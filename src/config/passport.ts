import * as passport from "passport";
import { User } from "../models/User";

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const config = require("./config");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findOne({
          where: {
            id: jwtPayload.id
          }
        });

        if (!user) {
          return done(new Error(), false);
        }

        return done(null, user);
      } catch (err) {
        return done(new Error(), false);
      }
    }
  )
);

module.exports = null;
