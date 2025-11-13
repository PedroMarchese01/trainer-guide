'use server';

import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import { getUserModel } from "@/lib/models/user";

async function getUser() {
  await connectMongo();
  return getUserModel();
}

// GET - retorna todos os usuários
export async function GET() {
  try {
    const User = await getUser();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST - cria um novo usuário
export async function POST(req: NextRequest) {
  try {
    const User = await getUser();
    const body = await req.json();
    const newUser = await User.create(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// PATCH - atualiza um usuário pelo userId
export async function PATCH(req: NextRequest) {
  try {
    const User = await getUser();
    const { userId, update } = await req.json();

    if (!userId) return NextResponse.json({ error: "userId não fornecido" }, { status: 400 });

    const updatedUser = await User.findOneAndUpdate({ userId }, update, { new: true });
    if (!updatedUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(updatedUser);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE - deleta um usuário pelo userId
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