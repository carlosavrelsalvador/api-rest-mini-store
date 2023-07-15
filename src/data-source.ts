import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/User";
import { Products } from "./entity/Products";
import { Orders } from "./entity/Orders";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "newbie",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [Users, Products, Orders],
  migrations: [],
  subscribers: [],
});
