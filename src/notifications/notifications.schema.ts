import { Schema } from "mongoose";

export const notificationSchema = new Schema(
  {
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    data: {
      type: {},
      required: false,
    },
    trigger: {
      type: { date: Date },
      required: false,
    },
    identifier: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);
