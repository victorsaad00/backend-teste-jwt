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

    const { _id, creationDate, updatedAt, lastLogin, token } = user;

    return {
      error: false,
      data: { _id, creationDate, updatedAt, lastLogin, token },
    };
  }
}
