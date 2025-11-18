  'use client'
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { useState } from "react";
  import { toast } from "sonner";
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  import { Checkbox } from "../../components/ui/checkbox";
  import { Label } from "@radix-ui/react-label";
  import { stringify } from "querystring";
  import { useRouter } from "next/navigation";
  import Link from "next/link";


  export default function FormSign() {
      
      const [steps, setSteps] = useState(0)
      const [codigo, setCodigo] = useState(() => Math.floor(100000 + Math.random() * 900000));
      const [verifyValue, setVerifyValue] = useState<string>("")
      const [view, setView] = useState(false)
      const [form , setForm] = useState(
          {
              Email:"",
              password:"",
              verifyPassword:"",
              name:"",
              age:"",
          }
      )
      const router = useRouter()

      async function sendEmail(email:string){
          await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Verificação de email",
          message: `o seu código de vericação é ${codigo}`,
        }),
      });
      }

      function confer(){
          if(String(codigo) === verifyValue){
              createAccount(form)

          }else{
              toast.error("código invalido")
          }
      }

      function verifyData(password1:string ,password2:string ){

          // ❌ Senhas diferentes
          if(password1 !== password2){
              toast.error("As senhas não coincidem!");
              return false;
          }

          // ❌ Não tem maiúscula
          if(!/[A-Z]/.test(password1)){
              toast.error("A senha deve conter pelo menos 1 letra maiúscula.");
              return false;
          }

          // ❌ Não tem minúscula
          if(!/[a-z]/.test(password1)){
              toast.error("A senha deve conter pelo menos 1 letra minúscula.");
              return false;
          }

          // ❌ Não tem caractere especial
          if(!/[!@#$%^&*()+\-_=.,{}[\]|;:/?~]/.test(password1)){
              toast.error("A senha deve conter 1 caractere especial.");
              return false;
          }

          return true;
      }

      async function createAccount(data: typeof form) {
    // ✅ Validação de email antes de enviar
    if (!data.Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.Email)) {
      toast.error("Digite um email válido!");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          Age: Number(data.age) || 0,
          Email: data.Email,        
          Password: data.password,  
          security:{
              auth2:true,
              createdAt: new Date()
          }
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // se o erro for de duplicidade
        if (result.error?.includes("duplicate key")) {
          toast.error("Esse email já está cadastrado!");
          return;
        }
        toast.error(result.error || "Erro ao criar conta");
        return;
      }

      toast.success("Conta criada com sucesso!");
      localStorage.setItem( "userLog" , JSON.stringify({
        Email:form.Email,
        Password:form.password,
      }) )
      router.push("/home")
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar conta");
    }
  }

    return (
      <>
      <div className="flex flex-col align-middle gap-4 bg-[#f9f9f9] p-10 rounded-lg">

          {steps == 0 && (
              <div className="flex flex-col gap-4">
                  <h1 className="flex md:text-2xl font-semibold justify-center text-xl">Cadastre-se</h1>
                  <Input placeholder="Digite seu Nome" defaultValue={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}/>
                  <Input placeholder="Digite sua idade" defaultValue={form.age} onChange={(e) => setForm((prev) => ({ ...prev, age: e.target.value }))}/>
                  <Input placeholder="Digite seu email" defaultValue={form.Email} onChange={(e) => setForm((prev) => ({ ...prev, Email: e.target.value }))}/>
                  <Input type={view?"text" : "password"} placeholder="Digite sua nova senha"defaultValue={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}/>
                  <Input type={view?"text" : "password"} placeholder="Digite sua senha novamente" defaultValue = {form.verifyPassword} onChange={(e) => setForm((prev) => ({ ...prev, verifyPassword: e.target.value }))}/>
                  <div className="flex gap-2 items-center justify-center">
                  <Checkbox id="visualizar senha" onCheckedChange= { () => setView(!view)}/>
                  <Label htmlFor="visualizar senha">ver senha</Label>
                  </div>
                  <Button onClick={() => {
                      if(verifyData(form.password , form.verifyPassword)){
                          setSteps(50)
                      }
                  }}>Próximo passo</Button>
              </div>
          )}
          {steps === 50 && (
              <div className="flex flex-col gap-4">
                  <p>Um email de verificação sera enviado para:</p>
                  <p className="mx-auto">{form.Email}</p>
                  <div className="flex justify-between">
                      <Button className="flex w-[45%]" onClick={() => setSteps(0)}>voltar</Button>
                      <Button className="bg-blue-500 flex w-[45%]" onClick={() => {
                          sendEmail(form.Email)
                          setSteps(100)
                      }}>enviar</Button>
                  </div>
              </div>
          )}
          {steps == 100 && (
              <div className="flex flex-col gap-4">
                  <div>
                      <p className="flex justify-center">Digite o código enviado para:</p>
                      <span className="text-purple-500 flex justify-center mb-2">{form.Email}</span>
                  </div>
                  <div className="flex flex-col items-center">
                  <InputOTP  maxLength={6} onChange={(e) => (setVerifyValue(e))}>
                      <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                      </InputOTPGroup>
                  </InputOTP>
                  <Button className = "mt-4"onClick={() => confer()}>Validar e cadastrar</Button>
                  <Button className = "mt-4"onClick={() => setSteps(50)}>voltar</Button>
                  <div className="flex flex-col mt-2">
                      <p className="mx-auto">Não recebeu o e-mail?</p>
                      <p>Confira a caixa de spam ou se digitou o endereço corretamente.</p>
                  </div>
                  </div>
              </div>
          )}
      </div>
          <Link className="flex justify-center cursor-pointer text-white mt-2 font-semibold" href = "/">Voltar para o Login</Link></>
    );
  }