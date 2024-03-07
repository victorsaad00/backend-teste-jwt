import { sign } from "jsonwebtoken";
import {
  ISigninServiceArgs,
  ISigninServiceDependencies,
  IServiceUserResults,
} from "../interfaces/ServiceInterfaces";

export class SigninUserService {
  async AuthenticateUser(
    args: ISigninServiceArgs,
    deps: ISigninServiceDependencies
  ): Promise<IServiceUserResults> {
    const user = await deps.UserModel.findOne({ email: args.email });

    if (!user) {
      return {
        error: true,
        data: null,
        message: "Usuário e/ou senha inválidos.",
      };
    }

    const validatePassword = await deps.compare(args.password, user.password);

    if (!validatePassword) {
      return {
        error: true,
        data: null,
        message: "Usuário e/ou senha inválidos.",
      };
    }

    // BREAKING THE LAW
    const now = new Date();
    const newToken = sign({ id: user._id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "30m",
    });

    const updateUser = await deps.UserModel.findOneAndUpdate(
      { email: args.email },
      {
        $set: {
          updatedAt: now,
          lastLogin: now,
          token: newToken,
        },
      },
      { new: true }
    );

    if (!updateUser) {
      return {
        error: true,
        data: null,
        message: "Usuário e/ou senha inválidos.",
      };
    }

    const { _id, creationDate, updatedAt, lastLogin, token } = updateUser;

    return {
      error: false,
      data: { _id, creationDate, updatedAt, lastLogin, token },
    };
  }
}
