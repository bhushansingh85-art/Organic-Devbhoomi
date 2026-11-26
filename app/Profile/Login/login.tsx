'use client';

import React, { useState } from 'react';
import { ArrowLeft, Lock, Mail, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext'; // यदि यह फ़ाइल app/Profile/login.tsx में है तो '../context/ThemeContext' करें

export interface AuthSuccessPayload {
  name?: string;
  email: string;
  mode: 'login' | 'register';
}

interface LoginProps {
  initialMode?: 'login' | 'register';
  onSuccess: (payload: AuthSuccessPayload) => void;
  onBack?: () => void;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setError('Please enter your full name to register.');
      return;
    }

    onSuccess({
      name: mode === 'register' ? name.trim() : name.trim() || undefined,
      email: email.trim(),
      mode,
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: dark ? '#0f1410' : '#f7f5ef',
        color: dark ? '#f4f6f2' : '#182218',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '32px',
          borderRadius: '22px',
          backgroundColor: dark ? '#162018' : '#ffffff',
          border: dark
            ? '1px solid rgba(134, 239, 172, 0.22)'
            : '1px solid rgba(24, 34, 24, 0.12)',
        }}
      >
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: 'none',
              color: dark ? '#86efac' : '#15803d',
              cursor: 'pointer',
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

        <h1 style={{ fontSize: '26px', margin: '0 0 8px' }}>
          {mode === 'login' ? 'Member Login' : 'Create Account'}
        </h1>
        <p style={{ fontSize: '14px', opacity: 0.8, margin: '0 0 22px' }}>
          {mode === 'login'
            ? 'Sign in to access your Organic Devbhoomi profile.'
            : 'Register a new account to get started.'}
        </p>

        {error && (
          <div
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              marginBottom: '16px',
              fontSize: '13px',
              backgroundColor: 'rgba(220, 38, 38, 0.12)',
              color: dark ? '#fca5a5' : '#b91c1c',
              border: '1px solid rgba(220, 38, 38, 0.35)',
            }}
          >
            {error}
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: dark
                    ? '1px solid rgba(255,255,255,0.18)'
                    : '1px solid rgba(24,34,24,0.18)',
                  backgroundColor: dark ? '#0f1410' : '#fafafa',
                }}
              >
                <User size={16} style={{ opacity: 0.65 }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                borderRadius: '10px',
                border: dark
                  ? '1px solid rgba(255,255,255,0.18)'
                  : '1px solid rgba(24,34,24,0.18)',
                backgroundColor: dark ? '#0f1410' : '#fafafa',
              }}
            >
              <Mail size={16} style={{ opacity: 0.65 }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                borderRadius: '10px',
                border: dark
                  ? '1px solid rgba(255,255,255,0.18)'
                  : '1px solid rgba(24,34,24,0.18)',
                backgroundColor: dark ? '#0f1410' : '#fafafa',
              }}
            >
              <Lock size={16} style={{ opacity: 0.65 }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
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
            style={{
              marginTop: '6px',
              padding: '13px 16px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#15803d',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

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
                onClick={() => {
                  setError('');
                  setMode('register');
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: dark ? '#86efac' : '#15803d',
                  fontWeight: 700,
                  cursor: 'pointer',
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
                onClick={() => {
                  setError('');
                  setMode('login');
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: dark ? '#86efac' : '#15803d',
                  fontWeight: 700,
                  cursor: 'pointer',
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