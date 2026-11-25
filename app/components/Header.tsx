'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBasket, Moon, Sun, UserRound } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
  const { dark, toggleDark } = useTheme();
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
        background: dark ? 'var(--header-bg, #141414)' : 'var(--bg, #ffffff)',
      }}
    >
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Organic Devbhoomi Home">
          <BrandMark />
          <span className="brand-text">Organic Devbhoomi</span>
        </Link>

        <nav className="nav-links" aria-label="Primary Navigation">
          {leafChoices.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="search-box">
            <Search size={16} aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              aria-label="Search products"
            />
          </div>

          <button
            type="button"
            onClick={toggleDark}
            className="icon-btn"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            href="/collections"
            onClick={handleBasketClick}
            className="icon-btn cart-btn"
            aria-label="Shopping Basket"
          >
            <ShoppingBasket size={18} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <Link href="/account" className="icon-btn" aria-label="User Account">
            <UserRound size={18} />
          </Link>

          <button
            type="button"
            className="icon-btn mobile-menu-btn"
            onClick={() => setMobileMenu((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {mobileMenu ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="mobile-menu">
          {leafChoices.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              onClick={() => setMobileMenu(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
