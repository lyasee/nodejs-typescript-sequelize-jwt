import * as express from "express";
import * as bodyParser from "body-parser"; // used to parse the form data that you pass in the request
import apiRoute from "./routes";
import * as cors from "cors";
import { sequelize } from "./config/database";

class App {
  public app: express.Application;

  constructor() {
    this.app = express(); // run the express instance and store in app
    this.config();
    this.connect();
    this.passport();
  }

  private config(): void {
    this.app.use(cors());
    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );

    this.app.use("/api/v1", apiRoute.route);
  }

  private connect(): void {
    sequelize
      .sync()
      .then(() => {
        console.log("Sequelize Connection Success!");
      })
      .catch(err => {
        console.error("Sequelize Connection ERROR! ", err);
        process.exit();
      });
  }

  private passport(): void {
    require("./config/passport");
  }
}

export default new App().app;
