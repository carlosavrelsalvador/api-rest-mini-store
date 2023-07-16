import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Paginator } from "../Paginator";
import { ResponseUtil } from "../utils/Response";
import { Products } from "../entity/Products";
import { CreateCartDTO } from "../dtos/CartDTO";
import { Carts } from "../entity/Cart";
import { Orders } from "../entity/Orders";

export class OrdersController {
  // list all orders
  async get(req: Request, res: Response) {
    // const builder = await AppDataSource.manager.find(Products);
    const builder = await AppDataSource.getRepository(Orders)
      .createQueryBuilder()
      .orderBy("id", "DESC");

    const { records: orders, paginationInfo } = await Paginator.paginate(
      builder,
      req
    );

    const ordersData = orders.map((orders: Orders) => {
      return orders.toPayload();
    });

    return ResponseUtil.sendResponse(
      res,
      "Fetched orders successfully",
      ordersData,
      paginationInfo
    );
  }
}
