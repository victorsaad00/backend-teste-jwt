import { Router } from "express";
import { SignupUserController } from "./controllers/SignUpUserController";
import { SigninUserController } from "./controllers/SigninUserController";

const routes = Router();

routes.post("/api/v1/signup", new SignupUserController().SignupUser);
routes.post("/api/v1/signin", new SigninUserController().SigninUser);
//TODO: routes.get("/api/v1/searchUser", new SigninUserController().SigninUser);

export { routes };
