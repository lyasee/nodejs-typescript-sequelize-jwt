import { Request, Response } from "express";
import RouterAbstract from "../router.abstract";
import AuthService from "./auth.service";
import { isAuthenticated } from "../../policies/isAuthenticated";
import { IUser } from "../../typings/auth/IUser";

class AuthRoute extends RouterAbstract {
  constructor() {
    super();
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.post("/login", this.signin);
    this.router.post("/register", this.signup);
    this.router.post("/check", isAuthenticated, this.check);
  }

  private async signin(req: Request, res: Response): Promise<Response> {
    const user: IUser = {
      username: req.body.username,
      password: req.body.password
    };

    const result = await AuthService.signin(user);

    return res.status(result.status).json(result);
  }

  private async signup(req: Request, res: Response): Promise<Response> {
    const user: IUser = {
      username: req.body.username,
      password: req.body.password
    };

    const result = await AuthService.signup(user);

    return res.status(result.status).json(result);
  }

  private async check(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ success: true, status: 200 });
  }
}

export default new AuthRoute();
