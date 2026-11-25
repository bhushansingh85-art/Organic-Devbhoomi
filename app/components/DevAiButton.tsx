"use client";

import React, { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";

export default function DevAiButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([
    {
      role: "model",
      text: "नमस्ते! मैं Dev AI हूँ। बताइए मैं आपकी क्या मदद कर सकता हूँ?",
    },
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
        { role: "model", text: "कृपया NEXT_PUBLIC_GEMINI_API_KEY सेट करें।" },
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
      <style jsx>{`
        @keyframes devai-border-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes devai-float-pulse {
          0%,
          100% {
            box-shadow:
              0 10px 28px rgba(6, 78, 59, 0.45),
              0 0 22px rgba(16, 185, 129, 0.35),
              0 0 38px rgba(56, 189, 248, 0.2);
          }
          50% {
            box-shadow:
              0 12px 32px rgba(6, 78, 59, 0.6),
              0 0 28px rgba(52, 211, 153, 0.55),
              0 0 46px rgba(129, 140, 248, 0.3);
          }
        }

        .devai-fab-shell {
          position: fixed;
          bottom: 88px;
          right: 20px;
          left: auto;
          top: auto;
          z-index: 9999;
          padding: 2px;
          border-radius: 9999px;
          background: linear-gradient(120deg, #34d399, #38bdf8, #a78bfa, #34d399);
          background-size: 260% 260%;
          animation: devai-border-shift 5s ease infinite, devai-float-pulse 3.2s ease-in-out infinite;
          transition: transform 0.25s ease;
        }

        .devai-fab-shell:hover {
          transform: translateY(-3px) scale(1.03);
        }

        .devai-fab-shell:active {
          transform: scale(0.97);
        }
      `}</style>

      {/* बॉटम नेव के ठीक ऊपर फिक्स यूनिक बटन */}
      <div className="devai-fab-shell">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Dev AI Assistant"
          className="flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 px-6 py-3.5 text-white cursor-pointer select-none"
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/15 border border-emerald-300/40">
            <svg
              className="h-4 w-4 text-emerald-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" />
              <path d="M19 16l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-cyan-300 ring-2 ring-slate-950" />
          </span>

          <span className="flex flex-col items-start leading-tight">
            <span className="text-[15px] font-bold tracking-wide text-white">Dev AI</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-emerald-300/90">
              Smart Guide
            </span>
          </span>

          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-cyan-200 border border-white/15">
            AI
          </span>
        </button>
      </div>

      {/* चैट बॉक्स (बटन के ठीक ऊपर फिक्स) */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "162px",
            right: "20px",
            left: "auto",
            top: "auto",
            zIndex: 9999,
            borderRadius: "22px",
          }}
          className="w-80 sm:w-96 bg-zinc-900/95 backdrop-blur-md border border-emerald-500/30 shadow-2xl overflow-hidden text-white"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-900/50 via-slate-900 to-indigo-900/50 px-4 py-3 border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <h3 className="font-semibold text-sm leading-tight">Dev AI Assistant</h3>
                <p className="text-[11px] text-emerald-300/80">Online • Ready to help</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white text-lg leading-none cursor-pointer px-1"
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
                    ? "bg-emerald-600 text-white rounded-tr-none ml-auto"
                    : "bg-zinc-800/90 text-zinc-200 rounded-tl-none mr-auto border border-zinc-700/60"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-zinc-800/90 text-zinc-400 p-3 rounded-2xl rounded-tl-none mr-auto max-w-[82%] animate-pulse">
                सोच रहा है...
              </div>
            )}
          </div>

          <div className="p-3 border-t border-zinc-800 flex gap-2 bg-zinc-950/60">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="कुछ पूछें..."
              className="flex-1 bg-zinc-800 text-sm text-white px-3.5 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer disabled:opacity-50"
            >
              भेजें
            </button>
          </div>
        </div>
      )}
    </>
  );
}