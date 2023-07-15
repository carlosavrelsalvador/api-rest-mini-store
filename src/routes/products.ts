import express from "express";
import { ErrorHandler } from "./../middlewares/ErrorHandler";
import { AuthController } from "./../controllers/AuthController";
import { ProductsController } from "../controllers/ProductsController";

const productsController = new ProductsController();
const router = express.Router();
router.get("/", ErrorHandler.catchErrors(productsController.get));

export default router;
