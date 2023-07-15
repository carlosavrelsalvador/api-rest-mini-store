import { NextFunction, Request, Response } from "express";
import { Roles } from "../constants/Role";
import { Users } from "../entity/User";
import { ResponseUtil } from "../utils/Response";

export class AdminMiddleware {
  static async check(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const user = req.user as Users;
    if (user.role != Roles.ADMIN) {
      return ResponseUtil.sendErrror(res, "Unauthorized", 403, null);
    }
    next();
  }
}
