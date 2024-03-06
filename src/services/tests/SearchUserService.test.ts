import { UserModel } from "../../models/UserModel";
import { SearchUserService } from "../SearchUserService";

describe("Searching user service:", () => {
  it("Must return an error and a message invalid user or password.", async () => {
    const credencialsMock = {
      userId: "1",
      userTokenId: "1",
    };

    jest.spyOn(UserModel, "findById").mockResolvedValueOnce(null);

    const searchUserService = new SearchUserService();
    const result = await searchUserService.SearchUserService(
      credencialsMock.userId,
      credencialsMock.userTokenId,
      { UserModel }
    );

    expect(result.error).toBeTruthy();
    expect(result.data).toBeNull();
    expect(result?.message).toBe("Usuário e/ou senha inválidos.");
  });

  it("Must return an error and a non-authorized message.", async () => {
    const credencialsMock = {
      userId: "1",
      userTokenId: "AnyDifferentToken",
    };

    const userMock = {
      _id: "1",
    };

    jest.spyOn(UserModel, "findById").mockResolvedValueOnce(userMock);

    const searchUserService = new SearchUserService();
    const result = await searchUserService.SearchUserService(
      credencialsMock.userId,
      credencialsMock.userTokenId,
      { UserModel }
    );

    expect(result.error).toBeTruthy();
    expect(result.data).toBeNull();
    expect(result?.message).toBe("Não autorizado.");
  });

  it("Must return the proper searched user.", async () => {
    const credencialsMock = {
      userId: "1",
      userTokenId: "1",
    };

    const userMock = {
      _id: "1",
      name: "userValidData",
      email: "userValidData",
      phones: "userValidData",
      creationDate: "userValidData",
      lastLogin: "userValidData",
      token: "userValidData",
    };

    jest.spyOn(UserModel, "findById").mockResolvedValueOnce(userMock);

    const searchUserService = new SearchUserService();
    const result = await searchUserService.SearchUserService(
      credencialsMock.userId,
      credencialsMock.userTokenId,
      { UserModel }
    );

    expect(result.error).toBeFalsy();
    expect(result?.message).toBeUndefined();
    expect(result.data).toBeTruthy(); // Verify if result.data is not null
    expect(result.data).toHaveProperty("_id", "1");
  });
});
