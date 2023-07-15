import { EntityNotFoundError } from "typeorm";
import express from "express";
import { ErrorHandler } from "./../middlewares/ErrorHandler";
import { AuthController } from "./../controllers/AuthController";

const authController = new AuthController();

const router = express.Router();
router.post("/register", ErrorHandler.catchErrors(authController.register));
router.post("/login", ErrorHandler.catchErrors(authController.login));

export default router;
