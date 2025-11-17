'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

export default function FormLogin(){

  interface FormProps{
    email:string,
    password:string,
  }
  interface User {
    Email: string;
    Password: string;
    Banned?: {
      Status: boolean;
      Reason?: string;
    }
  }

  const router = useRouter()

  const [form , setForm] = useState<FormProps>({ email: "", password: "" })
  const [loginError, setLoginError] = useState<string | null>(null)
  const [trys, SetTrys] = useState(0)

  async function verifyLogin(email: string, password: string): Promise<User | null> {
    try {
      const res = await fetch("/api/users")
      if (!res.ok) throw new Error("Erro ao buscar usuários")

      const users: User[] = await res.json()
      const user = users.find(u => u.Email === email)

      if (!user) {
        SetTrys(prev => prev + 1)
        setLoginError("Email ou senha incorretos")
        return null
      }

      if (user.Banned?.Status) {
        SetTrys(prev => prev + 1)
        setLoginError(user.Banned.Reason ?? "contate suporte@gmail.com")
        return null
      }

      if (user.Password !== password) {
        SetTrys(prev => prev + 1)
        setLoginError("Email ou senha incorretos")
        return null
      }
      if(!localStorage.getItem("userLog")){
        localStorage.setItem("userLog", JSON.stringify(user))
      }
      router.push('/home')
      return user

    } catch (err) {
      console.error(err)
      return null
    }
  }

  // ✅ Verifica login ao montar componente
  useEffect(() =>{
    const localS = localStorage.getItem("userLog")
    if(localS){
      try {
        const user = JSON.parse(localS)
        verifyLogin(user.Email, user.Password)
      } catch(err) {
        console.error("Erro ao ler localStorage:", err)
      }
    }
  },[])

  return(
    <div className="py-8">
        <div className="flex flex-col align-middle gap-4">
            <Input
                placeholder="Digite seu email"
                value={form.email}
                onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            />
            <Input
                placeholder="Digite sua senha"
                type="password"
                value={form.password}
                onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
            />
            <Button className="bg-blue-500 hover:bg-black/80 cursor-pointer" onClick={() => verifyLogin(form.email , form.password)}>Entrar</Button>
        </div>
        <div>
          {loginError && (
            <Alert variant="destructive" className="mt-4 flex flex-col">
              <AlertTitle className="mx-auto">Erro!</AlertTitle>
              {loginError != "Email ou senha incorretos" && (<AlertDescription>Conta banida: </AlertDescription>)}
              {loginError == "Email ou senha incorretos" && (<AlertDescription>Senha ou email incorretos</AlertDescription>)}
              <AlertDescription>tentativas falhas: {trys}</AlertDescription>
            </Alert>
          )}
        </div>
    </div>
  )
}
