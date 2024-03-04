import { IUser } from "../interfaces/UserInterface";
import { UserModel } from "../models/UserModel";

export class SignupUserService {
  async SignupUser(newUser: IUser): Promise<IUser | Error> {
    const verifyEmail = new RegExp(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
    if (!verifyEmail.test(newUser.email)) {
      return new Error("Email não está no formato correto.");
    }

    if (await UserModel.find({ email: newUser.email })) {
      return new Error("Email já existente.");
    }

    const user = new UserModel(newUser);
    await user.save();
    return user;
  }
}
