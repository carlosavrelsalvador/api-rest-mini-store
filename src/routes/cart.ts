import express from "express";
import { ErrorHandler } from "./../middlewares/ErrorHandler";
import { AuthController } from "./../controllers/AuthController";
import { ProductsController } from "../controllers/ProductsController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { AdminMiddleware } from "../middlewares/AdminMiddleware";
import { CartController } from "../controllers/CartController";

const cartController = new CartController();
const router = express.Router();

// Role == User
// push item in cart of user
router.post(
  "/pushProduct",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(cartController.pushProduct)
);
export default router;
