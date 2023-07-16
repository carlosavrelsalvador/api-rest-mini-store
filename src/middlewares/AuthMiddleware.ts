import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ResponseUtil } from "../utils/Response";
import { AppDataSource } from "./../data-source";
import { Users } from "./../entity/User";

export class AuthMiddleware {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    // console.log("req.headers = ", req.headers);
    const { authorization: tokenHeader } = req.headers;
    if (!tokenHeader) {
      return ResponseUtil.sendErrror(res, "Token not provided", 401, null);
    }

    const token = tokenHeader; //.split(".")[1];

    try {
      const decoded = await jwt.verify(
        token,
        process.env.ACCESS_KEY_SECRET || "secret123"
      );
      // @ts-ignore
      const { userId: id } = decoded;
      const repo = AppDataSource.getRepository(Users);
      const user = await repo.findOneByOrFail({ id });

      // @ts-ignore
      req.user = user;
    } catch (error) {
      console.error(error);
      return ResponseUtil.sendErrror(res, "Invalid token", 401, null);
    }
    next();
  }
}
