import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/UserInterface";

// MOongoDB Schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phones: [{ phoneNumber: { type: String }, dddCode: { type: String } }],
  creation_date: { type: Date },
  updated_at: { type: Date },
  last_login: { type: Date },
});

export const UserModel = model<IUser>("User", userSchema);
