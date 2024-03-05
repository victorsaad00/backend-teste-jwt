import { Request, Response } from "express";
import { SignupUserService } from "../services/SignupUserService";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class SignupUserController {
  async SignupUser(request: Request, response: Response) {
    const { name, email, password, phones } = request.body;

    const newId = uuidv4();
    const encrypt = await hash(password, 8);
    const token = sign({ id: newId }, "secret", { expiresIn: "30m" }); // TODO: Ajeitar o "secret"
    const newDate = new Date();
    const userService = new SignupUserService();

    const result = await userService.SignupUser({
      _id: newId,
      name,
      email,
      password: encrypt,
      phones,
      creationDate: newDate,
      lastLogin: newDate,
      token: token,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json({ result });
  }
}
