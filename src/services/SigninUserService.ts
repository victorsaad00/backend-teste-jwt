import { compare } from "bcryptjs";
import { UserModel } from "../models/UserModel";
import { ISigninUser } from "../interfaces/SigninUserInterface";

export class SigninUserService {
  async AuthenticateUser(
    email: string,
    password: string
  ): Promise<Error | ISigninUser> {
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
