'use server';

import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import { getUserModel } from "@/lib/models/user";

// Função para garantir conexão e retornar o modelo User
async function getUser() {
  await connectMongo();
  return getUserModel();
}

// ===================== GET =====================
export async function GET() {
  try {
    const User = await getUser();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ===================== POST =====================
export async function POST(req: NextRequest) {
  try {
    const User = await getUser();
    const body = await req.json();

    // Normaliza o email
    const email = (body.Email || body.email || "").trim().toLowerCase();
    if (!email) return NextResponse.json({ error: "Email não fornecido" }, { status: 400 });

    // Verifica duplicidade
    const existingUser = await User.findOne({ Email: email });
    if (existingUser) {
      return NextResponse.json({ error: "Esse email já está cadastrado!" }, { status: 400 });
    }

    // Cria usuário
    const newUser = await User.create({
      ...body,
      Email: email,
      password: body.password // garante campo minúsculo consistente
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (err: any) {
    console.error("Erro ao criar usuário:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ===================== PATCH =====================
export async function PATCH(req: NextRequest) {
  try {
    const User = await getUser();
    const { userId, update } = await req.json();

    if (!userId) return NextResponse.json({ error: "userId não fornecido" }, { status: 400 });

    const updatedUser = await User.findOneAndUpdate({ userId }, update, { new: true });

    if (!updatedUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(updatedUser);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ===================== DELETE =====================
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) return NextResponse.json({ error: "userId não fornecido" }, { status: 400 });

    const User = await getUser();
    const deletedUser = await User.findOneAndDelete({ userId });

    if (!deletedUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ message: "User deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
