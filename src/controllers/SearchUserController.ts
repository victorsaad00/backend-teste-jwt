import { Request, Response } from "express";
import { SearchUserService } from "../services/SearchUserService";

export class SearchUserController {
  async SearchUser(request: Request, response: Response) {
    const userId = request.params.id;
    const userTokenId = request.userTokenId;

    const searchUserService = new SearchUserService();
    const authenticatedUser = await searchUserService.SearchUserService(
      userId,
      userTokenId
    );

    if (authenticatedUser instanceof Error) {
      return response.status(401).json(authenticatedUser.message);
    }
    return response.json(authenticatedUser);
  }
}
