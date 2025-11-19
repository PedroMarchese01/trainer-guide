import { Schema, model, models } from "mongoose";
import { v4 as uuid } from "uuid";

const questionSchema = new Schema(
  {
    Id: { type: String, default: () => uuid(), unique: true },

    Resolved: { type: Boolean, default: false },
    boosted: { type: Boolean, default: false },

    RequestedBy: {
      User: { type: String, required: true },
      UserId: { type: String, required: true },
    },

    RequestDate: { type: Date, default: Date.now },

    Content: {
      Text: { type: String, default: "" },
      Repository: { type: String, default: null },
      Areas:{type: Array, required: true},
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

// Função para pegar o model ou criar caso não exista
export const getQuestionModel = () => models.Question || model("Question", questionSchema);