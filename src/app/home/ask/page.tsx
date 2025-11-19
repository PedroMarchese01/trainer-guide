"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const languages = [
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

export default function Ask() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [selectedLangs, setSelectedLangs] = useState<string[]>([])
  const[repository, setRepository] = useState("")
  const[text, setText] = useState("")

  useEffect(() => {
    const localS = localStorage.getItem("userLog");
    if (!localS) router.push("/");
  }, [])

  function addLanguage() {
    if (!value) return;
    if (!selectedLangs.includes(value)) {
      setSelectedLangs([...selectedLangs, value]);
    }
  }

  function removeLanguage(lang: string) {
    setSelectedLangs(selectedLangs.filter(item => item !== lang))
  }



  async function createPergunta() {
  try {
    // Verifica se há usuário logado no localStorage
    const rawUser = localStorage.getItem("userLog");
    if (!rawUser) {
      alert("Você precisa estar logado!");
      router.push("/");
      return;
    }

    const user = JSON.parse(rawUser);

    // Validações básicas
    if (!text.trim()) {
      toast.error("Por favor, escreva sua pergunta.");
      return;
    }

    if (selectedLangs.length === 0) {
      toast.error("Selecione pelo menos uma linguagem.");
      return;
    }

    // Monta o objeto de envio
    const body = {
      RequestedBy: {
        User: user.name,
        UserId: user._id
      },
      Content: {
        Text: text,
        Repository: repository || null,
        Areas: selectedLangs
      }
    };

    // Envia ao backend
    const res = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Erro ao criar pergunta:", data);
      toast.error("Erro ao criar pergunta!");
      return;
    }

    // Sucesso
    toast.success("Pergunta enviada com sucesso!");

    // Resetar campos
    setText("");
    setRepository("");
    setSelectedLangs([]);
    setValue(""); // reset no combobox

  } catch (err) {
    console.error("Erro inesperado:", err);
    toast.error("Erro inesperado ao criar pergunta.");
  }
}

  return (
    <div className="text-white space-y-5">
      <h2 className="text-2xl">Realize sua pergunta!</h2>

      <Input placeholder="Coloque seu repositório (github) opcional!" onChange={(e) => setRepository(e.target.value)} />
      <Textarea placeholder="Escreva detalhadamente o problema aqui!" onChange={(e) => setText(e.target.value)} />

      {/* Combobox */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[250px] justify-between bg-transparent text-white border-white"
          >
            {value
              ? languages.find((lang) => lang.value === value)?.label
              : "Selecione a linguagem..."}
            <ChevronsUpDown className="" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[250px] p-0 bg-black text-white border border-gray-700">
          <Command className="bg-gray-900 text-white">
            <CommandInput
              placeholder="Search language..."
              className="h-9 bg-tranparent text-white placeholder-white"
            />
            <CommandList>
              <CommandEmpty>Nenhuma linguagem encontrada.</CommandEmpty>
              <CommandGroup>
                {languages.map((lang) => (
                  <CommandItem
                    key={lang.value}
                    value={lang.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue)
                      setOpen(false)
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

      {/* Botão para adicionar linguagem */}
      <div className="flex-wrap">
      <Button onClick={addLanguage} className="bg-blue-600 hover:bg-blue-700 mr-4 ">
        Adicionar linguagem
      </Button>
      <Button onClick={() => createPergunta()}>Enviar pergunta</Button>
      </div>

      {/* Lista das linguagens escolhidas */}
      <div className="space-y-2">
        {selectedLangs.map((lang) => (
          <div
            key={lang}
            className="flex items-center justify-between p-2 rounded bg-gray-800 border border-gray-700"
          >
            <span>
              {languages.find((l) => l.value === lang)?.label}
            </span> 
            <button
              onClick={() => removeLanguage(lang)}
            >
              <X className="text-red-400 hover:text-red-600 cursor-pointer" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}