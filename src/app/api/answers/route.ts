'use server';

import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import { getAnswerModel } from "@/lib/models/answers";

// Função para pegar o model conectado ao MongoDB
async function getAnswer() {
  await connectMongo();
  return getAnswerModel();
}

// ===================== GET =====================
// GET - retorna todas as respostas
export async function GET() {
  try {
    const Answer = await getAnswer();
    const answers = await Answer.find({});
    return NextResponse.json(answers);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ===================== POST =====================
// POST - cria uma nova resposta
export async function POST(req: NextRequest) {
  try {
    const Answer = await getAnswer();
    const body = await req.json();
    const newAnswer = await Answer.create(body);
    return NextResponse.json(newAnswer, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// ===================== PATCH =====================
// PATCH - atualiza uma resposta pelo Id
export async function PATCH(req: NextRequest) {
  try {
    const Answer = await getAnswer();
    const { Id, update } = await req.json();

    if (!Id) return NextResponse.json({ error: "Id não fornecido" }, { status: 400 });

    const updatedAnswer = await Answer.findOneAndUpdate({ Id }, update, { new: true });
    if (!updatedAnswer) return NextResponse.json({ error: "Answer not found" }, { status: 404 });

    return NextResponse.json(updatedAnswer);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// ===================== DELETE =====================
// DELETE - deleta uma resposta pelo Id
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const Id = url.searchParams.get("Id");

    if (!Id) return NextResponse.json({ error: "Id não fornecido" }, { status: 400 });

    const Answer = await getAnswer();
    const deletedAnswer = await Answer.findOneAndDelete({ Id });

    if (!deletedAnswer) return NextResponse.json({ error: "Answer not found" }, { status: 404 });

    return NextResponse.json({ message: "Answer deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/* =========================================================
   🔹 Guia Completo Route /api/answers 🔹
   Explicação detalhada de GET, POST, PATCH, DELETE
============================================================ */

/* ======================================================================
🟦 GET - BUSCAR TODAS AS RESPOSTAS
* GET retorna todas as respostas do banco.
* Não precisa enviar body.
* Front-end exemplo:
  fetch("/api/answers", { method: "GET" })
    .then(res => res.json())
    .then(data => console.log(data))
* Backend: Answer.find({})
* Retorna JSON com campos:
    - Id, Pergunta, User, UserId
    - content.Dialog (User, UserId, Text, timeStamp)
    - content.Drop
    - Saved
====================================================================== */

/* ======================================================================
🟩 POST - CRIAR NOVA RESPOSTA
* POST cria uma nova resposta.
* Body mínimo:
  {
    "Pergunta": "ID_DA_PERGUNTA",
    "User": "Pedro",
    "UserId": 32,
    "content": {
      "Dialog": [
        { "User": "Pedro", "UserId": 32, "Text": "Oi", "timeStamp": "2025-11-16T18:00:00Z" }
      ],
      "Drop": false
    },
    "Saved": false
  }
* Backend: Answer.create(body)
* Campos como Id e timestamps são preenchidos automaticamente.
====================================================================== */

/* ======================================================================
🟧 PATCH - ATUALIZAR RESPOSTA
* PATCH atualiza apenas campos enviados.
* Body mínimo:
  {
    "Id": "ID_DA_RESPOSTA",
    "update": {
      "content.Drop": true,
      "Saved": true,
      "content.Dialog": [...novo array de dialog]
    }
  }
* Backend: Answer.findOneAndUpdate({ Id }, update, { new: true })
* Retorna objeto atualizado.
====================================================================== */

/* ======================================================================
🟥 DELETE - DELETAR RESPOSTA
* DELETE remove uma resposta pelo Id.
* O Id vai como query param, não no body:
  fetch("/api/answers?Id=ID_DA_RESPOSTA", { method: "DELETE" })
* Backend: Answer.findOneAndDelete({ Id })
* Retorna mensagem de sucesso.
====================================================================== */

/* Dicas importantes:
1. Sempre usar "Content-Type: application/json" nos headers.
2. JSON.stringify(obj) no front para enviar o body.
3. res.json() no front para ler retorno do backend.
4. GET não precisa de body, DELETE usa query params.
5. O model garante validação, timestamps, UUIDs e defaults.
6. Melhor manter comentários como guia para iniciantes.
7. Emojis para cada método:
   🟦 GET → azul
   🟩 POST → verde
   🟧 PATCH → laranja
   🟥 DELETE → vermelho
*/