import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import { user as User } from "../../../lib/models/user";

// Função para conectar ao MongoDB
async function dbConnect() {
  await connectMongo();
}

// GET - retorna todos os usuários
export async function GET() {
  await dbConnect();
  const users = await User.find({});
  return NextResponse.json(users);
}

// POST - cria um novo usuário
export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  try {
    const newUser = await User.create(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// PATCH - atualiza um usuário pelo userId
export async function PATCH(req: NextRequest) {
  await dbConnect();
  const { userId, update } = await req.json();

  try {
    const updatedUser = await User.findOneAndUpdate({ userId }, update, { new: true });
    if (!updatedUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(updatedUser);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE - deleta um usuário pelo userId
export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { userId } = await req.json();

  try {
    const deletedUser = await User.findOneAndDelete({ userId });
    if (!deletedUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ message: "User deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}