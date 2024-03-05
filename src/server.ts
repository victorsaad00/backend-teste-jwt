// fazer conexão com o banco
import mongoose from "mongoose";
import { app } from "./app";
const port = 3000;
mongoose
  .connect("mongodb://127.0.0.1:27017/backenddgo") //TODO: Verificar como fazer pelo .env
  .then(() => {
    console.log("Database connection stablished.");
  })
  .catch((error) => {
    console.log(`Error at database connection: ${error}`);
  }); //

app.listen(port, () => console.log("server is running..."));
