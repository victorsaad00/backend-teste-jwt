import { Router } from "express";
import { SignupUserController } from "./controllers/SignUpUserController";
import { SigninUserController } from "./controllers/SigninUserController";
import { SearchUserController } from "./controllers/SearchUserController";
import { AuthenticationMiddleware } from "./middlewares/AuthenticationMiddleware";
import { RefreshTokenController } from "./controllers/RefreshTokenController";

const SignUp = new SignupUserController().SignupUser;
const SignIn = new SigninUserController().SigninUser;
const SearchUser = new SearchUserController().SearchUser;
const RefreshToken = new RefreshTokenController().Refresh;

const routes = Router();

routes.post("/api/v1/signup", SignUp);
routes.post("/api/v1/signin", SignIn);
routes.post("/api/v1/refresh-token", RefreshToken);
routes.get("/api/v1/searchuser/:id", AuthenticationMiddleware, SearchUser);

export { routes };
