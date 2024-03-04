import { IUser } from "../interfaces/UserInterface";
import { UserModel } from "../models/UserModel";

export class CreateUserService {
  async CreateUser(newUser: IUser): Promise<IUser> {
    // TODO: Alterar tipo da promise.
    // TODO: Verificar se já existe um email cadastrado.
    const user = new UserModel(newUser);
    await user.save();
    return user;
  }
}
