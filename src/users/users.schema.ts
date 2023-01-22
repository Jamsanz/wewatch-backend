import { Schema } from "mongoose";
import { IUser } from "./users.interface";

export const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  profileImg: {
    type: String,
    required: false
  }
}, {timestamps: true});