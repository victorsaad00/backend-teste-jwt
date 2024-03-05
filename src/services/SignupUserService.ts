import { IUser } from "../interfaces/UserInterface";
import { UserModel } from "../models/UserModel";

export class SignupUserService {
  async SignupUser(newUser: IUser): Promise<IUser | Error> {
    try {
      const { _id, email } = newUser;
      const verifyEmail = new RegExp(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      );

      if (!verifyEmail.test(email)) {
        return new Error("Email não está no formato correto.");
      }

      const userExists = await UserModel.find({ email: email });

      if (userExists.length > 0) {
        return new Error("Email já existente.");
      }

      const user = new UserModel(newUser);
      user._id = _id;
      await user.save();

      return user;
    } catch {
      throw new Error("Algo deu errado.");
    }
  }
}
