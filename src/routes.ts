import { Router } from "express";
import { SignupUserController } from "./controllers/SignUpUserController";
import { SigninUserController } from "./controllers/SigninUserController";
import { SearchUserController } from "./controllers/SearchUserController";
import { AuthenticationMiddleware } from "./middlewares/AuthenticationMiddleware";

const SignUp = new SignupUserController().SignupUser;
const SignIn = new SigninUserController().SigninUser;
const SearchUser = new SearchUserController().SearchUser;

const routes = Router();

routes.post("/api/v1/signup", SignUp);
routes.post("/api/v1/signin", SignIn);
routes.get("/api/v1/searchuser/:id", AuthenticationMiddleware, SearchUser);

export { routes };
