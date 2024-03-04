import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";

const routes = Router();

routes.post("api/v1/user", new CreateUserController().CreateUser);

export { routes };
