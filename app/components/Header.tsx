'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Basket, Moon, Sun, UserRound } from 'lucide-react';

type HeaderProps = {
  cartCount?: number;
  onOpenCart?: () => void;
};

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
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/collections' },
  { label: 'Our Story', href: '/#story' },
  { label: 'Journal', href: '/#journal' },
];

export default function Header({ cartCount = 0, onOpenCart }: HeaderProps) {
  const [dark, setDark] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState('');

  const handleBasketClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onOpenCart) {
      e.preventDefault();
      onOpenCart();
    }
  };

  return (
    <header
      className="header"
      style={{
        background: '#ffffff',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        opacity: 1,
        borderBottom: '1px solid #e5e9e4',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <style>{`
        @keyframes bigLeafEnter {
          0% {
            opacity: 0;
            transform: translateX(-80px) translateY(28px) rotate(-18deg) scale(0.78);
          }
          68% {
            opacity: 1;
            transform: translateX(8px) translateY(-2px) rotate(2deg) scale(1.03);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0) rotate(0deg) scale(1);
          }
        }

        .leaf-screen-overlay {
          position: fixed;
          inset: 0;
          padding: 84px 20px 28px;
          background: rgba(12, 34, 24, 0.72);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
          overflow-y: auto;
        }

        .big-leaf-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          min-height: 68px;
          padding: 16px 24px;
          text-decoration: none;
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          background-color: #40916c;
          border: 2px solid #74c69d;
          border-radius: 8px 56px 10px 56px;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
          cursor: pointer;
          animation: bigLeafEnter 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
          transition: transform 0.22s ease, background-color 0.22s ease;
        }

        .big-leaf-btn:hover {
          transform: translateX(8px) scale(1.01);
          background-color: #2d6a4f;
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
          position: mobileMenu ? 'fixed' : 'relative',
          top: mobileMenu ? 14 : 'auto',
          left: mobileMenu ? 14 : 'auto',
          zIndex: 10001,
          transition: 'background-color 0.25s ease, color 0.25s ease, top 0.25s ease',
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
          className="leaf-screen-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Leaf navigation options"
        >
          {leafChoices.map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              className="big-leaf-btn"
              style={{ animationDelay: `${idx * 90}ms` }}
              onClick={() => setMobileMenu(false)}
            >
              <span>{item.label}</span>
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
        <Link className="cart-trigger" href="/cart" onClick={handleBasketClick}>
          <ShoppingBag size={19} />
          <span>Basket</span>
          <i>{cartCount}</i>
        </Link>
      </div>
    </header>
  );
}
