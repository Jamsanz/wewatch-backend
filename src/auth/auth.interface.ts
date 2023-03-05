import { Request } from "express";
import { IUser } from "src/users/users.interface";

export interface IAuth {
  email: string;
  password: string;
}

export interface RequestWithUser extends Request {
  user: IUser
}