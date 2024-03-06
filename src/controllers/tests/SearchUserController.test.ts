import { Request, Response } from "express";
import { SearchUserController } from "../SearchUserController";
import { SearchUserService } from "../../services/SearchUserService";
import { IServiceUserResults } from "../../interfaces/ServiceInterfaces";

describe("Search user controller test:", () => {
  it("Must return a response status 401 with a json message when userTokenId is undefined.", async () => {
    const mockRequest = {
      params: {
        id: "userId",
      },
      body: {
        userTokenId: undefined,
      },
    } as unknown as Request;

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const searchUserController = new SearchUserController();
    await searchUserController.SearchUser(
      mockRequest,
      mockResponse as unknown as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.status().json).toHaveBeenCalledWith({
      message: "Não autorizado.",
    });
  });

  it("Must return a response status 401 with a json message when userId is undefined.", async () => {
    const mockRequest = {
      params: { id: undefined },
      body: {
        userTokenId: "userTokenId",
      },
    } as unknown as Request;

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const searchUserController = new SearchUserController();
    await searchUserController.SearchUser(
      mockRequest,
      mockResponse as unknown as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.status().json).toHaveBeenCalledWith({
      message: "Não autorizado.",
    });
  });

  it("Must return a response status 401 with a json message when SearchUserService returns an error.", async () => {
    const mockRequest = {
      params: {
        id: "userId",
      },
      body: {
        userTokenId: "userId",
      },
    } as unknown as Request;

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const SearchUserServiceResultsMock = async () =>
      new Promise<IServiceUserResults>((resolve, reject) => {
        resolve({
          error: true,
          data: null,
          message: "",
        });
      });

    jest
      .spyOn(SearchUserService.prototype, "SearchUserService")
      .mockImplementationOnce(SearchUserServiceResultsMock);

    const searchUserController = new SearchUserController();
    await searchUserController.SearchUser(
      mockRequest,
      mockResponse as unknown as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.status().json).toHaveBeenCalledWith("");
  });

  it("Must return a response status 200 and an user.", async () => {
    const date = new Date();
    const mockRequest = {
      params: {
        id: "userId",
      },
      body: {
        userTokenId: "userId",
      },
    } as unknown as Request;

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const SearchUserServiceResultsMock = async () =>
      new Promise<IServiceUserResults>((resolve, reject) => {
        resolve({
          error: false,
          data: {
            _id: "userId",
            name: "ame",
            email: "email",
            phones: [],
            creationDate: date,
            lastLogin: date,
            token: "userToken",
          },
        });
      });

    jest
      .spyOn(SearchUserService.prototype, "SearchUserService")
      .mockImplementationOnce(SearchUserServiceResultsMock);

    const searchUserController = new SearchUserController();
    await searchUserController.SearchUser(
      mockRequest,
      mockResponse as unknown as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().json).toHaveBeenCalledWith({
      _id: "userId",
      name: "ame",
      email: "email",
      phones: [],
      creationDate: date,
      lastLogin: date,
      token: "userToken",
    });
  });
});
