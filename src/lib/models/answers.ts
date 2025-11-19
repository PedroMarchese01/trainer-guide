import { Schema, model, models } from "mongoose";
import { v4 as uuid } from "uuid";

// Subschema para cada mensagem do chat
const dialogItemSchema = new Schema({
  User: { type: String, required: true },
  UserId: { type: String, required: true },
  Text: { type: String, required: true },
  timeStamp: { type: Date, required: true },
});

// Schema principal da resposta
const answerSchema = new Schema(
  {
    Id: { type: String, default: () => uuid(), unique: true }, // ID da resposta
    Pergunta: { type: String, required: true }, // ID da pergunta associada
    User: { type: String, required: true }, // nome do usuário que respondeu
    UserId: { type: String, required: true }, // ID do usuário que respondeu  

    content: {
      Dialog: { type: [dialogItemSchema], default: [] }, // array de mensagens
      Drop: { type: Boolean, default: false } // indica se o usuário desistiu
    },

    Saved: { type: Boolean, default: false } // se deseja salvar nos favoritos
  },
  { timestamps: true } // createdAt e updatedAt automáticos
);

// Função para pegar ou criar o model
export const getAnswerModel = () => models.Answer || model("Answer", answerSchema);