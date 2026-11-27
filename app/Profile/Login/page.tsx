'use client';

import React, { useState } from 'react';
import { ArrowLeft, Lock, Mail, Sprout, User } from 'lucide-react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../../lib/firebase';
import { useTheme } from '../../context/ThemeContext';

export interface AuthSuccessPayload {
  uid?: string;
  name?: string;
  email: string;
  mode: 'login' | 'register' | 'google';
}

interface LoginProps {
  initialMode?: 'login' | 'register';
  onSuccess: (payload: AuthSuccessPayload) => void;
  onBack?: () => void;
}

function getFriendlyAuthError(err: unknown): {
  message: string;
  suggestLogin?: boolean;
} {
  const code =
    typeof err === 'object' && err !== null && 'code' in err
      ? String((err as { code?: string }).code)
      : '';

  switch (code) {
    case 'auth/email-already-in-use':
      return {
        message: 'Already have an account. Please login instead.',
        suggestLogin: true,
      };
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return { message: 'Invalid email or password. Please check and try again.' };
    case 'auth/weak-password':
      return { message: 'Password should be at least 6 characters long.' };
    case 'auth/invalid-email':
      return { message: 'Please enter a valid email address.' };
    case 'auth/popup-closed-by-user':
      return { message: 'Google sign-in popup was closed before completing.' };
    default:
      return { message: 'Authentication failed. Please try again.' };
  }
}

