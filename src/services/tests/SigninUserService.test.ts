import { SigninUserService } from "../SigninUserService";

describe("Search for an user", () => {
  it("Must throw if user is not valid.", async () => {
    const user = {
      email: "teste@gmail.com",
      password: "123",
    };

    const signinService = new SigninUserService();
    const result = await signinService.AuthenticateUser(
      user.email,
      user.password
    );

    expect(result).toBe(Error);
  });
});
