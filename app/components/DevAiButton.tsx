"use client";

import React, { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";

export default function DevAiButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([
    {
      role: "model",
      text: "नमस्ते! मैं Dev AI हूँ। Organic Devbhoomi या किसी भी चीज़ में मैं आपकी कैसे मदद कर सकता हूँ?",
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
        @keyframes devai-ring-spin {
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

        @keyframes devai-soft-glow {
          0%,
          100% {
            box-shadow:
              0 8px 22px rgba(5, 46, 22, 0.55),
              0 0 18px rgba(52, 211, 153, 0.35);
          }
          50% {
            box-shadow:
              0 10px 26px rgba(5, 46, 22, 0.7),
              0 0 26px rgba(110, 231, 183, 0.55);
          }
        }

        .devai-round-shell {
          position: fixed;
          bottom: 88px;
          right: 20px;
          left: auto;
          top: auto;
          z-index: 9999;
          padding: 2px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #6ee7b7, #10b981, #38bdf8, #6ee7b7);
          background-size: 240% 240%;
          animation: devai-ring-spin 5s ease infinite, devai-soft-glow 3.4s ease-in-out infinite;
          transition: transform 0.22s ease;
        }

        .devai-round-shell:hover {
          transform: translateY(-2px) scale(1.04);
        }

        .devai-round-shell:active {
          transform: scale(0.96);
        }

        .devai-chat-card {
          position: fixed;
          bottom: 150px;
          right: 20px;
          left: auto;
          top: auto;
          z-index: 9999;
          border-radius: 24px;
          background: linear-gradient(180deg, rgba(12, 28, 22, 0.96) 0%, rgba(15, 23, 20, 0.98) 100%);
          box-shadow:
            0 22px 50px rgba(0, 0, 0, 0.55),
            0 0 0 1px rgba(110, 231, 183, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }
      `}</style>

      {/* कॉम्पैक्ट राउंडेड बटन */}
      <div className="devai-round-shell">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Dev AI"
          className="flex items-center gap-2 rounded-full bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-900 px-4 py-2.5 text-white cursor-pointer select-none"
        >
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 border border-emerald-300/35">
            <svg
              className="h-3.5 w-3.5 text-emerald-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-lime-300 ring-2 ring-emerald-950" />
          </span>
          <span className="text-sm font-semibold tracking-wide text-emerald-50">Dev AI</span>
        </button>
      </div>

      {/* नेचर-थीम चैट बॉक्स */}
      {isOpen && (
        <div className="devai-chat-card w-80 sm:w-96 backdrop-blur-xl overflow-hidden text-white">
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-900/70 via-teal-950/70 to-slate-900/80 px-4 py-3 border-b border-emerald-500/20">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/15 border border-emerald-300/30 text-emerald-300">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3l1.8 4.4L18.2 9.2l-4.4 1.8L12 15.4l-1.8-4.4L5.8 9.2l4.4-1.8L12 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-emerald-50 leading-tight">
                  Dev AI • Devbhoomi Guide
                </h3>
                <p className="text-[11px] text-emerald-300/80 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-400 inline-block" />
                  <span>ऑनलाइन • मदद के लिए तैयार</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
              className="h-7 w-7 rounded-full bg-white/5 hover:bg-white/15 text-emerald-100/75 hover:text-white flex items-center justify-center text-xs transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div
            ref={scrollRef}
            className="h-64 p-4 overflow-y-auto text-sm space-y-3 bg-gradient-to-b from-transparent to-emerald-950/20"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-3.5 py-2.5 rounded-2xl max-w-[84%] whitespace-pre-wrap leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-sm ml-auto shadow-md shadow-emerald-950/50"
                    : "bg-emerald-950/75 text-emerald-50/95 rounded-bl-sm mr-auto border border-emerald-400/15"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-emerald-950/60 text-emerald-300/80 px-3.5 py-2.5 rounded-2xl rounded-bl-sm mr-auto max-w-[84%] border border-emerald-400/15 animate-pulse">
                सोच रहा है...
              </div>
            )}
          </div>

          <div className="p-3 border-t border-emerald-500/20 flex items-center gap-2 bg-black/35">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="पौधों, ऑर्डर या किसी भी चीज़ के बारे में पूछें..."
              className="flex-1 bg-emerald-950/70 border border-emerald-400/20 text-sm text-emerald-50 placeholder:text-emerald-200/40 px-3.5 py-2 rounded-full focus:outline-none focus:border-emerald-400/60"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={isLoading}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 px-4 py-2 rounded-full text-sm font-semibold transition cursor-pointer disabled:opacity-50"
            >
              भेजें
            </button>
          </div>
        </div>
      )}
    </>
  );
}