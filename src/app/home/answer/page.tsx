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
import { ArrowRight } from "lucide-react";
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

export default function answer(){
      const router = useRouter()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [question, setQuestions] = useState()
    console.log(value)
    useEffect(() => {
        const localS = localStorage.getItem("userLog");
        if (!localS) router.push("/");
        async function getQuestions() {
            try {
                const res = await fetch("/api/questions");

                if (!res.ok) {
                throw new Error("Erro ao buscar perguntas");
                }

                const data = await res.json();
                setQuestions(data)
                return data;
            } catch (err) {
                console.error("Erro:", err);
                return [];
            }
            }
            getQuestions()

    },[])

    console.log(question)
    
    return(
        <div className="text-white">
            <h2 className="text-2xl">Responda Perguntas</h2>
            <ul className="flex flex-col py-4 gap-2">
                <div className="flex gap-2">
                <ArrowRight/>
                <li>Para cada pergunta acertada +50 pontos!</li>
                </div>
                <div className="flex gap-2">
                <ArrowRight/>
                <li>Você não perde pontos por tentar!</li>
                </div>
            </ul>
            
{/* começo select -------------------------------------------------- */}
<div className="flex w-full border-b pb-4">
    
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
</div>
      {/* fim select -------------------------------------------------- */}



        </div>
    )
}