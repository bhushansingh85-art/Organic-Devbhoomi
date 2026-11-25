"use client";

import React, { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";

const QUICK_PROMPTS = [
  "हिमालयी पौधों की देखभाल कैसे करें?",
  "सीज़नल फल और बीज कौन से उपलब्ध हैं?",
  "ऑर्डर और डिलीवरी की जानकारी दें",
];

export default function DevAiButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([
    {
      role: "model",
      text: "नमस्ते! मैं Dev AI हूँ। Organic Devbhoomi के पौधों, सीज़नल उत्पाद या किसी भी सवाल में मैं आपकी कैसे मदद कर सकता हूँ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (customText?: string) => {
    const rawText = typeof customText === "string" ? customText : input;
    if (!rawText.trim() || isLoading) return;

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "कृपया NEXT_PUBLIC_GEMINI_API_KEY सेट करें।" },
      ]);
      return;
    }

    const userText = rawText.trim();
    const updatedMessages = [...messages, { role: "user" as const, text: userText }];
    setMessages(updatedMessages);
    if (typeof customText !== "string") {
      setInput("");
    }
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
  }, [messages, isLoading, isOpen]);

  return (
    <>
      <style jsx>{`
        @keyframes devai-heavy-green-glow {
          0%,
          100% {
            box-shadow:
              0 0 18px rgba(34, 197, 94, 0.85),
              0 0 36px rgba(22, 163, 74, 0.75),
              0 0 58px rgba(74, 222, 128, 0.55),
              0 10px 25px rgba(0, 0, 0, 0.55);
          }
          50% {
            box-shadow:
              0 0 24px rgba(74, 222, 128, 1),
              0 0 46px rgba(34, 197, 94, 0.88),
              0 0 72px rgba(134, 239, 172, 0.68),
              0 12px 28px rgba(0, 0, 0, 0.65);
          }
        }

        @keyframes devai-border-flow {
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

        .devai-round-orb {
          position: fixed;
          bottom: 88px;
          right: 20px;
          z-index: 9990;
          width: 58px;
          height: 58px;
          padding: 2.5px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #86efac, #22c55e, #15803d, #4ade80, #86efac);
          background-size: 250% 250%;
          animation:
            devai-border-flow 4s ease infinite,
            devai-heavy-green-glow 2.4s ease-in-out infinite;
          transition: transform 0.22s ease;
        }

        .devai-round-orb:hover {
          transform: translateY(-3px) scale(1.06);
        }

        .devai-round-orb:active {
          transform: scale(0.95);
        }

        .devai-newpage-shell {
          position: fixed;
          z-index: 9995;
          background: radial-gradient(circle at top right, rgba(34, 197, 94, 0.16), transparent 45%),
            linear-gradient(180deg, #071911 0%, #09130f 55%, #060b09 100%);
          box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.75),
            0 0 35px rgba(34, 197, 94, 0.25);
        }
      `}</style>

      {/* गोल बटन + हैवी ग्रीन ग्लो */}
      <div className="devai-round-orb">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close Dev AI" : "Open Dev AI"}
          title="Dev AI"
          className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-emerald-800 via-green-950 to-zinc-950 text-emerald-200 cursor-pointer select-none"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-green-400/60" />
          <svg
            className="h-6 w-6 text-green-300 drop-shadow-[0_0_8px_rgba(74,222,128,0.9)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
          <span className="sr-only">Dev AI</span>
        </button>
      </div>

      {/* नया पेज / फुल-फील्ड स्टाइल चैट इंटरफ़ेस */}
      {isOpen && (
        <div className="devai-newpage-shell inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[430px] sm:h-[600px] sm:rounded-3xl border border-green-500/35 flex flex-col overflow-hidden text-white">
          {/* टॉप बार */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-green-950/90 via-emerald-950/80 to-zinc-950 border-b border-green-500/25">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/15 border border-green-400/40 shadow-[0_0_16px_rgba(34,197,94,0.45)] text-green-300">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-base text-green-50 tracking-wide">
                    Dev AI Workspace
                  </h2>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-400/30">
                    Live
                  </span>
                </div>
                <p className="text-xs text-green-300/75 mt-0.5">
                  Organic Devbhoomi • स्मार्ट असिस्टेंट
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Dev AI Interface"
              className="h-9 w-9 rounded-full bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-400/40 text-green-100 hover:text-white flex items-center justify-center text-sm transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* क्विक सुझाव */}
          <div className="px-4 py-2.5 bg-green-950/35 border-b border-green-500/15 flex gap-2 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => sendMessage(item)}
                disabled={isLoading}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-green-950/80 hover:bg-green-900/80 text-green-200 border border-green-500/30 transition cursor-pointer disabled:opacity-50"
              >
                {item}
              </button>
            ))}
          </div>

          {/* मैसेज एरिया */}
          <div
            ref={scrollRef}
            className="flex-1 p-4 sm:p-5 overflow-y-auto text-sm space-y-3.5"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-4 py-3 rounded-2xl max-w-[85%] whitespace-pre-wrap leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-br-xs ml-auto shadow-[0_6px_20px_rgba(22,163,74,0.35)]"
                    : "bg-zinc-900/90 text-green-50/95 rounded-bl-xs mr-auto border border-green-500/20"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-zinc-900/80 text-green-300/85 px-4 py-3 rounded-2xl rounded-bl-xs mr-auto max-w-[85%] border border-green-500/20 animate-pulse">
                सोच रहा है...
              </div>
            )}
          </div>

          {/* इनपुट बार */}
          <div className="p-3.5 sm:p-4 border-t border-green-500/25 bg-black/50 flex items-center gap-2.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="अपना सवाल यहाँ लिखें..."
              className="flex-1 bg-zinc-900/90 border border-green-500/30 text-sm text-green-50 placeholder:text-green-200/40 px-4 py-2.5 rounded-full focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400/50"
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-zinc-950 px-5 py-2.5 rounded-full text-sm font-semibold shadow-[0_0_18px_rgba(34,197,94,0.45)] transition cursor-pointer disabled:opacity-50"
            >
              भेजें
            </button>
          </div>
        </div>
      )}
    </>
  );
}