import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Paginator } from "../Paginator";
import { ResponseUtil } from "../utils/Response";
import { Products } from "../entity/Products";
import { CreateCartDTO } from "../dtos/CartDTO";
import { Carts } from "../entity/Cart";
import { Orders } from "../entity/Orders";
import { CreateOrderDTO } from "../dtos/OrderDTO";

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

  // My Orders
  async getCustomerOrders(req: Request, res: Response) {
    const { user_id } = req.body;

    const builder = await AppDataSource.getRepository(Orders)
      .createQueryBuilder("order")
      .where("order.user_id = :user_id", { user_id })
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
      "Fetched my orders successfully",
      ordersData,
      paginationInfo
    );
  }

  // ROLE == User
  // 1. Create Order
  async addOrder(req: Request, res: Response): Promise<Response> {
    const orderData = req.body;

    const dto = new CreateOrderDTO();
    Object.assign(dto, orderData);

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Orders);
    const order = repo.create(orderData);
    await repo.save(order);

    return ResponseUtil.sendResponse(
      res,
      "Successfully created new order by user",
      order,
      200
    );
  }
}
