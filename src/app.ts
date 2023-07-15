import { ErrorHandler } from "./middlewares/ErrorHandler";
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import authRoute from "./routes/auth";
import * as swaggerDocument from "./swagger.json";

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// todo - list endpoints
app.use("/auth", authRoute);

// doc swagger
var options = {
  explorer: true,
};

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// default endPoints
app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Invalid route",
  });
});

app.use(ErrorHandler.handleErrors);

export default app;
