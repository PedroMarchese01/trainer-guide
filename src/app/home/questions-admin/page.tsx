"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type DialogItem = {
  User: string;
  UserId: string;
  Text: string;
  timeStamp: string;
};

type Question = {
  _id: string;
  RequestedBy: { User: string; UserId: string };
  Content: { Text: string };
};

type Answer = {
  _id: string;
  Pergunta: string; // ID da pergunta associada
  User: string;
  UserId: string;
  content: { Dialog: DialogItem[]; Drop: boolean };
  Saved: boolean;
};

export default function QuestionAdmin() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [receivedAnswers, setReceivedAnswers] = useState<Answer[]>([]);
  const [sentAnswers, setSentAnswers] = useState<Answer[]>([]);
  const [openChatId, setOpenChatId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const localS = localStorage.getItem("userLog");
    if (!localS) {
      router.push("/");
      return;
    }
    const user = JSON.parse(localS);

    async function fetchData() {
      try {
        // Buscar perguntas
        const qRes = await fetch("/api/questions");
        const qData: Question[] = await qRes.json();
        setQuestions(qData);

        // Buscar respostas
        const aRes = await fetch("/api/answers");
        const aData: Answer[] = await aRes.json();

        // Respostas enviadas pelo usuário logado
        const sent = aData.filter((a) => a.UserId === user.userId);
        setSentAnswers(sent);

        // IDs das perguntas que o usuário fez
        const myQuestionIds = qData
          .filter((q) => q.RequestedBy.UserId === user._id) // ou user.userId se quiser
          .map((q) => q._id);

        // Todas as respostas relacionadas às minhas perguntas (independente de quem enviou)
        const received = aData.filter((a) => myQuestionIds.includes(a.Pergunta));
        setReceivedAnswers(received);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  // Scroll automático
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [openChatId, receivedAnswers, sentAnswers]);

  // Enviar mensagem
  const handleSendMessage = async (answer: Answer) => {
    if (!newMessage.trim()) return;
    setSending(true);

    const localS = localStorage.getItem("userLog");
    if (!localS) return;
    const user = JSON.parse(localS);

    const message: DialogItem = {
      User: user.name,
      UserId: user.userId,
      Text: newMessage.trim(),
      timeStamp: new Date().toISOString(),
    };

    const updatedContent = {
      ...answer.content,
      Dialog: [...answer.content.Dialog, message],
    };

    const updatedAnswer = { ...answer, content: updatedContent };

    // Atualiza local
    if (answer.UserId === user.userId) {
      setSentAnswers((prev) =>
        prev.map((a) => (a._id === answer._id ? updatedAnswer : a))
      );
    } else {
      setReceivedAnswers((prev) =>
        prev.map((a) => (a._id === answer._id ? updatedAnswer : a))
      );
    }

    setNewMessage("");

    try {
      await fetch("/api/answers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: answer._id,
          update: { content: updatedContent },
        }),
      });
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      alert("Erro ao enviar mensagem.");
    } finally {
      setSending(false);
    }
  };

  const AnswerItem = ({ answer }: { answer: Answer }) => (
    <div className="bg-white/5 border border-white/20 rounded-lg p-3 hover:bg-white/10 transition">
      <p className="font-medium">Pergunta ID: {answer.Pergunta}</p>
      <p className="text-gray-300">De/Para: {answer.User}</p>
      <p className="text-gray-200">
        Última mensagem:{" "}
        {answer.content.Dialog.length > 0
          ? answer.content.Dialog[answer.content.Dialog.length - 1].Text
          : "Sem mensagens"}
      </p>
      <Button
        onClick={() =>
          setOpenChatId(openChatId === answer._id ? null : answer._id)
        }
        className="mt-2 bg-blue-600 hover:bg-blue-700"
      >
        {openChatId === answer._id ? "Fechar Chat" : "Abrir Chat"}
      </Button>

      {openChatId === answer._id && <ChatBox answer={answer} />}
    </div>
  );

  const ChatBox = ({ answer }: { answer: Answer }) => (
    <div className="mt-3 flex flex-col">
      <div className="max-h-[250px] overflow-y-auto border border-gray-700 p-2 rounded-lg bg-black/20 mb-2">
        {answer.content.Dialog.length > 0 ? (
          answer.content.Dialog.map((msg, i) => (
            <div key={i} className="mb-1">
              <strong>{msg.User}:</strong>{" "}
              <span className="text-gray-100">{msg.Text}</span>
              <div className="text-xs text-gray-400">
                {new Date(msg.timeStamp).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Sem mensagens</p>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="flex gap-2">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1"
          rows={2}
        />
        <Button
          onClick={() => handleSendMessage(answer)}
          disabled={sending || !newMessage.trim()}
          className="bg-green-500 hover:bg-green-600"
        >
          {sending ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Carregando perguntas e respostas...
      </div>
    );

  return (
    <div className="p-6 text-white max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Painel de Perguntas e Respostas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Respostas recebidas */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Respostas Recebidas
          </h2>
          {receivedAnswers.length === 0 ? (
            <p className="text-gray-400 text-center">Nenhuma resposta recebida.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {receivedAnswers.map((a) => (
                <AnswerItem key={a._id} answer={a} />
              ))}
            </div>
          )}
        </div>

        {/* Respostas enviadas */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Respostas Enviadas
          </h2>
          {sentAnswers.length === 0 ? (
            <p className="text-gray-400 text-center">Nenhuma resposta enviada.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {sentAnswers.map((a) => (
                <AnswerItem key={a._id} answer={a} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
