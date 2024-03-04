import { Request, Response } from "express";
import { SignupUserService } from "../services/SignupUserService";
import { hash } from "bcryptjs";

export class SignupUserController {
  async SignupUser(request: Request, response: Response) {
    const { name, email, password, phones } = request.body;

    const encrypt = await hash(password, 8);
    const newDate = new Date();
    const userService = new SignupUserService();

    const result = await userService.SignupUser({
      name,
      email,
      password: encrypt,
      phones,
      creation_date: newDate,
      last_login: newDate,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json({ result });
  }
}
