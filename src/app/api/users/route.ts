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

// !===================================================================!
// !                     🔹 Guia Completo Route /api/users 🔹          !
// !        Explicação detalhada de GET, POST, PATCH, DELETE          !
// !===================================================================!

//? ======================================================================
// TODO: 🟦 FETCH GET - BUSCAR DADOS
//? ----------------------------------------------------------------------
// * GET serve para "pegar" informações do servidor.
// * Não precisa enviar body.
// * Chamando a rota "/api/users", o backend retorna todos os usuários em JSON.
// * Exemplo front-end:
//   fetch("/api/users", { method: "GET" })
//     .then(res => res.json())
//     .then(data => console.log(data))
// * No backend usamos getUserModel().find() para buscar todos os registros.
// * O JSON retornado vai conter todos os campos do schema, incluindo:
//     - userId, name, Age, EmailAddress, PasswordHash
//     - Security (CreatedAt, UpdatedAt, Auth2, FailedAttempts, LastLog, LastIp)
//     - Banned (Status, Type, Reason, By, Date)
//     - Infos (Questions, Answers, Rank, TrailStarted, TrailEnded, Plan)
//     - Saved
// ======================================================================

//? ======================================================================
// TODO: 🟩 FETCH POST - CRIAR NOVO USUÁRIO
//? ----------------------------------------------------------------------
// * POST cria um novo registro de usuário.
// * É obrigatório enviar os dados no body em formato JSON.
// * Body mínimo necessário:
//   {
//     "name": "João Silva",
//     "Age": 22,
//     "EmailAddress": "joao@example.com",
//     "PasswordHash": "123456"
//   }
// * Campos como userId, CreatedAt, UpdatedAt e defaults de Security/Banned/Infos/Saved
//   são preenchidos automaticamente pelo model.
// * Backend:
//   const newUser = new (getUserModel())({ name, Age, EmailAddress, PasswordHash });
//   await newUser.save();
// * Retorna o usuário criado, com todos os campos default preenchidos.
// ======================================================================

//? ======================================================================
// TODO: 🟧 FETCH PATCH - ATUALIZAR DADOS
//? ----------------------------------------------------------------------
// * PATCH atualiza apenas os campos enviados.
// * Não precisa enviar o objeto inteiro.
// * Body mínimo:
//   {
//     "userId": "ID_DO_USUARIO",
//     "update": {
//       "Age": 25,
//       "Infos.Plan": "Premium",
//       "Security.Auth2": true
//     }
//   }
// * Backend:
//   const updatedUser = await getUserModel().findByIdAndUpdate(userId, update, { new: true });
// * Retorna o objeto atualizado em JSON.
// * Você pode atualizar QUALQUER campo do schema, incluindo campos internos
//   como Security, Banned, Infos, etc.
// ======================================================================

//? ======================================================================
// TODO: 🟥 FETCH DELETE - APAGAR USUÁRIO
//? ----------------------------------------------------------------------
// * DELETE remove um usuário do banco.
// * O ID do usuário vai na URL como query param, não no body.
// * Exemplo front-end:
//   fetch("/api/users?userId=ID_DO_USUARIO", { method: "DELETE" })
// * Backend:
//   await getUserModel().findByIdAndDelete(userId);
// * Retorna mensagem de sucesso em JSON.
// ======================================================================

// * Dicas importantes:
// ! 1. Sempre usar "Content-Type: application/json" nos headers ao enviar body.
// ! 2. JSON.stringify(obj) no front para enviar o objeto.
// ! 3. res.json() no front para ler o retorno do backend.
// ! 4. GET não precisa de body, DELETE usa query params.
// * 5. O model garante validação, timestamps, UUIDs, campos default (Security, Banned, Infos, Saved).
// * 6. Esse guia usa Better Comments e emojis para cada método:
//   🟦 GET → azul
//   🟩 POST → verde
//   🟧 PATCH → laranja
//   🟥 DELETE → vermelho
// * 7. Mantendo este guia em comentários, iniciantes entendem toda a rota e o schema sem alterar o c