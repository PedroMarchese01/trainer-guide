"use client"
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// ⬇️ TYPES FORA DO COMPONENTE (CORREÇÃO NECESSÁRIA PARA BUILD)
type DialogItem = {
  User: string;
  UserId: string;
  Text: string;
  timeStamp: string;
};

type Answer = {
  _id: string;
  Pergunta: string;
  User: string;
  UserId: string;
  content: { Dialog: DialogItem[]; Drop: boolean };
  Saved: boolean;
};

export default function ChatPage() {

  const [chatData, setChatData] = useState<Answer | false | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();

  const isCreating = useRef(false);

  useEffect(() => {
    const localS = localStorage.getItem("userLog");
    if (!localS) {
      router.push("/");
      return;
    }

    const user = JSON.parse(localS);

    async function getOrCreateAnswer() {
      try {
        const res = await fetch("/api/answers");
        const data: Answer[] = await res.json();

        let existingAnswer = data.find(
          (answer) => answer.Pergunta === id && answer.UserId === user.userId
        );

        if (existingAnswer) {
          setChatData(existingAnswer);
        } else if (!isCreating.current) {
          isCreating.current = true;

          const newAnswer: Omit<Answer, "_id"> = {
            Pergunta: id || "",
            User: user.name,
            UserId: user.userId,
            content: { Dialog: [], Drop: false },
            Saved: false,
          };

          const createRes = await fetch("/api/answers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAnswer),
          });

          const createdAnswer: Answer = await createRes.json();
          setChatData(createdAnswer);
        }
      } catch (err) {
        console.error("Erro:", err);
        setChatData(false);
      }
    }

    getOrCreateAnswer();
  }, [id, router]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !chatData) return;

    const localS = localStorage.getItem("userLog");
    const user = localS ? JSON.parse(localS) : null;
    if (!user) return;

    const message: DialogItem = {
      User: user.name,
      UserId: user.userId,
      Text: newMessage,
      timeStamp: new Date().toISOString(),
    };

    const updatedDialog = [...(chatData.content?.Dialog ?? []), message];
    const updatedChat = { ...chatData, content: { ...chatData.content, Dialog: updatedDialog } };

    setChatData(updatedChat);
    setNewMessage("");

    try {
      await fetch("/api/answers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: chatData._id,
          update: { content: { Dialog: updatedDialog, Drop: chatData.content.Drop } },
        }),
      });
    } catch (err) {
      console.error("Erro ao atualizar chat:", err);
    }
  };

  return (
    <div className="text-white p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl mb-4 flex justify-center">Chat</h1>

      {chatData === null ? (
        <p>Carregando chat...</p>
      ) : chatData === false ? (
        <p>Erro ao carregar chat.</p>
      ) : (
        <div className="space-y-4">
          <div className="border border-gray-600 rounded p-4 max-h-[400px] overflow-y-auto">
            {(chatData.content?.Dialog ?? []).length > 0 ? (
              <ul className="space-y-2">
                {(chatData.content?.Dialog ?? []).map((msg, index) => (
                  <li key={index}>
                    <strong>{msg.User}:</strong> {msg.Text}{" "}
                    <span className="text-xs text-gray-400">
                      ({new Date(msg.timeStamp).toLocaleString()})
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma mensagem ainda.</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <Textarea
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
              Enviar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
