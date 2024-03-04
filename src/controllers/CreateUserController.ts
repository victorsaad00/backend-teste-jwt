import { Request, Response } from "express";
import { IUser } from "../interfaces/UserInterface";
import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController {
  async CreateUser(request: Request, response: Response) {
    const { nome, email, senha, telefones }: IUser = request.body;
    const userService = new CreateUserService();

    const result = await userService.CreateUser({
      nome,
      email,
      senha,
      telefones,
    });

    return response.json(result); // TODO: Alterar depois
  }
}
