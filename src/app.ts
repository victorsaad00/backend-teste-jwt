// fazer conexão com o banco
import mongoose from "mongoose";
import { Server } from "./server";

mongoose
  .connect("mongodb://127.0.0.1:27017/backenddgo")
  .then(() => {
    console.log("Database connection stablished.");
    Server();
  })
  .catch((error) => {
    console.log(`Error at database connection: ${error}`);
  }); //
