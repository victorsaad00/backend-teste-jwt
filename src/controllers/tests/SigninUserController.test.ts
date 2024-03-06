import { Request, Response } from "express";
import { IServiceUserResults } from "../../interfaces/ServiceInterfaces";
import { SigninUserController } from "../SigninUserController";
import { SigninUserService } from "../../services/SigninUserService";

describe("Signin user controller test:", () => {
  it("Must return a response status 401 with a json message.", async () => {
    const mockRequest = {
      body: {
        name: "Jett",
        email: "jett@valorant.com",
        password: "jett123",
        phones: [{ phoneNumber: "12345678", dddCode: "81" }],
      },
    } as Request;

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const SigninServiceUserResultsMock = async () =>
      new Promise<IServiceUserResults>((resolve, reject) => {
        resolve({
          error: true,
          data: null,
          message: "Email já existente.",
        });
      });

    jest
      .spyOn(SigninUserService.prototype, "AuthenticateUser")
      .mockImplementationOnce(SigninServiceUserResultsMock);

    const userController = new SigninUserController();
    await userController.SigninUser(
      mockRequest,
      mockResponse as unknown as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.status().json).toHaveBeenCalledWith(
      "Email já existente."
    );
  });

  it("Must return the proper searched user.", async () => {
    const date = new Date();
    const mockRequest = {
      body: {
        name: "Jett",
        email: "jett@valorant.com",
        password: "jett123",
        phones: [{ phoneNumber: "12345678", dddCode: "81" }],
      },
    } as Request;

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const SigninServiceUserResultsMock = async () =>
      new Promise<IServiceUserResults>((resolve, reject) => {
        resolve({
          error: false,
          data: {
            _id: "userid",
            creationDate: date,
            updatedAt: date,
            lastLogin: date,
            token: "usertoken",
          },
        });
      });

    jest
      .spyOn(SigninUserService.prototype, "AuthenticateUser")
      .mockImplementationOnce(SigninServiceUserResultsMock);

    const userController = new SigninUserController();
    await userController.SigninUser(
      mockRequest,
      mockResponse as unknown as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().json).toHaveBeenCalledWith({
      _id: "userid",
      creationDate: date,
      updatedAt: date,
      lastLogin: date,
      token: "usertoken",
    });
  });
});
