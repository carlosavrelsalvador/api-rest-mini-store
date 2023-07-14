import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Products } from "./entity/Products";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "newbie",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User, Products],
  migrations: [],
  subscribers: [],
});
