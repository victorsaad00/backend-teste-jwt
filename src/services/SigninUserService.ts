import { compare } from "bcryptjs";
import type { UserModel } from "../models/UserModel";

type args = {
  email: string;
  password: string;
};

type dependencies = {
  UserModel: typeof UserModel;
  compare: typeof compare;
};

type result = {
  error: boolean;
  data: any;
};

export class SigninUserService {
  async AuthenticateUser(args: args, deps: dependencies): Promise<result> {
    const user = await deps.UserModel.findOne({ email: args.email });

    if (!user) {
      const result = {
        error: true,
        data: { message: "Usuário e/ou senha inválidos." },
      };
      return result;
    }

    const validatePassword = await deps.compare(args.password, user.password);

    if (!validatePassword) {
      const result = {
        error: true,
        data: { message: "Usuário e/ou senha inválidos." },
      };
      return result;
    }

    const { _id, creationDate, updatedAt, lastLogin, token } = user;

    const result = {
      error: false,
      data: { _id, creationDate, updatedAt, lastLogin, token },
    };
    return result;
  }
}
