import Link from "next/link";
import FormLogin from "./components/formLog";
import { ArrowRight } from "lucide-react";
export default function Login() {
  return (
    <div  className= "min-h-screen bg-linear-to-r from-blue-500 via-purple-500 to-pink-400 flex items-center justify-center flex-col gap-6 ">

      <div>
        <p className="flex md:text-5xl text-4xl font-semibold justify-center text-white">Trainee Guide</p>
      </div>

      <div className="flex flex-col bg-[#f9f9f9] rounded-lg py-5 px-5 md:px-10 md:py-10 ">
        <h1 className="flex md:text-2xl font-semibold justify-center text-xl">Logar</h1>
        <FormLogin/>
        <p className="flex justify-center">Não tem conta ainda?</p>
        <Link className="flex justify-center text-blue-500 hover:cursor-pointer font-semibold" href={"/signup"}>Cadastre-se</Link>
      </div>
        <Link className="flex gap-1 transition-transform duration-300 hover:translate-x-1 hover:scale-110 hover:rotate-2" href={"/trainee-guide"}>
          <p className="text-white font-semibold">Conheça a trainee guide </p>
          <div className="text-white arrow-slide">
            <ArrowRight/>
          </div>
        </Link>
    </div>
  );
}