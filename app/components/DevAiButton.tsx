"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
      <div className="devai-round-orb">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close DevAi" : "Open DevAi"}
          className="devai-round-btn"
        >
          DevAi
        </button>
      </div>

      {isOpen && (
        <div
          className="devai-newpage-shell inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[430px] sm:h-[600px] sm:rounded-3xl border border-green-500/35 flex flex-col overflow-hidden"
          style={{ color: "#ffffff" }}
        >
          <div
            className="flex items-center justify-between px-5 py-4 border-b border-green-500/25"
            style={{ background: "rgba(6, 78, 59, 0.55)" }}
          >
            <div>
              <div className="flex items-center gap-2">
                <h2
                  className="font-semibold text-base tracking-wide"
                  style={{ color: "#f0fdf4", margin: 0 }}
                >
                  DevAi Workspace
                </h2>
                <span
                  className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(34, 197, 94, 0.2)",
                    color: "#86efac",
                    border: "1px solid rgba(74, 222, 128, 0.35)",
                  }}
                >
                  Live
                </span>
              </div>
              <p
                className="text-xs mt-0.5"
                style={{ color: "rgba(187, 247, 208, 0.8)", margin: "2px 0 0" }}
              >
                Organic Devbhoomi • स्मार्ट असिस्टेंट
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/devai"
                onClick={() => setIsOpen(false)}
                className="text-[11px] px-2.5 py-1 rounded-full transition"
                style={{
                  background: "rgba(34, 197, 94, 0.18)",
                  color: "#dcfce7",
                  border: "1px solid rgba(74, 222, 128, 0.35)",
                }}
              >
                Full Page
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close DevAi Interface"
                className="h-9 w-9 rounded-full flex items-center justify-center text-sm transition"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                ✕
              </button>
            </div>
          </div>

          <div
            className="px-4 py-2.5 border-b border-green-500/15 flex gap-2 overflow-x-auto"
            style={{ background: "rgba(5, 46, 22, 0.45)" }}
          >
            {QUICK_PROMPTS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => sendMessage(item)}
                disabled={isLoading}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full transition disabled:opacity-50"
                style={{
                  background: "rgba(6, 78, 59, 0.85)",
                  color: "#dcfce7",
                  border: "1px solid rgba(74, 222, 128, 0.35)",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <div
            ref={scrollRef}
            className="flex-1 p-4 sm:p-5 overflow-y-auto text-sm space-y-3.5"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className="px-4 py-3 rounded-2xl max-w-[85%] whitespace-pre-wrap leading-relaxed"
                style={
                  msg.role === "user"
                    ? {
                        background: "linear-gradient(90deg, #16a34a, #059669)",
                        color: "#ffffff",
                        marginLeft: "auto",
                      }
                    : {
                        background: "rgba(24, 24, 27, 0.92)",
                        color: "#f0fdf4",
                        marginRight: "auto",
                        border: "1px solid rgba(34, 197, 94, 0.25)",
                      }
                }
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div
                className="px-4 py-3 rounded-2xl max-w-[85%]"
                style={{
                  background: "rgba(24, 24, 27, 0.85)",
                  color: "#86efac",
                  marginRight: "auto",
                  border: "1px solid rgba(34, 197, 94, 0.25)",
                }}
              >
                सोच रहा है...
              </div>
            )}
          </div>

          <div
            className="p-3.5 sm:p-4 border-t border-green-500/25 flex items-center gap-2.5"
            style={{ background: "rgba(0, 0, 0, 0.65)" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="अपना सवाल यहाँ लिखें..."
              className="flex-1 text-sm px-4 py-2.5 rounded-full focus:outline-none"
              style={{
                background: "#18181b",
                color: "#ffffff",
                border: "1px solid rgba(74, 222, 128, 0.35)",
              }}
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition disabled:opacity-50"
              style={{
                background: "linear-gradient(90deg, #22c55e, #10b981)",
                color: "#09090b",
              }}
            >
              भेजें
            </button>
          </div>
        </div>
      )}
    </>
  );
}