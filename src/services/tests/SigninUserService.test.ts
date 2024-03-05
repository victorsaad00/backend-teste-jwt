import { compare, hash } from "bcryptjs";
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
    expect(result.data.message).toBe("Usuário e/ou senha inválidos.");
  });

  it("Must throw if password is not valid.", async () => {
    const credencials = {
      email: "teste@gmail.com",
      password: "123",
    };

    jest.spyOn(UserModel, "findOne").mockResolvedValueOnce({
      email: "teste@gmail.com",
      password: "wrongpassword",
    });

    const signinService = new SigninUserService();
    const result = await signinService.AuthenticateUser(credencials, {
      compare,
      UserModel,
    });

    expect(result.error).toBeTruthy();
    expect(result.data.message).toBe("Usuário e/ou senha inválidos.");
  });

  it("Must return a valid user.", async () => {
    const credencials = {
      email: "teste@gmail.com",
      password: "123",
    };

    const encryptedPasswordMock = await hash(credencials.password, 8);

    jest.spyOn(UserModel, "findOne").mockResolvedValueOnce({
      email: "teste@gmail.com",
      password: encryptedPasswordMock,
    });

    const signinService = new SigninUserService();
    const result = await signinService.AuthenticateUser(credencials, {
      compare,
      UserModel,
    });

    expect(result.error).toBeFalsy();
    expect(result.data).toHaveProperty("_id");
  });
});
