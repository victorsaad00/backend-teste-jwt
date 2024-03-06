// fazer conexão com o banco
import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL ?? "")
  .then(() => {
    console.log("Database connection stablished.");
  })
  .catch((error) => {
    console.log(`Error at database connection: ${error}`);
  }); //

app.listen(3000, () => console.log("server is running..."));
