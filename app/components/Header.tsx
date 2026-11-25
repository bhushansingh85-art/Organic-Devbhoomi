'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Moon, Sun, UserRound } from 'lucide-react';

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 64 54">
        <path
          d="M4 45 25 17l10 13L45 15l15 30H4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
        <path
          d="M25 17 31 25 35 30M13 45c5-9 13-13 23-12M35 33c4-7 10-10 17-11"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path
          d="M35 33c-1-7 2-12 9-15 1 7-2 12-9 15Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

const leafChoices = [
  { label: 'Home', href: '/', gradStart: '#95d5b2', gradEnd: '#2d6a4f' },
  { label: 'Shop', href: '/collections', gradStart: '#74c69d', gradEnd: '#1b4332' },
  { label: 'Our Story', href: '/#story', gradStart: '#b7e4c7', gradEnd: '#40916c' },
  { label: 'Journal', href: '/#journal', gradStart: '#80ed99', gradEnd: '#2b9348' },
  { label: 'Close', href: null, gradStart: '#d8f3dc', gradEnd: '#52b788' },
];

export default function Header() {
  const [dark, setDark] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <header
      className="header"
      style={{
        background: '#ffffff',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        opacity: 1,
        borderBottom: '1px solid #e5e9e4',
        position: 'relative',
        zIndex: 50,
      }}
    >
      <style>{`
        @keyframes realLeafDrop {
          0% {
            opacity: 0;
            transform: translateX(-115px) translateY(34px) rotate(-28deg) scale(0.7);
          }
          72% {
            opacity: 1;
            transform: translateX(8px) translateY(-3px) rotate(3deg) scale(1.03);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0) rotate(0deg) scale(1);
          }
        }

        .real-leaf-screen {
          position: fixed;
          inset: 0;
          padding: 78px 18px 24px;
          background: rgba(9, 28, 19, 0.72);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          overflow-y: auto;
        }

        .real-leaf-slot {
          position: relative;
          width: min(390px, 100%);
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: realLeafDrop 0.48s cubic-bezier(0.22, 1, 0.36, 1) both;
          transition: transform 0.22s ease;
        }

        .real-leaf-slot:hover {
          transform: translateX(8px) scale(1.03);
        }

        .real-leaf-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 12px 18px rgba(0, 0, 0, 0.32));
          pointer-events: none;
        }

        .real-leaf-link,
        .real-leaf-btn {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 38px 0 34px;
          text-decoration: none;
          border: none;
          background: transparent;
          color: #ffffff;
          font-size: 19px;
          font-weight: 700;
          letter-spacing: 0.2px;
          cursor: pointer;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
        }

        .real-leaf-badge {
          width: 28px;
          height: 28px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          font-size: 13px;
          font-weight: 800;
          background: rgba(255, 255, 255, 0.24);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.45);
        }
      `}</style>

      <button
        type="button"
        className="icon-btn mobile-menu"
        aria-label="Toggle menu"
        aria-expanded={mobileMenu}
        onClick={() => setMobileMenu((prev) => !prev)}
        style={{
          width: 42,
          height: 42,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4.5,
          background: mobileMenu ? '#1b4332' : '#f4f6f4',
          color: mobileMenu ? '#ffffff' : '#1b4332',
          border: '1px solid rgba(27, 67, 50, 0.22)',
          borderRadius: '999px',
          cursor: 'pointer',
          padding: 0,
          position: 'relative',
          zIndex: 10000,
          transition: 'background-color 0.25s ease, color 0.25s ease',
        }}
      >
        <span
          style={{
            width: 18,
            height: 2,
            borderRadius: 999,
            background: 'currentColor',
            transform: mobileMenu ? 'translateY(6.5px) rotate(45deg)' : 'none',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
        <span
          style={{
            width: mobileMenu ? 0 : 12,
            height: 2,
            borderRadius: 999,
            background: 'currentColor',
            opacity: mobileMenu ? 0 : 1,
            transition: 'width 0.22s ease, opacity 0.2s ease',
          }}
        />
        <span
          style={{
            width: 18,
            height: 2,
            borderRadius: 999,
            background: 'currentColor',
            transform: mobileMenu ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
      </button>

      <Link className="brand" href="/">
        <BrandMark />
        <span><b>organic</b><strong>devbhoomi</strong></span>
      </Link>

      <nav className={mobileMenu ? 'nav open' : 'nav'}>
        <Link href="/" onClick={() => setMobileMenu(false)}>Home</Link>
        <Link href="/collections" onClick={() => setMobileMenu(false)}>Shop</Link>
        <Link href="/#story" onClick={() => setMobileMenu(false)}>Our Story</Link>
        <Link href="/#journal" onClick={() => setMobileMenu(false)}>Journal</Link>
      </nav>

      {mobileMenu && (
        <div
          className="real-leaf-screen"
          role="dialog"
          aria-modal="true"
          aria-label="Leaf navigation menu"
        >
          {leafChoices.map((item, idx) => {
            const gradId = `leaf-grad-${idx}`;
            return (
              <div
                key={item.label}
                className="real-leaf-slot"
                style={{ animationDelay: `${idx * 95}ms` }}
              >
                <svg
                  className="real-leaf-svg"
                  viewBox="0 0 390 88"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={item.gradStart} />
                      <stop offset="100%" stopColor={item.gradEnd} />
                    </linearGradient>
                  </defs>
                  {/* नुकीली नोक और घुमावदार किनारों वाली पत्ती */}
                  <path
                    d="M 14 45 C 52 10, 178 4, 292 24 C 334 31, 362 39, 376 45 C 362 51, 334 59, 292 66 C 178 86, 52 80, 14 45 Z"
                    fill={`url(#${gradId})`}
                    stroke="rgba(216, 243, 220, 0.72)"
                    strokeWidth="1.6"
                  />
                  {/* पत्ती की बीच वाली नस */}
                  <path
                    d="M 22 45 Q 195 43 362 45"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.38)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>

                {item.href ? (
                  <Link
                    href={item.href}
                    className="real-leaf-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    <span>{item.label}</span>
                    <span className="real-leaf-badge">{idx + 1}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="real-leaf-btn"
                    onClick={() => setMobileMenu(false)}
                  >
                    <span>{item.label}</span>
                    <span className="real-leaf-badge">{idx + 1}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="header-actions">
        <label className="search-box">
          <Search size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search plants, fruits..."
          />
        </label>
        <button className="icon-btn theme-btn" onClick={() => setDark(!dark)}>
          {dark ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <button className="icon-btn account-btn">
          <UserRound size={19} />
        </button>
        <Link className="cart-trigger" href="/cart">
          <ShoppingBag size={19} />
          <span>Basket</span>
          <i>0</i>
        </Link>
      </div>
    </header>
  );
}
