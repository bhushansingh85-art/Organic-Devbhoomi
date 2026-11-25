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

const navLeaves = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/collections' },
  { label: 'Our Story', href: '/#story' },
  { label: 'Journal', href: '/#journal' },
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
        @keyframes leafSlideIn {
          0% {
            opacity: 0;
            transform: translateX(-28px) rotate(-14deg) scale(0.92);
          }
          70% {
            opacity: 1;
            transform: translateX(4px) rotate(2deg) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateX(0) rotate(0deg) scale(1);
          }
        }

        .leaf-menu-drawer {
          position: fixed;
          top: 68px;
          left: 14px;
          width: min(280px, calc(100vw - 28px));
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 14px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.98);
          border: 1px solid rgba(27, 67, 50, 0.16);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
          z-index: 9999;
        }

        .leaf-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 16px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          color: #102a1e;
          background: linear-gradient(135deg, #d8f3dc 0%, #95d5b2 55%, #74c69d 100%);
          border: 1px solid #40916c;
          border-radius: 4px 22px 6px 22px;
          box-shadow: 0 6px 14px rgba(27, 67, 50, 0.14);
          animation: leafSlideIn 0.38s cubic-bezier(0.22, 1, 0.36, 1) both;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .leaf-nav-item:hover {
          transform: translateX(5px);
          background: linear-gradient(135deg, #b7e4c7 0%, #74c69d 60%, #52b788 100%);
        }

        .leaf-nav-item::before {
          content: '🍃';
          font-size: 15px;
          line-height: 1;
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
        <div className="leaf-menu-drawer" role="menu" aria-label="Leaf navigation menu">
          {navLeaves.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              className="leaf-nav-item"
              style={{ animationDelay: `${idx * 75}ms` }}
              onClick={() => setMobileMenu(false)}
            >
              {item.label}
            </Link>
          ))}
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
