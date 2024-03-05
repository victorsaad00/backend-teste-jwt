import { Request, Response } from "express";
import { SearchUserService } from "../services/SearchUserService";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserModel } from "../models/UserModel";

export class SearchUserController {
  async SearchUser(request: Request, response: Response) {
    const {email} request.body
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return new Error("Usuário e/ou senha inválidos.");
    }

    const validatePassword = await compare(password, user.password);

    if (!validatePassword) {
      return new Error("Usuário e/ou senha inválidos.");
    }

    const { _id, creationDate, updatedAt, lastLogin, token } = user;
    return { _id, creationDate, updatedAt, lastLogin, token };
  }
}
