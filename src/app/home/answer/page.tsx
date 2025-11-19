"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Question = {
  _id: string;
  userId: string;
  Resolved: boolean;
  RequestedBy: { User: string; UserId: number };
  Content: { Text: string; Repository: string | null; Areas: string[] };
  SolvedBy: { User: string } | null;
  RequestDate: string;
};

const languages = [
  { value: "", label: "Todas Perguntas" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "java", label: "Java" },
  { value: "python", label: "Python" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "scala", label: "Scala" },
  { value: "perl", label: "Perl" },
  { value: "haskell", label: "Haskell" },
  { value: "elixir", label: "Elixir" },
  { value: "erlang", label: "Erlang" },
  { value: "dart", label: "Dart" },
  { value: "r", label: "R" },
];

export default function AnswerPage() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const localS = localStorage.getItem("userLog");
    if (!localS) {
      router.push("/");
      return;
    }

    async function getQuestions() {
      try {
        const res = await fetch("/api/questions");
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error("Erro:", err);
      }
    }

    getQuestions();
  }, [router]);

  const filteredQuestions = value
    ? questions.filter((q) => q.Content?.Areas?.includes(value))
    : questions;

  return (
    <div className="text-white p-6">
      <h2 className="text-2xl">Responda Perguntas</h2>

      <ul className="flex flex-col py-4 gap-2">
        <div className="flex gap-2">
          <ArrowRight />
          <li>Para cada pergunta acertada +50 pontos!</li>
        </div>
        <div className="flex gap-2">
          <ArrowRight />
          <li>Você não perde pontos por tentar!</li>
        </div>
      </ul>

      {/* SELECT LINGUAGEM */}
      <div className="flex w-full border-b pb-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[250px] justify-between bg-transparent text-white border-white"
            >
              {value ? languages.find((lang) => lang.value === value)?.label : "Selecione a linguagem..."}
              <ChevronsUpDown />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[250px] p-0 bg-black text-white border border-gray-700">
            <Command className="bg-gray-900 text-white">
              <CommandInput
                placeholder="Search language..."
                className="h-9 bg-transparent text-white placeholder-white"
              />
              <CommandList>
                <CommandEmpty>Nenhuma linguagem encontrada.</CommandEmpty>
                <CommandGroup>
                  {languages.map((lang) => (
                    <CommandItem
                      key={lang.value}
                      value={lang.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue);
                        setOpen(false);
                      }}
                      className="cursor-pointer hover:bg-gray-800 text-white"
                    >
                      {lang.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === lang.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* LISTA DE PERGUNTAS */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Perguntas Disponíveis</h3>

        {filteredQuestions.length === 0 ? (
          <p className="text-gray-400">Nenhuma pergunta encontrada.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredQuestions.map((q) => (
              <div key={q._id} className="border border-white/20 bg-white/5 p-4 rounded-lg">
                <h4 className="text-lg font-semibold">{q.Content?.Text}</h4>

                {q.Content?.Repository && (
                  <p>
                    Repositório: {q.Content.Repository}
                  </p>
                )}

                <p className="text-sm text-gray-300 mt-1">
                  Pedido por: <span className="text-white">{q.RequestedBy?.User}</span>
                </p>

                <p
                  className={`text-sm mt-1 font-semibold ${
                    q.Resolved ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {q.Resolved ? "Resolvido" : "Pendente"}
                </p>

                <p className="text-sm mt-2 text-gray-400">
                  Linguagens: {q.Content?.Areas?.length ? q.Content.Areas.join(", ") : "Nenhuma"}
                </p>

                <Button
                  className="bg-blue-500 mt-2 hover:bg-blue-800"
                  onClick={() => router.push(`/home/answer/chat?id=${q._id}`)}
                >
                  Responder
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
