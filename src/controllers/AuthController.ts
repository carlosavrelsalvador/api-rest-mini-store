import { AppDataSource } from "./../data-source";
import { Users } from "./../entity/User";
import { ResponseUtil } from "./../utils/Response";
import { LoginDTO, RegisterDTO } from "./../dtos/AuthDTO";
import { compare } from "bcryptjs";
import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";

export class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const registerData = req.body;

    const dto = new RegisterDTO();
    dto.email = registerData.email;
    dto.name = registerData.name;
    dto.password = registerData.password;

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Users);
    const user = repo.create(registerData);
    await repo.save(user);

    return ResponseUtil.sendResponse(
      res,
      "Successfully registered",
      user,
      null
    );
  }

  async login(req: Request, res: Response, next: NextFunction) {
    console.log("req.body = ", req.body);
    const { email, password } = req.body;
    const dto = new LoginDTO();
    dto.email = email;
    dto.password = password;

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Users);
    const user = await repo.findOneBy({ email });
    // console.log(
    //   "user =",
    //   user,
    //   "Object.keys(user).length = ",
    //   Object.keys(user).length,
    //   "password = ",
    //   password,
    //   "user.password = ",
    //   user.password
    // );
    if (Object.keys(user).length <= 0) {
      return ResponseUtil.sendErrror(res, "Invalid credentials 1", 401, null);
    }
    let passwordMatches = await compare(password, user.password);
    if (!passwordMatches) {
      return ResponseUtil.sendErrror(res, "Invalid credentials 2", 401, null);
    }
    let accessToken = sign(
      { userId: user.id },
      process.env.ACCESS_KEY_SECRET || "secret123",
      {
        expiresIn: "12h",
      }
    );

    const returnUser = user.toResponse();

    return ResponseUtil.sendResponse(res, "User login success", {
      user: returnUser,
      accessToken,
    });
  }
}
