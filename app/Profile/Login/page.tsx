'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, LogOut, Sprout, UserRound } from 'lucide-react';
import Header from '../../components/Header';
import { useTheme } from '../../context/ThemeContext';
import Login from './login';

interface UserProfile {
  name: string;
  email: string;
  mode: 'login' | 'register';
}

interface AuthSuccessPayload {
  name?: string;
  email: string;
  mode: 'login' | 'register';
}

export default function ProfilePage() {
  const { dark } = useTheme();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authChoice, setAuthChoice] = useState<'choose' | 'login' | 'register'>('choose');

  if (user) {
    return (
      <main className={dark ? 'site dark' : 'site'}>
        <Header cartCount={0} onOpenCart={() => {}} />
        <section
          style={{
            maxWidth: '640px',
            margin: '48px auto',
            padding: '0 20px',
          }}
        >
          <div
            style={{
              padding: '28px',
              borderRadius: '20px',
              backgroundColor: dark ? '#162018' : '#ffffff',
              border: dark
                ? '1px solid rgba(134, 239, 172, 0.22)'
                : '1px solid rgba(24, 34, 24, 0.12)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                color: dark ? '#86efac' : '#15803d',
                marginBottom: '10px',
              }}
            >
              <UserRound size={16} />
              <span>Organic Devbhoomi Profile</span>
            </div>

            <h1 style={{ fontSize: '26px', margin: '0 0 8px' }}>
              Namaste, {user.name}
            </h1>
            <p style={{ fontSize: '14px', opacity: 0.82, margin: '0 0 24px' }}>
              {user.email}
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="/collections/"
                className="primary-btn"
                style={{ textDecoration: 'none' }}
              >
                <Sprout size={16} />
                <span>Explore Shop</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setUser(null);
                  setAuthChoice('choose');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: dark
                    ? '1px solid rgba(255,255,255,0.2)'
                    : '1px solid rgba(24,34,24,0.2)',
                  background: 'transparent',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (authChoice === 'choose') {
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
            textAlign: 'center',
            backgroundColor: dark ? '#162018' : '#ffffff',
            border: dark
              ? '1px solid rgba(134, 239, 172, 0.22)'
              : '1px solid rgba(24, 34, 24, 0.12)',
          }}
        >
          <h1 style={{ fontSize: '26px', margin: '0 0 10px' }}>Your Profile</h1>
          <p style={{ fontSize: '14px', opacity: 0.82, margin: '0 0 24px' }}>
            Continue with an existing account or register as a new member.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setAuthChoice('login')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '13px 16px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#15803d',
                color: '#ffffff',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <span>Login</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={() => setAuthChoice('register')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '13px 16px',
                borderRadius: '12px',
                border: dark
                  ? '1px solid rgba(134, 239, 172, 0.35)'
                  : '1px solid #15803d',
                backgroundColor: 'transparent',
                color: dark ? '#86efac' : '#15803d',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <span>Register</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedMode: 'login' | 'register' = authChoice;

  return (
    <Login
      initialMode={selectedMode}
      onSuccess={(info: AuthSuccessPayload) => {
        setUser({
          name: info.name || info.email.split('@')[0],
          email: info.email,
          mode: info.mode,
        });
      }}
    />
  );
}