import { compare } from "bcryptjs";
import { UserModel } from "../models/UserModel";
import { IPhones } from "./PhoneInterface";

export interface ISigninResult {
  _id: string;
  creationDate: Date;
  updatedAt: Date;
  lastLogin: Date;
  token: string;
}

export interface ISignupResult {
  _id: string;
  email: string;
  creationDate: Date;
  lastLogin: Date;
  updatedAt: Date;
}

export interface ISigninServiceArgs {
  email: string;
  password: string;
}

export interface ISigninServiceDependencies {
  UserModel: typeof UserModel;
  compare: typeof compare;
}

export interface IServiceDependencies {
  UserModel: typeof UserModel;
}

export interface ISearchUserService {
  _id: string;
  name: string;
  email: string;
  phones: IPhones[];
  creationDate: Date;
  lastLogin: Date;
  token: string;
}

export interface IServiceUserResults {
  error: boolean;
  data: ISignupResult | ISearchUserService | ISigninResult | null;
  message?: string;
}
