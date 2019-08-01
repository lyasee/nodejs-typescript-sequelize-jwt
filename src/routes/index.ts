import RouterAbstract from "./router.abstract";
import Auth from "./auth/auth.ctrl";

class Api extends RouterAbstract {
  private static instance = new Api();

  constructor() {
    if (!!Api.instance) {
      return Api.instance;
    }

    super();
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.use("/auth", Auth.route);
  }
}

export default new Api();
