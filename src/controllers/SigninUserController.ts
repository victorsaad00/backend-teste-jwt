import { Request, Response } from "express";
import { compare } from "bcryptjs";
import { UserModel } from "../models/UserModel";
import { SigninUserService } from "../services/SigninUserService";

export class SigninUserController {
  async SigninUser(request: Request, response: Response) {
    const { email, password } = request.body;

    const credencials = { email, password };
    const signInService = new SigninUserService();
    const authenticatedUser = await signInService.AuthenticateUser(
      credencials,
      {
        compare,
        UserModel,
      }
    );

    if (authenticatedUser.error) {
      return response.status(401).json(authenticatedUser.data.message);
    }

    return response.json(authenticatedUser.data);
  }
}
