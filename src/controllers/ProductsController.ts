import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Paginator } from "../Paginator";
import { ResponseUtil } from "../utils/Response";
import { Products } from "../entity/Products";

export class ProductsController {
  // list products
  async get(req: Request, res: Response) {
    // const builder = await AppDataSource.manager.find(Products);
    const builder = await AppDataSource.getRepository(Products)
      .createQueryBuilder()
      .orderBy("id", "DESC");
    const { records: products, paginationInfo } = await Paginator.paginate(
      builder,
      req
    );
    const productsData = products.map((products: Products) => {
      return products.toPayload();
    });

    return ResponseUtil.sendResponse(
      res,
      "Fetched products successfully",
      productsData,
      paginationInfo
    );
  }

  async search(req: Request, res: Response, next: NextFunction) {
    const { txtSearch } = req.body;

    const builder = await AppDataSource.getRepository(Products)
      .createQueryBuilder("product")
      .where("product.name like :txt", { txt: `%${txtSearch}%` })
      .orWhere("product.category like :txt_two", { txt_two: `%${txtSearch}%` })
      .limit(10)
      .getMany();

    const productsData = builder.map((products: Products) => {
      return products.toPayload();
    });

    return ResponseUtil.sendResponse(
      res,
      "Fetched products successfully",
      productsData,
      null
    );
  }
}
