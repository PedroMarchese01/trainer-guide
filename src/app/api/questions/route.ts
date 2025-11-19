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

    // LOG para debug
    console.log("RECEBIDO NO POST:", body);

    // Corrigido → agora Content.Areas é incluído corretamente
    const newQuestion = await Question.create({
      RequestedBy: body.RequestedBy,

      Content: {
        Text: body.Content?.Text || "",
        Repository: body.Content?.Repository || null,
        Areas: Array.isArray(body.Content?.Areas) 
          ? body.Content.Areas 
          : [], // garante array sempre
      },
    });

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (err: any) {
    console.error("ERRO NO POST:", err);
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