import {
  IServiceUserResults,
  IServiceDependencies,
} from "../interfaces/ServiceInterfaces";
import { IUser } from "../interfaces/UserInterface";
import { UserModel } from "../models/UserModel";

export class SignupUserService {
  async SignupUser(
    newUser: IUser,
    deps: IServiceDependencies
  ): Promise<IServiceUserResults> {
    const { _id, email, creationDate, lastLogin, updatedAt } = newUser;

    const validadeEmail = await deps.UserModel.find({ email: email });

    if (validadeEmail.length > 0) {
      return {
        error: true,
        data: null,
        message: "Email já existente.",
      };
    }

    const user = new UserModel(newUser);
    user._id = _id;
    await user.save();

    return {
      error: false,
      data: { _id, email, creationDate, lastLogin, updatedAt },
    };
  }
}
