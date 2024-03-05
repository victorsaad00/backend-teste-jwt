import { Schema } from "mongoose";
import { IUser } from "../interfaces/UserInterface";
import { phoneSchema } from "../schemas/PhoneSchema";
import { v4 as uuidv4 } from "uuid";

// MOongoDB Schema
export const userSchema = new Schema<IUser>({
  _id: { type: String, default: uuidv4() },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phones: [phoneSchema],
  creationDate: { type: Date },
  updatedAt: { type: Date },
  lastLogin: { type: Date },
  token: { type: String },
});
