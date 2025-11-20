'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type User = {
    name: string;
    Email: string;
    Password: string;
}

export default function Recover(){

    const [data , setData] = useState<User[]>([])
    const [email, setEmail] = useState("")

    useEffect(() => {
        async function getUsers() {
            try{
                const res = await fetch("/api/users")
                if(!res.ok){
                    toast.error("Erro na busca dos usuários")
                    return
                }

                const json = await res.json()
                setData(json)

            }catch(err){
                console.error("erro" , err)
            }
        }

        getUsers()
    }, [])

    async function sendEmail(foundUser: User) {
    await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            to: foundUser.Email,
            subject: "Recuperação de senha",
            message: `Não responda. Sua senha é: ${foundUser.Password}`
        })
    })
}
    async function recoverP(){
        if (!email) {
            toast.error("Digite um email")
            return
        }

        const foundUser = data.find((u) => u.Email === email)

        if (!foundUser) {
            toast.error("Usuário não encontrado")
            return
        }

        await sendEmail(foundUser)
        toast.success(`Um email foi enviado para: ${foundUser.name}, ${foundUser.Email}`)
    }

    return (
        <div className="min-h-screen bg-linear-to-r from-blue-500 via-purple-500 to-pink-400 flex items-center justify-center flex-col gap-6 ">
            <div className="flex flex-col gap-2 bg-[#f9f9f9] rounded-lg py-5 px-5 md:px-10 md:py-10 ">
                <h2 className="text-2xl mx-auto mb-8">Esqueceu sua senha?</h2>

                <Input
                    className="mb-4" 
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />


                <Button className = "hover:bg-blue-700  bg-blue-500 hover:scale-110 " onClick={recoverP}>Recuperar senha</Button>
                <div >
                    <Link  className = "flex hover:scale-110 duration-300 ease justify-center mt-4 font-semibold"href={"/"}><ArrowLeft className=" text-purple-500"/>voltar </Link>
                </div>
            </div>
        </div>
    )
}
