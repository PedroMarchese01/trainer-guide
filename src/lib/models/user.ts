import { Schema, model, models } from "mongoose";
import { v4 as uuid } from "uuid";

const userSchema = new Schema(
  {
    userId: { type: String, default: () => uuid(), unique: true },
    name: { type: String, required: true },
    Age: { type: Number, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true, },
    Security: {
      CreatedAt: { type: Date, default: Date.now ,},
      UpdatedAt: { type: Date },
      Auth2: { type: Boolean, default: false },
      FailedAttempts: { type: Number, default: 0 },
    },
    Banned: {
      Status: { type: Boolean, default: false },
      Type: { type: Schema.Types.Mixed, default: null },
      Reason: { type: String, default: null },
      By: { type: String, default: null },
      Date: { type: Date, default: null },
    },
    Infos: {
      Questions: { type: Number, default: 0 },
      Answers: { type: Number, default: 0 },
      Rank: { type: String, default: "no rank" },
      TrailStarted: { type: [String], default: [] },
      TrailEnded: { type: [String], default: [] },
      Plan: { type: String, default: "Free" },
    },
    Saved: { type: [String], default: [] },
  },
  { timestamps: true }
);


export const getUserModel = () => models.User || model("User", userSchema);
