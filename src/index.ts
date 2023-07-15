import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Products } from "./entity/Products";
import { Orders } from "./entity/Orders";
import * as dotenv from "dotenv";
import app from "./app";

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    // user default
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    user.createdAt = new Date();
    user.email = "usuario@gmail.com";
    user.role = 2;
    user.password = "12345";
    user.updatedAt = new Date();
    user.name = user.firstName;

    const users = await AppDataSource.manager.find(User);
    console.log("typeof (users) = ", typeof users);
    if (users.length <= 0) {
      console.log("Inserting a new user into the database...");
      await AppDataSource.manager.save(user);
      console.log("Saved a new user with id: " + user.id);
    }

    // product default
    const product = new Products();
    product.createdAt = new Date();
    product.description = "Botella 750 ml";
    product.name = "Botella de licor";
    product.price = 34.99;

    const products = await AppDataSource.manager.find(Products);
    console.log("typeof (products) = ", typeof products);
    if (products.length <= 0) {
      console.log("Inserting a new product into the database...");
      await AppDataSource.manager.save(product);
      console.log("Saved a new product with id: " + product.id);
    }
    // orders default
    const order = new Orders();
    order.code = "SV0001";
    order.customer = "1";
    order.totalAmount = 34.99;
    order.createdAt = new Date();
    const orders = await AppDataSource.manager.find(Orders);
    console.log("typeof (orders) = ", typeof orders);
    if (orders.length <= 0) {
      console.log("Inserting a new order into the database...");
      await AppDataSource.manager.save(order);
      console.log("Saved a new order with id: " + order.id);
    }
    //
    console.log("Loading users from the database...");
    console.log("Loaded users: ", users);
    //
    console.log("Loading products from the database...");
    console.log("Loaded products: ", products);
    //
    console.log("Loading products from the database...");
    console.log("Loaded orders: ", orders);
    //
    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
