"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function profile() {
  const router = useRouter()
  useEffect(() => {
        const localS = localStorage.getItem("userLog");
    
        if (!localS){
          router.push("/")
          return
        }},[])
  return (
    <div className="bg-[#06030f] text-white w-full h-screen">
      <p>ola</p>
    </div>
  );
}
