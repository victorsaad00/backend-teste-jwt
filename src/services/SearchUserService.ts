import {
  IServiceDependencies,
  IServiceUserResults,
} from "../interfaces/ServiceInterfaces";

export class SearchUserService {
  async SearchUserService(
    userId: string,
    userTokenId: string,
    deps: IServiceDependencies
  ): Promise<IServiceUserResults> {
    const user = await deps.UserModel.findById(userId);

    if (!user) {
      return {
        error: true,
        data: null,
        message: "Usuário não encontrado.",
      };
    }

    const { _id } = user;

    if (_id !== userTokenId) {
      return {
        error: true,
        data: null,
        message: "Não autorizado.",
      };
    }

    const { name, email, phones, creationDate, lastLogin, token } = user;

    return {
      error: false,
      data: { _id, name, email, phones, creationDate, lastLogin, token },
    };
  }
}
