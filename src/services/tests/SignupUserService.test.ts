import { UserModel } from "../../models/UserModel";
import { SignupUserService } from "../SignupUserService";

describe("Signup User service:", () => {
  it("Should not be able to create a new user.", async () => {
    const newDate = new Date();

    const mockedUser = {
      _id: "newId",
      name: "fulano de tals",
      email: "teste@gmail.com",
      password: "123",
      phones: [{ phoneNumber: "98999999", dddCode: "00" }],
      creationDate: newDate,
      lastLogin: newDate,
      updatedAt: newDate,
      token: "token",
    };

    jest
      .spyOn(UserModel, "find")
      .mockResolvedValueOnce([{ email: mockedUser.email }]);

    const signupService = new SignupUserService();
    const result = await signupService.SignupUser(mockedUser, { UserModel });

    expect(result.error).toBeTruthy();
    expect(result.data).toBeNull();
    expect(result?.message).toBe("Email já existente.");
  });

  it("Should be able to create a new user.", async () => {
    const newDate = new Date();

    const mockedUser = {
      _id: "newId",
      name: "fulano de tals",
      email: "teste@gmail.com",
      password: "123",
      phones: [{ phoneNumber: "98999999", dddCode: "00" }],
      creationDate: newDate,
      lastLogin: newDate,
      updatedAt: newDate,
      token: "token",
    };

    jest.spyOn(UserModel, "find").mockResolvedValueOnce([]);
    jest.spyOn(UserModel.prototype, "save").mockImplementationOnce(() => {
      return true;
    });

    const signupService = new SignupUserService();
    const result = await signupService.SignupUser(mockedUser, { UserModel });

    const { _id, email, creationDate, lastLogin, updatedAt, token } =
      mockedUser;

    expect(result.error).toBeFalsy();
    expect(result.data).toBeTruthy(); // Verify if result.data is not null
    expect(result.data).toEqual({
      _id,
      email,
      creationDate,
      lastLogin,
      updatedAt,
      token,
    });
  });
});
