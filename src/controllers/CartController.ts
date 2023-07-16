import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Paginator } from "../Paginator";
import { ResponseUtil } from "../utils/Response";
import { Products } from "../entity/Products";
import { CreateCartDTO } from "../dtos/CartDTO";
import { Carts } from "../entity/Cart";
export class CartController {
  // list item cart

  // push item in cart
  async pushProduct(req: Request, res: Response): Promise<Response> {
    const itemData = req.body;

    const dto = new CreateCartDTO();
    Object.assign(dto, itemData);

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Carts);
    const item = repo.create(itemData);
    await repo.save(item);

    return ResponseUtil.sendResponse(
      res,
      "Successfully created new item in cart",
      item,
      200
    );
  }
}
