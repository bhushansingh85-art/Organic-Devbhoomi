"use client";

import React, { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";

export default function DevAi() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([
    { role: "model", text: "नमस्ते! मैं Dev AI हूँ। बताइए मैं आपकी क्या मदद कर सकता हूँ?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "कृपया पहले NEXT_PUBLIC_GEMINI_API_KEY सेट करें।" },
      ]);
      return;
    }

    const userText = input.trim();
    const updatedMessages = [...messages, { role: "user" as const, text: userText }];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: updatedMessages.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
      });

      const replyText = response.text || "माफ़ कीजिए, मैं अभी जवाब नहीं दे पाया।";
      setMessages((prev) => [...prev, { role: "model", text: replyText }]);
    } catch (error) {
      console.error("Gemini API error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "माफ़ कीजिए, API से कनेक्ट करने में समस्या आ रही है।" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          top: "50%",
          right: "24px",
          transform: "translateY(-50%)",
          zIndex: 9999,
          borderRadius: "25px",
          boxShadow: "0 0 18px rgba(59, 130, 246, 0.8), 0 0 35px rgba(147, 51, 234, 0.6)",
        }}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3.5 text-white font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
        <span>Dev AI</span>
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            right: "112px",
            transform: "translateY(-50%)",
            zIndex: 9999,
            borderRadius: "20px",
          }}
          className="w-80 sm:w-96 bg-zinc-900/95 backdrop-blur-md border border-zinc-700/80 shadow-2xl overflow-hidden text-white"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-4 py-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
              <h3 className="font-semibold text-sm">Dev AI Assistant</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white text-lg leading-none cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="h-64 p-4 overflow-y-auto text-sm text-zinc-300 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl max-w-[82%] whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-tr-none ml-auto"
                    : "bg-zinc-800/80 text-zinc-200 rounded-tl-none mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-zinc-800/80 text-zinc-400 p-3 rounded-2xl rounded-tl-none mr-auto max-w-[82%] animate-pulse">
                सोच रहा है...
              </div>
            )}
          </div>

          <div className="p-3 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="कुछ पूछें..."
              className="flex-1 bg-zinc-800 text-sm text-white px-3.5 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer disabled:opacity-50"
            >
              भेजें
            </button>
          </div>
        </div>
      )}
    </>
  );
}