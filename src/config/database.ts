import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  database: "mysql",
  username: "root",
  password: "",
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  define: {
    timestamps: false
  },
  timezone: "+09:00",
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
