import { Request, Response } from "express";
import { SigninUserService } from "../services/SigninUserService";

export class SigninUserController {
  async SigninUser(request: Request, response: Response) {
    const { email, password } = request.body;

    const signInService = new SigninUserService();
    const authenticatedUser = await signInService.AuthenticateUser(
      email,
      password
    );

    if (authenticatedUser instanceof Error) {
      return response.status(401).json(authenticatedUser.message);
    }

    return response.json(authenticatedUser);
  }
}
