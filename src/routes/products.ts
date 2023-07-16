import express from "express";
import { ErrorHandler } from "./../middlewares/ErrorHandler";
import { AuthController } from "./../controllers/AuthController";
import { ProductsController } from "../controllers/ProductsController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { AdminMiddleware } from "../middlewares/AdminMiddleware";

const productsController = new ProductsController();
const router = express.Router();
router.get("/", ErrorHandler.catchErrors(productsController.get));

// ROLE == User (registered user)
// 1. Ver productos (viewCategory)
router.get(
  "/viewCategory",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(productsController.viewCategory)
);

// ROLE == User (registered user)
// 2. Ver el detalle del producto
router.get(
  "/getProduct",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(productsController.getProduct)
);

// any role
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
router.put(
  "/updateProduct",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.check),
  ErrorHandler.catchErrors(productsController.updateProduct)
);

// ROLE == Admin
// 3. Delete products
router.delete(
  "/deleteProduct",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.check),
  ErrorHandler.catchErrors(productsController.deleteProduct)
);

// ROLE == Admin
// 4. Deactivate products
router.put(
  "/statusProduct",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.check),
  ErrorHandler.catchErrors(productsController.statusProduct)
);

// ROLE == Admin
// 5. Ver ordenes de los clientes

export default router;
