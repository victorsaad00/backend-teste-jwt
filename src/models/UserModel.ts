import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/UserInterface";

// MOongoDB Schema
const userSchema = new Schema<IUser>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  telefones: [{ nome: { type: String }, dddCode: { type: String } }],
});

export const UserModel = model<IUser>("User", userSchema);
