import { Request, Response } from "express";

export class RefreshTokenController {
  async Refresh(request: Request, response: Response) {
    return response.status(200).json("Âloha");
  }
}
