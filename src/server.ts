import express from "express";
import { routes } from "./routes";

export const Server = () => {
  const app = express();
  const port = 3000; // TODO: Colocar no .env

  app.use(express.json());
  app.use(routes);

  app.listen(port, () => console.log("server is running..."));
};