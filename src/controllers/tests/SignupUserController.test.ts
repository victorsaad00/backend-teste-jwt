import { Request, Response } from "express";
import { IServiceUserResults } from "../../interfaces/ServiceInterfaces";
import { SignupUserService } from "../../services/SignupUserService";
import { SignupUserController } from "../SignUpUserController";

describe("Signup user controller test:", () => {
  it("Must return a response status 401 with a json message when service result has an error.", async () => {
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

    const SignupServiceUserResultsMock = async () =>
      new Promise<IServiceUserResults>((resolve, reject) => {
        resolve({
          error: true,
          data: null,
          message: "Email já existente.",
        });
      });

    jest
      .spyOn(SignupUserService.prototype, "SignupUser")
      .mockImplementationOnce(SignupServiceUserResultsMock);

    const signupController = new SignupUserController();
    await signupController.SignupUser(
      mockRequest,
      mockResponse as unknown as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.status().json).toHaveBeenCalledWith(
      "Email já existente."
    );
  });

  it("Must return the proper searched user.", async () => {
    const newDate = new Date();
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

    const SignupServiceUserResultsMock = async () =>
      new Promise<IServiceUserResults>((resolve, reject) => {
        resolve({
          error: false,
          data: {
            _id: "newId",
            email: "jett@valorant.com",
            creationDate: newDate,
            lastLogin: newDate,
            updatedAt: newDate,
            token: "token",
          },
        });
      });

    jest
      .spyOn(SignupUserService.prototype, "SignupUser")
      .mockImplementationOnce(SignupServiceUserResultsMock);

    const signupController = new SignupUserController();
    await signupController.SignupUser(
      mockRequest,
      mockResponse as unknown as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().json).toHaveBeenCalledWith({
      _id: "newId",
      email: "jett@valorant.com",
      creationDate: newDate,
      lastLogin: newDate,
      updatedAt: newDate,
      token: "token",
    });
  });
});
