import { Schema } from "mongoose";
import { IPhones } from "../interfaces/PhoneInterface";

export const phoneSchema = new Schema<IPhones>(
  {
    phoneNumber: { type: String },
    dddCode: { type: String },
  },
  { _id: false }
);
