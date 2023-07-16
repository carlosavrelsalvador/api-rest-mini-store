import express from "express";
import { ErrorHandler } from "./../middlewares/ErrorHandler";
import { AuthController } from "./../controllers/AuthController";
import { ProductsController } from "../controllers/ProductsController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { AdminMiddleware } from "../middlewares/AdminMiddleware";
import { OrdersController } from "../controllers/OrdersController";

const ordersController = new OrdersController();
const router = express.Router();

// Role = Admin
// get all orders any customer
router.get(
  "/",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(AdminMiddleware.check),
  ErrorHandler.catchErrors(ordersController.get)
);

// Role = Users
router.get(
  "/getCustomerOrders",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(ordersController.getCustomerOrders)
);

export default router;
