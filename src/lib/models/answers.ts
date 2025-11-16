import { Schema, model, models } from "mongoose";
import { v4 as uuid } from "uuid";

const answerSchema = new Schema(
  {
    Id: { type: String, default: () => uuid(), unique: true }, // ID da resposta

    Pergunta: { type: String, required: true }, // ID da pergunta associada
    User: { type: String, required: true }, // nome do usuário que respondeu
    UserId: { type: Number, required: true }, // ID do usuário que respondeu

    content: {
      Dialog: [
        {
          User: { type: String, required: true },
          UserId: { type: Number, required: true },
          Text: { type: String, required: true },
          timeStamp: { type: Date, default: Date.now } // data e hora do envio
        }
      ],
      Drop: { type: Boolean, default: false } // indica se o usuário desistiu
    },

    Saved: { type: Boolean, default: false } // se deseja salvar nos favoritos
  },
  { timestamps: true } // createdAt e updatedAt automáticos
);

// Função para pegar ou criar o model
export const getAnswerModel = () => models.Answer || model("Answer", answerSchema);