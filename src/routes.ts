import { Router } from "express";
import { SignupUserController } from "./controllers/SignUpUserController";

const routes = Router();

routes.post("/api/v1/signup", new SignupUserController().SignupUser);

export { routes };
