"use client";

import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../../lib/firebase";

export const dynamic = "force-static";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const formatAuthError = (err: unknown, fallback: string) => {
    const code =
      typeof err === "object" && err !== null && "code" in err
        ? String((err as { code?: unknown }).code)
        : "";

    switch (code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "ईमेल या पासवर्ड गलत है। कृपया दोबारा जांचें।";
      case "auth/email-already-in-use":
        return "यह ईमेल पहले से रजिस्टर्ड है। कृपया Sign In करें।";
      case "auth/weak-password":
        return "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।";
      case "auth/invalid-email":
        return "कृपया एक सही ईमेल पता दर्ज करें।";
      case "auth/popup-closed-by-user":
        return "Google लॉगिन पॉपअप बंद कर दिया गया।";
      default:
        return err instanceof Error && err.message ? err.message : fallback;
    }
  };

  // Email & Password Login / Sign Up
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatusMessage("");
    setLoading(true);

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
        setStatusMessage("अकाउंट सफलतापूर्वक बन गया है!");
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        setStatusMessage("सफलतापूर्वक लॉग इन हो गए हैं!");
      }
    } catch (err: unknown) {
      setError(formatAuthError(err, "Authentication failed."));
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In
  const handleGoogleLogin = async () => {
    setError("");
    setStatusMessage("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      setStatusMessage("Google से सफलतापूर्वक लॉग इन हो गए हैं!");
    } catch (err: unknown) {
      setError(formatAuthError(err, "Google sign-in failed."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/90 p-7 sm:p-8 text-slate-100 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-400/30">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {isRegistering ? "नया अकाउंट बनाएं" : "वापस स्वागत है"}
          </h2>
          <p className="mt-1.5 text-sm text-slate-400">
            {isRegistering
              ? "शुरू करने के लिए अपनी जानकारी भरें"
              : "अपने अकाउंट में साइन इन करने के लिए विवरण दर्ज करें"}
          </p>
        </div>

        {/* Error / Success Alerts */}
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        {statusMessage && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
          >
            {statusMessage}
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              ईमेल पता
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="name@example.com"
              className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              पासवर्ड
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete={
                  isRegistering ? "new-password" : "current-password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 py-2.5 pl-3.5 pr-16 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 transition hover:text-slate-200"
              >
                {showPassword ? "छुपाएं" : "दिखाएं"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "कृपया प्रतीक्षा करें..."
              : isRegistering
              ? "अकाउंट बनाएं"
              : "ईमेल से लॉग इन करें"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-800" />
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            या
          </span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        {/* Google Sign-In Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm font-medium text-white transition hover:border-slate-600 hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.13z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
            />
          </svg>
          <span>Google से जारी रखें</span>
        </button>

        {/* Toggle Sign In / Sign Up */}
        <p className="mt-6 text-center text-sm text-slate-400">
          {isRegistering ? "क्या आपका पहले से अकाउंट है?" : "नया अकाउंट चाहिए?"}{" "}
          <button
            type="button"
            onClick={() => {
              setError("");
              setStatusMessage("");
              setIsRegistering((prev) => !prev);
            }}
            className="font-semibold text-indigo-400 underline-offset-4 hover:text-indigo-300 hover:underline"
          >
            {isRegistering ? "साइन इन करें" : "साइन अप करें"}
          </button>
        </p>
      </div>
    </div>
  );
}
