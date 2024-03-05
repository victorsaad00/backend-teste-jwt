import { compare } from "bcryptjs";
import { UserModel } from "../models/UserModel";

export class SigninUserService {
  async AuthenticateUser(email: string, password: string) {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return new Error("Usuário e/ou senha inválidos.");
    }

    const validatePassword = await compare(password, user.password);

    if (!validatePassword) {
      return new Error("Usuário e/ou senha inválidos.");
    }

    return user;
  }
}
