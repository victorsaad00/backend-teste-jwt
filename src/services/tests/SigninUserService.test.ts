import { UserModel } from "../../models/UserModel";
import { SigninUserService } from "../SigninUserService";

describe("Sigin user service test", () => {
  it("Must return result error if user does not exists.", async () => {
    const credencials = {
      email: "teste@gmail.com",
      password: "123",
    };

    const compareMock = async () =>
      new Promise<boolean>((resolve, reject) => {
        resolve(true);
      });

    jest.spyOn(UserModel, "findOne").mockResolvedValueOnce(null);

    const signinService = new SigninUserService();
    const result = await signinService.AuthenticateUser(credencials, {
      compare: compareMock,
      UserModel,
    });

    expect(result.error).toBeTruthy();
    expect(result?.message).toBe("Usuário e/ou senha inválidos.");
  });

  it("Must throw if password is not valid.", async () => {
    const credencials = {
      email: "teste@gmail.com",
      password: "123",
    };

    const compareMock = async () =>
      new Promise<boolean>((resolve, reject) => {
        resolve(false);
      });

    jest.spyOn(UserModel, "findOne").mockResolvedValueOnce({
      password: "",
    });

    const signinService = new SigninUserService();
    const result = await signinService.AuthenticateUser(credencials, {
      compare: compareMock,
      UserModel,
    });

    expect(result.error).toBeTruthy();
    expect(result?.message).toBe("Usuário e/ou senha inválidos.");
  });

  it("Must return a valid user.", async () => {
    const date = new Date();
    const credencials = {
      email: "teste@gmail.com",
      password: "123",
    };

    const compareMock = async () =>
      new Promise<boolean>((resolve, reject) => {
        resolve(true);
      });

    jest.spyOn(UserModel, "findOne").mockResolvedValueOnce({
      _id: "mocked_id",
      creationDate: date,
      updatedAt: date,
      lastLogin: date,
      token: "token",
    });

    const signinService = new SigninUserService();
    const result = await signinService.AuthenticateUser(credencials, {
      compare: compareMock,
      UserModel,
    });

    expect(result.error).toBeFalsy();
    expect(result.message).toBeUndefined();
    expect(result.data).toHaveProperty("_id", "mocked_id");
  });
});
