import { IUser } from "../interfaces/UserInterface";
import { UserModel } from "../models/UserModel";

type dependencies = {
  UserModel: typeof UserModel;
};

type result = {
  error: boolean;
  data: any;
};

export class SignupUserService {
  async SignupUser(newUser: IUser, deps: dependencies): Promise<result> {
    const { _id, email, creationDate, lastLogin, updatedAt } = newUser;

    const validadeEmail = await deps.UserModel.find({ email: email });

    if (validadeEmail.length > 0) {
      const result = {
        error: true,
        data: { message: "Email já existente." },
      };
      return result;
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
