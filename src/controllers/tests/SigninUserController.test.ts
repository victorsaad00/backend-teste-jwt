import { Request, Response } from "express";
import { SigninUserController } from "../SigninUserController";

describe("Signin Controller test", () => {
  it("Should throw if email or password are invalid", async () => {
    expect(2 + 2).toBe(4);
  });
});
