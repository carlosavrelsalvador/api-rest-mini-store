import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Paginator } from "../Paginator";
import { ResponseUtil } from "../utils/Response";
import { Products } from "../entity/Products";
import {
  CreateProductDTO,
  StatusProductDTO,
  UpdateProductDTO,
} from "../dtos/ProductDTO";

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

  // ROLE == user logged
  // viewCategory
  async viewCategory(req: Request, res: Response, next: NextFunction) {
    const { category } = req.body;

    const builder = await AppDataSource.getRepository(Products)
      .createQueryBuilder("product")
      .where("product.category like :txt_two", { txt_two: `%${category}%` })
      .getMany();

    const productsData = builder.map((products: Products) => {
      return products.toPayload();
    });

    return ResponseUtil.sendResponse(
      res,
      "Fetched products by category successfully",
      productsData,
      null
    );
  }

  // getProduct by id
  async getProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    const product = await AppDataSource.getRepository(Products).findOneByOrFail(
      {
        id: Number(id),
      }
    );

    return ResponseUtil.sendResponse<Partial<Products>>(
      res,
      "Fetch product successfully",
      product.toPayload()
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
  async updateProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    const productData = req.body;

    const dto = new UpdateProductDTO();
    Object.assign(dto, productData);
    dto.id = parseInt(id);

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Products);

    const product = await repo.findOneByOrFail({
      id: Number(id),
    });

    repo.merge(product, productData);
    await repo.save(product);
    return ResponseUtil.sendResponse(
      res,
      "Successfully updated the product",
      product.toPayload()
    );
  }

  // ROLE == Admin
  // 3. Delete products
  async deleteProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    const repo = AppDataSource.getRepository(Products);
    const product = await repo.findOneByOrFail({
      id: Number(id),
    });
    await repo.remove(product);
    return ResponseUtil.sendResponse(
      res,
      "Successfully deleted the product",
      null
    );
  }

  // ROLE == Admin
  // 4. Deactivate products
  async statusProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    const productData = req.body;

    const dto = new StatusProductDTO();
    Object.assign(dto, productData);
    dto.id = parseInt(id);

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Products);

    const product = await repo.findOneByOrFail({
      id: Number(id),
    });

    repo.merge(product, productData);
    await repo.save(product);
    return ResponseUtil.sendResponse(
      res,
      "Successfully updated the product",
      product.toPayload()
    );
  }

  //   5. Ver ordenes de los clientes
}
