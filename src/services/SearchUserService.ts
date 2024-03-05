import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserModel } from "../models/UserModel";

export class SearchUserService {
  async SearchUserService(userId: string, userTokenId: string) {
    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        return new Error("Usuário e/ou senha inválidos");
      }

      const { _id } = user;

      if (_id !== userTokenId) {
        return new Error("Não autorizado 3.");
      }

      const { name, email, phones, creationDate, lastLogin, token } = user;
      return { _id, name, email, phones, creationDate, lastLogin, token };
    } catch (error) {
      return new Error("Algo deu errado.");
    }
  }
}
