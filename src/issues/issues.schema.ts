import mongoose, { Schema } from "mongoose";
import { IUser } from "src/users/users.interface";
import { userSchema } from "src/users/users.schema";
import { UsersService } from "src/users/users.service";
import { Issue } from "./issues.interface";

const issueSchema = new Schema<Issue>(
  {
    user_id: {
      type: String,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: false,
    },
    lga: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    pollingUnit: {
      type: String,
      required: false,
    },
    media: {
      type: {
        type: String,
        required: true,
      },
      uri: {
        type: String,
        required: true,
      },
    },
    consent: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true },
);

export { issueSchema };

// {
//   "user_id": "string",
//   "title": "string",
//   "description": "string",
//   "media": {"type": "string", "uri":"string"},
//   "ward": "string",
//   "state": "string",
//   "lga": "string",
//   "pollingUnit": "string"
// }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZjZWEyY2NmMWM4Y2IzMmQ2N2YxZDUiLCJlbWFpbCI6ImphbmVAZG9lLmNvbSIsImZpcnN0TmFtZSI6IkphbmUiLCJsYXN0TmFtZSI6IkRvZSIsInBob25lIjoiMDcwMTIzNDU2NzgiLCJzdGF0ZSI6IkthZHVuYSIsIndhcmQiOiJLdWZlbmEiLCJsZ2EiOiJaYXJpYSIsInBvbGxpbmdVbml0IjoiMTgtMjMtMDAxIiwiaWF0IjoxNjc3NzY5MTQzLCJleHAiOjE3MDkzMDUxNDN9.nqIK0l0Wm176RXH288qtFMUgvAiKRNEPh0d7S0VlEf8