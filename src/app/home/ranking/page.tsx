"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Ranking() {

  const [users, setUsers] = useState<any[]>([]);
  const [parsedLocal, setParsedLocal] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const localS = localStorage.getItem("userLog");

    if (!localS) {
      router.push("/");
      return;
    }

    const parsed = JSON.parse(localS);
    setParsedLocal(parsed);

    async function getUsers() {
      const res = await fetch("/api/users");
      if (!res.ok) {
        console.error("Erro ao buscar usuários");
        return;
      }

      const usersE = await res.json();
      setUsers(usersE);
    }

    getUsers();
  }, []);

  if (!parsedLocal) return <p className="text-white p-4">Carregando...</p>;

  const orderedAll = [...users]
    .filter(u => u.Infos?.points >= 0)
    .sort((a, b) => b.Infos.points - a.Infos.points);

  const top25 = orderedAll.slice(0, 25);

  const myIndex = orderedAll.findIndex(
    (u) => u.Email === parsedLocal.Email
  );

  const getRankColor = (pos: number) => {
    if (pos === 1) return "border-yellow-400 bg-yellow-500/10";
    if (pos === 2) return "border-gray-300 bg-gray-400/10";
    if (pos === 3) return "border-amber-700 bg-amber-700/10";
    return "border-blue-400";
  };

  return (
    <div className="text-white p-4 max-w-2xl mx-auto">

      <h2 className="text-3xl font-bold mb-6 text-center">
        🏆 Ranking Geral
      </h2>

      <ul className="space-y-3">
        {top25.map((u, i) => (
          <li
            key={u.Email}
            className={`
                flex items-center justify-between
                p-3 rounded-xl bg-[#1c1c1c]
                border-r-8 shadow-lg
                transition-all duration-200 hover:scale-[1.02]
                ${getRankColor(i + 1)}
            `}
          >
            <span className="font-extrabold text-lg w-10">
              #{i + 1}
            </span>

            <span className="flex-1 text-center font-medium truncate">
              {u.name}
            </span>

            <span className="font-bold">{u.Infos.points} pts</span>
          </li>
        ))}
      </ul>

      {/* Minha posição */}
      <div className="mt-10 text-center">
        <h3 className="text-xl font-semibold">Sua posição</h3>

        {myIndex === -1 ? (
          <p className="text-gray-300 mt-2">Você ainda não possui pontos.</p>
        ) : (
          <p className="mt-2 text-green-400 text-2xl font-extrabold animate-pulse">
            #{myIndex + 1}
          </p>
        )}
      </div>

    </div>
  );
}
