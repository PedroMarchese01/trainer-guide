import { ArrowLeft } from "lucide-react";
import Link from "next/link";
    export default function About() {
    return (
        <section className="min-h-screen w-full bg-linear-to-b from-blue-600 via-purple-600 to-pink-500 flex flex-col items-center py-20 px-6 text-white">  
      <Link className=" items-center mr-auto ml-12 flex text-xl hover:cursor-pointer font-semibold hover:scale-110 duration-300 ease" href = {"/"}><ArrowLeft className="text-white"/>Voltar</Link>
        {/* HEADER */}
        <div className="text-center max-w-3xl mb-20 ">
            <h1 className="text-5xl font-extrabold drop-shadow-xl">
            Sobre a Trainee Guide
            </h1>
            <p className="text-white/90 mt-4 text-lg leading-relaxed ">
            Um MVP funcional desenvolvido para a Global Solution 2025 – FIAP,
            criado para transformar o futuro do trabalho através do acesso fácil,
            gratuito e guiado ao aprendizado de programação.
            </p>
        </div>

        {/* SEÇÃO - O QUE É O PROJETO */}
        <div className="w-full max-w-6xl bg-white text-black backdrop-blur-lg rounded-3xl shadow-2xl p-10 mb-20 border border-white/20">
            <h2 className="text-3xl font-bold mb-6">O que é a Trainee Guide?</h2>
            <p className="text-black leading-relaxed text-lg">
            A Trainee Guide é uma plataforma criada para impulsionar o futuro do 
            trabalho. Acreditamos que uma base forte em programação é essencial na 
            era da inteligência artificial. Nosso objetivo é democratizar o 
            conhecimento, oferecendo um guia estruturado de estudos, além de uma 
            comunidade ativa com sistema de perguntas e respostas – onde todos 
            podem aprender e ensinar.
            </p>

            <p className="text-black leading-relaxed text-lg mt-4">
            O diferencial da plataforma está na gamificação: usuários respondem 
            dúvidas, ganham pontos e sobem no ranking, tornando o aprendizado mais 
            divertido, engajado e colaborativo.
            </p>
        </div>

        {/* SEÇÃO - TECNOLOGIAS */}
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 mb-20">
            <div className="bg-white text-gray-800 p-10 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold">Tecnologias Utilizadas</h2>
            <ul className="mt-6 space-y-4 text-lg text-gray-700">
                <li>• <strong>Next.js</strong> — Framework moderno para produção</li>
                <li>• <strong>TypeScript</strong> — Tipagem estática e segurança</li>
                <li>• <strong>TailwindCSS</strong> — Estilização utilitária ágil</li>
                <li>• <strong>MongoDB</strong> — Banco NoSQL escalável</li>
                <li>• <strong>Mongoose</strong> — ODM para modelagem de dados no MongoDB</li>
            </ul>
            <p className="mt-5 text-gray-700">Este é um <strong>MVP totalmente funcional</strong>, pronto para evolução.</p>
            </div>

            <div className="bg-white text-black backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold">Proposta</h2>
            <p className="mt-4 leading-relaxed text-black">
                Nossa proposta é criar um caminho acessível para quem deseja entrar 
                no mundo da programação, especialmente pessoas sem orçamento ou em 
                fase de transição. Com conteúdo gratuito curado, interação 
                colaborativa e gamificação, a Trainee Guide acelera o aprendizado e 
                fortalece profissionais para o futuro do trabalho.
            </p>
            </div>
        </div>

        {/* EQUIPE */}
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-10 text-gray-800 mb-20">
            <h2 className="text-3xl font-bold text-center mb-10">Nossa Equipe</h2>

            <div className="grid md:grid-cols-3 gap-10">
            {[
                { name: "Augusto Valerio", rm: "562185", github: "https://github.com/Augusto-Valerio",},
                { name: "Jonas Esteves", rm: "564143", github: "https://github.com/JonasEstevess",},
                { name: "Pedro Marchese", rm: "563336", github: "https://github.com/PedroMarchese01",},
            ].map((person, i) => (
                <div
                key={i}
                className="bg-gray-100 rounded-2xl shadow p-6 flex flex-col items-center text-center"
                >
                <h3 className="text-xl font-semibold">{person.name}</h3>
                <p className="text-gray-700 mt-1">RM: {person.rm}</p>
                <a
                    href={person.github}
                    target="_blank"
                    className="mt-3 text-blue-600 hover:underline"
                >
                    GitHub
                </a>
                </div>
            ))}
            </div>
        </div>

        {/* FOOTER */}
        <footer className="text-white/90 text-sm mt-10">
            © {new Date().getFullYear()} Trainee Guide — Todos os direitos reservados.
        </footer>
        </section>
    );
    }
