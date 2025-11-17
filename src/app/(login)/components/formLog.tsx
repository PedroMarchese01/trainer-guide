'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"  // <- CORRETO para App Router

export default function FormLogin(){

  interface FormProps{
    email:string,
    password:string,
  }
  interface User {
    Email: string;
    Password: string;
  }

  const router = useRouter()
  const [form , setForm] = useState<FormProps>({ email: "", password: "" })
  const [loginError, setLoginError] = useState<string | null>(null)

  async function verifyLogin(email: string, password: string): Promise<User | null> {
    try {
      const res = await fetch("/api/users")
      if (!res.ok) throw new Error("Erro ao buscar usuários")

      const users: User[] = await res.json()
      const user = users.find(u => u.Email === email && u.Password === password)

      if(user){
        
        router.push('/home')
      } else {
        
        setLoginError("Email ou senha incorretos")
      }

      return user || null
    } catch (err) {
      console.error(err)
      return null
    }
  }

  return(
    <div className="drid grid-rows-3 grid-cols-1 py-8">
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
        <div className="">
            
      {loginError && (
        <Alert variant="destructive" className="mt-4 ">
          <AlertTitle>Erro!</AlertTitle>
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}
        </div>
    </div>
  )
}