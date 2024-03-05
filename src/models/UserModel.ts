import { model } from "mongoose";
import { IUser } from "../interfaces/UserInterface";
import { userSchema } from "../schemas/UserSchema";

export const UserModel = model<IUser>("User", userSchema);
