"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter()

  useEffect(() => {

    const localS = localStorage.getItem("userLog");

    if (!localS){
      router.push("/")
      return
    }

    const parsedLocal = JSON.parse(localS);

    async function getUsers() {
      const res = await fetch("/api/users");

      if (!res.ok) {
        console.error("Erro ao buscar usuários");
        return;
      }

      const users = await res.json();

      const foundUser = users.find((u: any) => u.Email === parsedLocal.Email);

      setUser(foundUser);
    }

    getUsers();
}, []);
console.log(user)   

  return (
    <div className="bg-[#06030f] w-full h-screen text-white flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">Bem vindo <span className="text-blue-400">{user ? user.name : "..."}</span>!</h2>
      <h3 className="py-2 text-xl">o que deseja realizar hoje?</h3>
    
    <div className="flex gap-2 pb-2">
    <Link href={"/home/trails"} >
      <Button className="bg-green-500">Ver mais Guias</Button>
    </Link>
    <Link href={"/home/questions-admin"}>
      <Button className="bg-gray-400">adiminstrar perguntas</Button>
    </Link>
    </div>


      <h3>Guias salvos:</h3>
      
    {user?.saved && user.saved.length > 0 ? (
  user.saved.map((item: { nome: string; id: string }) => (
    <div key={item.id} className="p-2 bg-white/10 rounded mb-2">
      <p className="text-white">Nome: {item.nome}</p>
      <p className="text-gray-300">ID: {item.id}</p>
    </div>))
    ) : (
    <p className="text-gray-400">Nenhum item salvo ainda.</p>
    )}
    <h3>Perguntas Ativas:</h3>

    <p className="text-gray-400">Nenhuma pergunta realizada.</p>
    </div>
  );
}