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
      text: "नमस्ते! मैं DevAi हूँ। Organic Devbhoomi के पौधों, सीज़नल उत्पाद या किसी भी सवाल में मैं आपकी कैसे मदद कर सकता हूँ?",
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
      {/* राउंड बटन + हैवी ग्रीन ग्लो (सिर्फ DevAi टेक्स्ट, कोई लोगो नहीं) */}
      <div className="devai-round-orb">
        <button
          type="button"
          onClick={() => {
            console.log("DevAi button clicked");
            setIsOpen((prev) => !prev);
          }}
          aria-label={isOpen ? "Close DevAi" : "Open DevAi"}
          className="devai-round-btn"
        >
          DevAi
        </button>
      </div>

      {/* नया पेज / फुल-फील्ड स्टाइल चैट इंटरफ़ेस */}
      {isOpen && (
        <div className="devai-newpage-shell inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[430px] sm:h-[600px] sm:rounded-3xl border border-green-500/35 flex flex-col overflow-hidden text-white">
          {/* टॉप बार */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-green-950/90 via-emerald-950/80 to-zinc-950 border-b border-green-500/25">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-base text-green-50 tracking-wide">
                  DevAi Workspace
                </h2>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-400/30">
                  Live
                </span>
              </div>
              <p className="text-xs text-green-300/75 mt-0.5">
                Organic Devbhoomi • स्मार्ट असिस्टेंट
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close DevAi Interface"
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