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

