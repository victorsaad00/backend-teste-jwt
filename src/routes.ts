import { Router } from "express";
import { SignupUserController } from "./controllers/SignUpUserController";
import { SigninUserController } from "./controllers/SigninUserController";
import { SearchUserController } from "./controllers/SearchUserController";
import { AuthenticationMiddleware } from "./middlewares/AuthenticationMiddleware";

const routes = Router();

routes.post("/api/v1/signup", new SignupUserController().SignupUser);
routes.post("/api/v1/signin", new SigninUserController().SigninUser);
routes.get(
  "/api/v1/searchUser",
  AuthenticationMiddleware,
  new SearchUserController().SearchUser
);

export { routes };
