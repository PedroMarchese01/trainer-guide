"use client"
import { Suspense } from "react";
import ChatPage from "./chatpage.tsx";

export default function Page() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <ChatPage />
    </Suspense>
  );
}