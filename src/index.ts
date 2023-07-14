import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Products } from "./entity/Products";

AppDataSource.initialize()
  .then(async () => {
    // user defaul
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    user.createdAt = new Date();
    user.email = "usuario@gmail.com";
    user.role = 2;

    const users = await AppDataSource.manager.find(User);
    console.log("typeof (users) = ", typeof users);
    if (users.length <= 0) {
      console.log("Inserting a new user into the database...");
      await AppDataSource.manager.save(user);
      console.log("Saved a new user with id: " + user.id);
    }

    // product defauls
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
    //
    console.log("Loading users from the database...");
    console.log("Loaded users: ", users);
    //
    console.log("Loading products from the database...");
    console.log("Loaded products: ", products);
    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));
