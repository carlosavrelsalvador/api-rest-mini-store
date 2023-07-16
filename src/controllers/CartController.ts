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

  // list product in cart
  async get(req: Request, res: Response, next: NextFunction) {
    const { user_id } = req.body;

    const builder = await AppDataSource.getRepository(Carts)
      .createQueryBuilder("carts")
      .where("carts.user_id = :user_id", { user_id })
      .getMany();

    const itemsData = builder.map((products: Carts) => {
      return products.toPayload();
    });

    return ResponseUtil.sendResponse(
      res,
      "Fetched products in cart successfully",
      itemsData,
      null
    );
  }
}
