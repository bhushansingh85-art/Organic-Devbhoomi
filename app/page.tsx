'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf, Sprout, UserRound } from 'lucide-react';

function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const syncTheme = () => setDark(mediaQuery.matches);
    syncTheme();
    mediaQuery.addEventListener('change', syncTheme);
    return () => mediaQuery.removeEventListener('change', syncTheme);
  }, []);

  return { dark };
}

const BASE_PATH = '/Organic-Devbhoomi';

interface LoginProps {
  initialMode?: 'login' | 'register';
  onSuccess?: (userInfo: { name?: string; email: string; mode: 'login' | 'register' }) => void;
}

export default function Login({ initialMode = 'login', onSuccess }: LoginProps) {
  const { dark } = useTheme();
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const previousUrlRef = useRef<string | null>(null);

  const syncUrl = (loginMode: boolean) => {
    if (typeof window === 'undefined') return;

    if (previousUrlRef.current === null) {
      previousUrlRef.current =
        window.location.pathname + window.location.search + window.location.hash;
    }

    const nextPath = loginMode
      ? `${BASE_PATH}/profile/login`
      : `${BASE_PATH}/profile/register`;

    if (window.location.pathname !== nextPath) {
      window.history.pushState(
        { authMode: loginMode ? 'login' : 'register' },
        '',
        nextPath
      );
    }
  };

  useEffect(() => {
    syncUrl(isLogin);
  }, [isLogin]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.endsWith('/register')) {
        setIsLogin(false);
      } else if (path.endsWith('/login')) {
        setIsLogin(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (typeof window !== 'undefined' && previousUrlRef.current !== null) {
        window.history.replaceState({}, '', previousUrlRef.current);
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
        mode: isLogin ? 'login' : 'register',
      });
    }, 900);
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
          maxWidth: '430px',
          borderRadius: '24px',
          padding: '36px 32px',
          backgroundColor: dark ? '#162018' : '#ffffff',
          border: dark
            ? '1px solid rgba(134, 239, 172, 0.2)'
            : '1px solid rgba(24, 34, 24, 0.12)',
          boxShadow: dark
            ? '0 18px 40px rgba(0, 0, 0, 0.45)'
            : '0 18px 40px rgba(24, 34, 24, 0.08)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: dark ? '#86efac' : '#15803d',
            marginBottom: '12px',
          }}
        >
          <Leaf size={15} />
          <span>Organic Devbhoomi · Account</span>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 8px' }}>
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h1>

        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.5,
            margin: '0 0 24px',
            opacity: 0.82,
          }}
        >
          {isLogin
            ? 'Sign in to access your profile, saved picks, and orders from Himachal.'
            : 'New to Organic Devbhoomi? Register to start exploring nature-grown essentials.'}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            padding: '6px',
            borderRadius: '14px',
            marginBottom: '22px',
            backgroundColor: dark ? '#0f1410' : '#eef2ea',
          }}
        >
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            style={{
              padding: '10px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              backgroundColor: isLogin
                ? dark
                  ? '#1f3a27'
                  : '#15803d'
                : 'transparent',
              color: isLogin
                ? '#ffffff'
                : dark
                  ? '#d1d5db'
                  : '#374151',
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            style={{
              padding: '10px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              backgroundColor: !isLogin
                ? dark
                  ? '#1f3a27'
                  : '#15803d'
                : 'transparent',
              color: !isLogin
                ? '#ffffff'
                : dark
                  ? '#d1d5db'
                  : '#374151',
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                <UserRound size={14} /> Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  backgroundColor: dark ? '#0f1410' : '#f9faf8',
                  color: dark ? '#f4f6f2' : '#182218',
                  border: dark
                    ? '1px solid rgba(255,255,255,0.16)'
                    : '1px solid rgba(24,34,24,0.18)',
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
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
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: dark ? '#0f1410' : '#f9faf8',
                color: dark ? '#f4f6f2' : '#182218',
                border: dark
                  ? '1px solid rgba(255,255,255,0.16)'
                  : '1px solid rgba(24,34,24,0.18)',
              }}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
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
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: dark ? '#0f1410' : '#f9faf8',
                color: dark ? '#f4f6f2' : '#182218',
                border: dark
                  ? '1px solid rgba(255,255,255,0.16)'
                  : '1px solid rgba(24,34,24,0.18)',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '13px 16px',
              borderRadius: '12px',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontWeight: 700,
              fontSize: '15px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#15803d',
              color: '#ffffff',
              opacity: isLoading ? 0.75 : 1,
            }}
          >
            <span>
              {isLoading
                ? 'Please wait...'
                : isLogin
                  ? 'Login to Account'
                  : 'Register Account'}
            </span>
            <ArrowRight size={17} />
          </button>
        </form>

        <div
          style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: dark
              ? '1px solid rgba(255,255,255,0.1)'
              : '1px solid rgba(24,34,24,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px',
          }}
        >
          <span>
            {isLogin ? 'New user here?' : 'Already have an account?'}
          </span>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              color: dark ? '#86efac' : '#15803d',
            }}
          >
            {isLogin ? 'Please register' : 'Please login'}
          </button>
        </div>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              textDecoration: 'none',
              color: dark ? '#cbd5e1' : '#334155',
            }}
          >
            <Sprout size={14} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}