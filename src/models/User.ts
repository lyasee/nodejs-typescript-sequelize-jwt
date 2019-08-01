import { sequelize } from "../config/database";
import Sequelize, { Model } from "sequelize";
import { IUser } from "../typings/auth/IUser";

const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcrypt-nodejs"));

function hashPassword(user: any, options: any) {
  const SALT_FACTOR = 8;

  if (!user.changed("password")) {
    return;
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue("password", hash);
    });
}

export class UserVO extends Model<IUser> {
  id?: number;
  username: string;
  password: string;
}

UserVO.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "UserVO",
    tableName: "user",
    hooks: {
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  }
);

export const User = UserVO;
