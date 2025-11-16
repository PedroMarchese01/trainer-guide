'use server';

import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import { getQuestionModel } from "@/lib/models/questions";

async function getQuestion() {
  await connectMongo();
  return getQuestionModel();
}

// GET - retorna todas as perguntas
export async function GET() {
  try {
    const Question = await getQuestion();
    const questions = await Question.find({});
    return NextResponse.json(questions);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST - cria uma nova pergunta
export async function POST(req: NextRequest) {
  try {
    const Question = await getQuestion();
    const body = await req.json();

    // Garante que Content sempre exista
    const newQuestion = await Question.create({
      RequestedBy: body.RequestedBy,
      Content: {
        Text: body.Content?.Text || "",
        Repository: body.Content?.Repository || null,
      },
    });

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// PATCH - atualiza uma pergunta pelo Id
export async function PATCH(req: NextRequest) {
  try {
    const Question = await getQuestion();
    const { Id, update } = await req.json();

    if (!Id) return NextResponse.json({ error: "Id não fornecido" }, { status: 400 });

    const updatedQuestion = await Question.findOneAndUpdate({ Id }, update, { new: true });
    if (!updatedQuestion) return NextResponse.json({ error: "Question not found" }, { status: 404 });

    return NextResponse.json(updatedQuestion);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE - deleta uma pergunta pelo Id
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const Id = url.searchParams.get("Id");

    if (!Id) return NextResponse.json({ error: "Id não fornecido" }, { status: 400 });

    const Question = await getQuestion();
    const deletedQuestion = await Question.findOneAndDelete({ Id });

    if (!deletedQuestion) return NextResponse.json({ error: "Question not found" }, { status: 404 });

    return NextResponse.json({ message: "Question deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// !===================================================================!
// !                   🔹 Guia Completo Route /api/questions 🔹       !
// !         Explicação detalhada de GET, POST, PATCH, DELETE        !
// !===================================================================!

//? ======================================================================
// TODO: 🟦 FETCH GET - BUSCAR PERGUNTAS
//? ----------------------------------------------------------------------
// * GET serve para "pegar" todas as perguntas do banco.
// * Não precisa enviar body.
// * Chamando a rota "/api/questions", o backend retorna todas as perguntas em JSON.
// * Exemplo front-end:
//   fetch("/api/questions", { method: "GET" })
//     .then(res => res.json())
//     .then(data => console.log(data))
// * Backend: usamos getQuestionModel().find() para buscar todos os registros.
// * O JSON retornado vai conter todos os campos do schema:
//     - Id, Resolved, boosted
//     - RequestedBy (User, UserId), RequestDate
//     - Content (Text, Repository)
//     - AnsweredBy (Users, Jumped, Total)
//     - SolvedBy (User, Id)
// ======================================================================

//? ======================================================================
// TODO: 🟩 FETCH POST - CRIAR NOVA PERGUNTA
//? ----------------------------------------------------------------------
// * POST cria uma nova pergunta.
// * É obrigatório enviar os dados no body em JSON.
// * Body mínimo necessário:
//   {
//     "RequestedBy": { "User": "Pedro", "UserId": 123 },
//     "Content": { "Text": "Exemplo de pergunta", "Repository": null }
//   }
// * Campos como Resolved, boosted, AnsweredBy e SolvedBy são preenchidos automaticamente pelo model.
// * Backend:
//   const newQuestion = new (getQuestionModel())({ Id, RequestedBy, Content });
//   await newQuestion.save();
// * Retorna a pergunta criada em JSON.
// ======================================================================

//? ======================================================================
// TODO: 🟧 FETCH PATCH - ATUALIZAR PERGUNTA
//? ----------------------------------------------------------------------
// * PATCH atualiza apenas os campos enviados.
// * Body mínimo:
//   {
//     "Id": 1,
//     "update": {
//       "Resolved": true,
//       "SolvedBy.User": "João"
//     }
//   }
// * Backend:
//   const updatedQuestion = await getQuestionModel().findOneAndUpdate({ Id }, update, { new: true });
// * Retorna a pergunta atualizada.
// * Pode atualizar qualquer campo do schema, incluindo campos internos como Content, AnsweredBy, SolvedBy.
// ======================================================================

//? ======================================================================
// TODO: 🟥 FETCH DELETE - APAGAR PERGUNTA
//? ----------------------------------------------------------------------
// * DELETE remove uma pergunta do banco.
// * O Id da pergunta vai na URL como query param, não no body.
// * Exemplo front-end:
//   fetch("/api/questions?Id=1", { method: "DELETE" })
// * Backend:
//   await getQuestionModel().findOneAndDelete({ Id });
// * Retorna mensagem de sucesso em JSON.
// ======================================================================

// * Dicas importantes:
// ! 1. Sempre usar "Content-Type: application/json" nos headers ao enviar body.
// ! 2. JSON.stringify(obj) no front para enviar o objeto.
// ! 3. res.json() no front para ler o retorno do backend.
// ! 4. GET não precisa de body, DELETE usa query params.
// ! 5. O model garante validação, timestamps, defaults.
// ! 6. Esse guia usa Better Comments e emojis para cada método:
//   🟦 GET → azul
//   🟩 POST → verde
//   🟧 PATCH → laranja
//   🟥 DELETE → vermelho