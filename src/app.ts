// fazer conexão com o banco
import mongoose from "mongoose";
import { Server } from "./server";

mongoose
  .connect("COONECTION STRING")
  .then(() => {
    console.log("Database connection stablished.");
    Server();
  })
  .catch((error) => {
    console.log(`Error at database connection: ${error}`);
  }); //
