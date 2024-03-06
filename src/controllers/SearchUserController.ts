import { Request, Response } from "express";
import { SearchUserService } from "../services/SearchUserService";
import { UserModel } from "../models/UserModel";

export class SearchUserController {
  async SearchUser(request: Request, response: Response) {
    const userId = request.params.id;
    const userTokenId: string = request.body.userTokenId;

    if (!userTokenId) {
      return response.status(401).json({ message: "Não autorizado." });
    }

    if (!userId) {
      return response.status(401).json({ message: "Não autorizado." });
    }

    const searchUserService = new SearchUserService();
    const authenticatedUser = await searchUserService.SearchUserService(
      userId,
      userTokenId,
      { UserModel }
    );

    if (authenticatedUser.error) {
      return response.status(401).json(authenticatedUser.message);
    }
    return response.json(authenticatedUser.data);
  }
}
