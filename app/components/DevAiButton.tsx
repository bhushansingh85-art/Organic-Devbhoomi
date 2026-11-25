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
        model: "gemini-3.5-flash",
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
          className="devai-newpage-shell sm:bottom-24 sm:right-6 sm:w-[430px] sm:h-[600px] sm:rounded-3xl border border-green-500/35 overflow-hidden"
          style={{
            inset: 0,
            display: "flex",
            flexDirection: "column",
            color: "#ffffff",
            backgroundColor: "#071911",
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 border-b border-green-500/25"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              background: "#064e3b",
              color: "#ffffff",
              flexShrink: 0,
            }}
          >
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <h2
                  style={{
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: 1.25,
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  DevAi Workspace
                </h2>
                <span
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    background: "rgba(34, 197, 94, 0.25)",
                    color: "#bbf7d0",
                    border: "1px solid rgba(74, 222, 128, 0.45)",
                  }}
                >
                  Live
                </span>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: 1.35,
                  color: "#dcfce7",
                  margin: "4px 0 0",
                }}
              >
                Organic Devbhoomi • स्मार्ट असिस्टेंट
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <Link
                href="/devai"
                onClick={() => setIsOpen(false)}
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "6px 12px",
                  borderRadius: "9999px",
                  background: "#15803d",
                  color: "#ffffff",
                  border: "1px solid #4ade80",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Full Page
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close DevAi Interface"
                style={{
                  height: "36px",
                  width: "36px",
                  borderRadius: "9999px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  background: "#14532d",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Quick Prompts */}
          <div
            className="px-4 py-2.5 border-b border-green-500/20"
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              background: "#052e16",
              flexShrink: 0,
            }}
          >
            {QUICK_PROMPTS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => sendMessage(item)}
                disabled={isLoading}
                style={{
                  flexShrink: 0,
                  fontSize: "12px",
                  fontWeight: 500,
                  padding: "6px 12px",
                  borderRadius: "9999px",
                  background: "#065f46",
                  color: "#f0fdf4",
                  border: "1px solid rgba(74, 222, 128, 0.45)",
                  opacity: isLoading ? 0.5 : 1,
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Chat Body */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              fontSize: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={
                  msg.role === "user"
                    ? {
                        padding: "12px 16px",
                        borderRadius: "16px",
                        maxWidth: "85%",
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.55,
                        background: "linear-gradient(90deg, #16a34a, #059669)",
                        color: "#ffffff",
                        marginLeft: "auto",
                      }
                    : {
                        padding: "12px 16px",
                        borderRadius: "16px",
                        maxWidth: "85%",
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.55,
                        background: "#111814",
                        color: "#f0fdf4",
                        marginRight: "auto",
                        border: "1px solid rgba(74, 222, 128, 0.35)",
                      }
                }
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "16px",
                  maxWidth: "85%",
                  background: "#111814",
                  color: "#86efac",
                  marginRight: "auto",
                  border: "1px solid rgba(74, 222, 128, 0.35)",
                }}
              >
                सोच रहा है...
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div
            className="p-3.5 sm:p-4 border-t border-green-500/25"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#050a08",
              flexShrink: 0,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="अपना सवाल यहाँ लिखें..."
              style={{
                flex: 1,
                minWidth: 0,
                fontSize: "14px",
                padding: "10px 16px",
                borderRadius: "9999px",
                outline: "none",
                background: "#18181b",
                color: "#ffffff",
                border: "1px solid rgba(74, 222, 128, 0.45)",
              }}
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={isLoading}
              style={{
                padding: "10px 20px",
                borderRadius: "9999px",
                fontSize: "14px",
                fontWeight: 700,
                background: "linear-gradient(90deg, #22c55e, #10b981)",
                color: "#09090b",
                border: 0,
                flexShrink: 0,
                opacity: isLoading ? 0.5 : 1,
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