export default function Login({
  initialMode = 'login',
  onSuccess,
  onBack,
}: LoginProps) {
  const { dark } = useTheme();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLoginSwitch, setShowLoginSwitch] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowLoginSwitch(false);

    const cleanEmail = email.trim();
    const cleanName = name.trim();

    if (!cleanEmail || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    if (mode === 'register' && !cleanName) {
      setError('Please enter your full name to register.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'register') {
        const cred = await createUserWithEmailAndPassword(
          auth,
          cleanEmail,
          password
        );
        await updateProfile(cred.user, { displayName: cleanName });

        onSuccess({
          uid: cred.user.uid,
          name: cleanName,
          email: cred.user.email || cleanEmail,
          mode: 'register',
        });
      } else {
        const cred = await signInWithEmailAndPassword(
          auth,
          cleanEmail,
          password
        );

        onSuccess({
          uid: cred.user.uid,
          name: cred.user.displayName || cleanName || undefined,
          email: cred.user.email || cleanEmail,
          mode: 'login',
        });
      }
    } catch (err) {
      const friendly = getFriendlyAuthError(err);
      setError(friendly.message);
      if (friendly.suggestLogin) {
        setShowLoginSwitch(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setShowLoginSwitch(false);
    setLoading(true);

    try {
      const cred = await signInWithPopup(auth, googleProvider);
      onSuccess({
        uid: cred.user.uid,
        name: cred.user.displayName || undefined,
        email: cred.user.email || '',
        mode: 'google',
      });
    } catch (err) {
      const friendly = getFriendlyAuthError(err);
      setError(friendly.message);
      if (friendly.suggestLogin) {
        setShowLoginSwitch(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldBoxStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '11px 13px',
    borderRadius: '12px',
    border: dark
      ? '1px solid rgba(134, 239, 172, 0.2)'
      : '1px solid rgba(24, 34, 24, 0.16)',
    backgroundColor: dark ? 'rgba(15, 20, 16, 0.78)' : '#fafaf7',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: dark
          ? 'radial-gradient(circle at top, rgba(21, 128, 61, 0.22), #0f1410 60%)'
          : 'radial-gradient(circle at top, rgba(187, 247, 208, 0.55), #f7f5ef 62%)',
        color: dark ? '#f4f6f2' : '#182218',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          padding: '32px',
          borderRadius: '26px',
          backgroundColor: dark
            ? 'rgba(22, 32, 24, 0.92)'
            : 'rgba(255, 255, 255, 0.95)',
          border: dark
            ? '1px solid rgba(134, 239, 172, 0.24)'
            : '1px solid rgba(21, 128, 61, 0.18)',
          boxShadow: dark
            ? '0 24px 60px rgba(0, 0, 0, 0.45)'
            : '0 20px 50px rgba(24, 34, 24, 0.08)',
        }}
      >
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: 'none',
              color: dark ? '#86efac' : '#15803d',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              padding: 0,
              marginBottom: '16px',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        )}

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 11px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 600,
            marginBottom: '12px',
            backgroundColor: dark
              ? 'rgba(134, 239, 172, 0.12)'
              : 'rgba(21, 128, 61, 0.1)',
            color: dark ? '#86efac' : '#15803d',
          }}
        >
          <Sprout size={14} />
          <span>Organic Devbhoomi</span>
        </div>

        <h1 style={{ fontSize: '26px', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          {mode === 'login' ? 'Member Login' : 'Create Account'}
        </h1>
        <p style={{ fontSize: '14px', opacity: 0.78, margin: '0 0 22px' }}>
          {mode === 'login'
            ? 'Sign in to access your Organic Devbhoomi profile.'
            : 'Register a new account to get started.'}
        </p>

        {error && (
          <div
            style={{
              padding: '11px 13px',
              borderRadius: '12px',
              marginBottom: '16px',
              fontSize: '13px',
              backgroundColor: 'rgba(220, 38, 38, 0.12)',
              color: dark ? '#fca5a5' : '#b91c1c',
              border: '1px solid rgba(220, 38, 38, 0.35)',
            }}
          >
            <div>{error}</div>
            {showLoginSwitch && mode === 'register' && (
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setShowLoginSwitch(false);
                  setMode('login');
                }}
                style={{
                  marginTop: '8px',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  fontWeight: 700,
                  fontSize: '13px',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: dark ? '#86efac' : '#15803d',
                }}
              >
                Switch to Login now
              </button>
            )}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          {mode === 'register' && (
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                Full Name
              </label>
              <div style={fieldBoxStyle}>
                <User size={16} style={{ opacity: 0.65 }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  disabled={loading}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    color: 'inherit',
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '6px',
              }}
            >
              Email Address
            </label>
            <div style={fieldBoxStyle}>
              <Mail size={16} style={{ opacity: 0.65 }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: 'inherit',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '6px',
              }}
            >
              Password
            </label>
            <div style={fieldBoxStyle}>
              <Lock size={16} style={{ opacity: 0.65 }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={loading}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: 'inherit',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '4px',
              padding: '13px 16px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#15803d',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '15px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? 'Please wait...'
              : mode === 'login'
              ? 'Sign In'
              : 'Create Account'}
          </button>
        </form>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '16px 0',
            fontSize: '12px',
            fontWeight: 600,
            opacity: 0.7,
          }}
        >
          <span
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: dark
                ? 'rgba(255,255,255,0.14)'
                : 'rgba(24,34,24,0.14)',
            }}
          />
          <span>or</span>
          <span
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: dark
                ? 'rgba(255,255,255,0.14)'
                : 'rgba(24,34,24,0.14)',
            }}
          />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '12px 16px',
            borderRadius: '12px',
            border: dark
              ? '1px solid rgba(255,255,255,0.2)'
              : '1px solid rgba(24,34,24,0.18)',
            backgroundColor: dark ? '#0f1410' : '#ffffff',
            color: 'inherit',
            fontWeight: 600,
            fontSize: '14px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.5-1.14 2.77-2.4 3.62v3.01h3.88c2.27-2.09 3.54-5.17 3.54-9.37z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.01c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.26v3.11C3.23 21.3 7.3 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.28c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.61H1.26C.46 8.2 0 10.04 0 12s.46 3.8 1.26 5.39l4.02-3.11z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.3 0 3.23 2.7 1.26 6.61l4.02 3.11c.95-2.85 3.6-4.97 6.72-4.97z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div
          style={{
            marginTop: '18px',
            textAlign: 'center',
            fontSize: '13px',
            opacity: 0.85,
          }}
        >
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setError('');
                  setShowLoginSwitch(false);
                  setMode('register');
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: dark ? '#86efac' : '#15803d',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  padding: 0,
                }}
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setError('');
                  setShowLoginSwitch(false);
                  setMode('login');
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: dark ? '#86efac' : '#15803d',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  padding: 0,
                }}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}