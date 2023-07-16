import express from "express";
import { ErrorHandler } from "./../middlewares/ErrorHandler";
import { AuthController } from "./../controllers/AuthController";
import { ProductsController } from "../controllers/ProductsController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { AdminMiddleware } from "../middlewares/AdminMiddleware";

const productsController = new ProductsController();
const router = express.Router();
router.get("/", ErrorHandler.catchErrors(productsController.get));
router.post("/search", ErrorHandler.catchErrors(productsController.search));
// ROLE == Admin
// 1. Create products
router.post(
  "/createProduct",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.check),
  ErrorHandler.catchErrors(productsController.createProduct)
);

// ROLE == Admin
// 2. Update products

// ROLE == Admin
// 3. Delete products

// ROLE == Admin
// 4. Deactivate products
export default router;
