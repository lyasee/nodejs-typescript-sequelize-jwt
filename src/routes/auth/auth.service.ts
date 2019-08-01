import * as jwt from "jsonwebtoken";
import * as bcriptNodejs from "bcrypt-nodejs";
import { promisifyAll } from "bluebird";
const bcrypt = promisifyAll(bcriptNodejs);
const config = require("../../config/config");

import { IResponse } from "../../typings/IResponse";
import { User } from "../../models/User";
import { IUser } from "../../typings/auth/IUser";

const jwtSignUser = (user: any): string => {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.jwtSecret, {
    expiresIn: ONE_WEEK
  });
};

class AuthController {
  constructor() {}

  public async signup(user: IUser): Promise<IResponse> {
    const { username, password } = user;

    if (user.username === undefined || user.password === undefined) {
      return { success: true, status: 400 };
    }

    try {
      const user = await User.create({ username, password });
      const userJson = user.toJSON();
      return {
        success: true,
        status: 200,
        user: userJson,
        token: jwtSignUser(userJson)
      };
    } catch (err) {
      return {
        success: false,
        status: 400,
        message: "This account is already in use."
      };
    }
  }

  public async signin(user: IUser): Promise<IResponse> {
    const { username, password } = user;

    if (username === undefined || password === undefined) {
      return { success: true, status: 400 };
    }

    try {
      const user = await User.findOne({
        where: {
          username: username
        }
      });

      if (!user) {
        return {
          success: false,
          status: 401,
          message: "유저 정보가 없습니다."
        };
      }

      const isPasswordValid = await bcrypt.compareAsync(
        password,
        user.password
      );
      if (!isPasswordValid) {
        return {
          success: false,
          status: 403,
          message: "패스워드가 맞지 않습니다."
        };
      }

      const userJson = user.toJSON();
      return {
        success: true,
        status: 200,
        user: userJson,
        token: jwtSignUser(userJson)
      };
    } catch (err) {
      return {
        success: false,
        status: 403,
        message: "An error has occured trying to log in"
      };
    }
  }
}

export default new AuthController();
