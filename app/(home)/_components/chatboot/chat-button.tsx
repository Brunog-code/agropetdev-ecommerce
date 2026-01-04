"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import nala from "@/app/assets/mascote.webp";

interface Props {
  onClick: () => void;
}

export function ChatButton({ onClick }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div
      role="button"
      aria-label="Abrir chat"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={`group fixed bg-white rounded-full shadow-lg ${
        !isMobile ? "bottom-6 right-6" : "bottom-20 right-6"
      }`}
    >
      <Image
        src={nala}
        alt="Nala"
        width={60}
        height={60}
        className="cursor-pointer rounded-full p-2 hover:scale-104 transition-all"
      />
      <span className="absolute -top-7 left-1/3 -translate-x-1/2 text-xs bg-gray-200 rounded-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Oi, eu sou a <span className="font-semibold">Nala</span>
      </span>
    </div>
  );
}
