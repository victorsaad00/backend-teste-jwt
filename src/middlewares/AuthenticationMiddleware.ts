import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export const AuthenticationMiddleware = (
  request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      error: "Não autorizado 1.",
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const verifyToken = verify(token, "secret"); //TODO: Alterar no .env

    const { id } = verifyToken as TokenPayload;

    request.userTokenId = id;
    nextFunction();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return response.status(401).json({ error: "Sessão inválida." });
    }
    return response.status(401).json({ error: "Não autorizado 2." });
  }
};
