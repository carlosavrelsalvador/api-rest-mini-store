import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Paginator } from "../Paginator";
import { ResponseUtil } from "../utils/Response";
import { Products } from "../entity/Products";
import { CreateProductDTO } from "../dtos/ProductDTO";

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

  // search product
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

  // ROLE == Admin
  // 1. Create products
  async createProduct(req: Request, res: Response): Promise<Response> {
    const productData = req.body;

    const dto = new CreateProductDTO();
    Object.assign(dto, productData);

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Products);
    const product = repo.create(productData);
    await repo.save(product);

    return ResponseUtil.sendResponse(
      res,
      "Successfully created new product",
      product,
      200
    );
  }
  // ROLE == Admin
  // 2. Update products

  // ROLE == Admin
  // 3. Delete products

  // ROLE == Admin
  // 4. Deactivate products
}
