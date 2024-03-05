import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

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
      error: "Não autorizado.",
    });
  }

  console.log(authorization);
  const [, token] = authorization.split(" ");

  try {
    const verifyToken = verify(token, "secret"); //TODO: Alterar no .env
    console.log(verifyToken);

    const { id } = verifyToken as TokenPayload;

    request.userId = id;
    nextFunction();
  } catch (error) {
    return response.status(401).json({ error: "Não autorizado." });
  }
};
