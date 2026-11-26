"use client";

import React, { useState, useEffect, useRef } from "react";

const BASE_PATH = "/Organic-Devbhoomi";

export interface LoginProps {
  initialMode?: "login" | "register";
  onSuccess?: (userInfo: {
    name?: string;
    email: string;
    mode: "login" | "register";
  }) => void;
}

export default function Login({
  initialMode = "login",
  onSuccess,
}: LoginProps) {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

  const syncAuthUrl = (loginMode: boolean) => {
    if (typeof window === "undefined") return;

    if (previousUrlRef.current === null) {
      previousUrlRef.current =
        window.location.pathname + window.location.search + window.location.hash;
    }

    const targetPath = loginMode
      ? `${BASE_PATH}/login`
      : `${BASE_PATH}/register`;

    if (window.location.pathname !== targetPath) {
      window.history.pushState(
        { authMode: loginMode ? "login" : "register" },
        "",
        targetPath
      );
    }
  };

  useEffect(() => {
    syncAuthUrl(isLogin);
  }, [isLogin]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.endsWith("/register")) {
        setIsLogin(false);
      } else if (path.endsWith("/login")) {
        setIsLogin(true);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      if (typeof window !== "undefined" && previousUrlRef.current !== null) {
        window.history.replaceState({}, "", previousUrlRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSuccess?.({
        name: isLogin ? undefined : name.trim(),
        email: email.trim(),
        mode: isLogin ? "login" : "register",
      });
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#071911",
        color: "#ffffff",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#052e16",
          padding: "40px",
          borderRadius: "24px",
          border: "1px solid rgba(74, 222, 128, 0.25)",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "10px",
            color: "#ffffff",
          }}
        >
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#dcfce7",
            marginBottom: "30px",
            fontSize: "14px",
          }}
        >
          {isLogin
            ? "Sign in to continue exploring Organic Devbhoomi"
            : "Join us and get the best of Himachali products"}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: "#111814",
                  border: "1px solid rgba(74, 222, 128, 0.35)",
                  color: "#ffffff",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                background: "#111814",
                border: "1px solid rgba(74, 222, 128, 0.35)",
                color: "#ffffff",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                background: "#111814",
                border: "1px solid rgba(74, 222, 128, 0.35)",
                color: "#ffffff",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              background: "linear-gradient(90deg, #16a34a, #059669)",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: 700,
              border: 0,
              cursor: "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading
              ? "Processing..."
              : isLogin
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <p
          style={{
            marginTop: "30px",
            textAlign: "center",
            fontSize: "14px",
            color: "#dcfce7",
          }}
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: "none",
              border: "none",
              color: "#4ade80",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {isLogin ? "Register now" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}