import { Schema, model, models } from "mongoose";

const questionSchema = new Schema(
  {
    Id: { type: Number, required: true, unique: true },
    Resolved: { type: Boolean, default: false },
    boosted: { type: Boolean, default: false },
    RequestedBy: {
      User: { type: String, required: true },
      UserId: { type: Number, required: true },
    },
    RequestDate: { type: Date, default: Date.now },
    Content: {
      Text: { type: String, default: "" },
      Repository: { type: String, default: null },
    },
    AnsweredBy: {
      Users: { type: [String], default: [] },
      Jumped: { type: Number, default: 0 },
      Total: { type: Number, default: 0 },
    },
    SolvedBy: {
      User: { type: String, default: "não solucionada" },
      Id: { type: String, default: "Não solucionada" },
    },
  },
  { timestamps: true }
);

export const getQuestionModel = () => models.Question || model("Question", questionSchema);