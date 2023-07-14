import express, { Express, Request, Response } from "express";
import { createConnection } from "typeorm";
import bodyParser from "body-parser";
import cors from "cors";

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// todo - list endpoints

// default endPoints
app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Invalid route",
  });
});
export default app;
