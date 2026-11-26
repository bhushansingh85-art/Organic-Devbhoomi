'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const { dark, toggleDark } = useTheme();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    root.classList.toggle('dark', Boolean(dark));
  }, [dark]);

  const handleBasketClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onOpenCart) {
      e.preventDefault();
      onOpenCart();
    }
  };

  const handleAccountClick = () => {
    router.push('/Login');
  };

  return (
    <header className="header">
      <button
        type="button"
        className="icon-btn mobile-menu"
        aria-label="Toggle menu"
        aria-expanded={mobileMenu}
        onClick={() => setMobileMenu((prev) => !prev)}
        style={{
          width: 40,
          height: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4.5,
          background: mobileMenu ? '#174d35' : 'var(--surface)',
          color: mobileMenu ? '#ffffff' : 'var(--text)',
          border: '1px solid var(--border)',
          borderRadius: '999px',
          padding: 0,
          position: mobileMenu ? 'fixed' : 'relative',
          top: mobileMenu ? 14 : 'auto',
          left: mobileMenu ? 14 : 'auto',
          zIndex: 10001,
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
            transition: 'transform 0.25s ease',
          }}
        />
        <span
          style={{
            width: 12,
            height: 2,
            borderRadius: 999,
            background: 'currentColor',
            opacity: mobileMenu ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }}
        />
        <span
          style={{
            width: 18,
            height: 2,
            borderRadius: 999,
            background: 'currentColor',
            transform: mobileMenu ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            transition: 'transform 0.25s ease',
          }}
        />
      </button>

      <Link className="brand" href="/">
        <BrandMark />
        <span>
          <b>organic</b>
          <strong>devbhoomi</strong>
        </span>
      </Link>

      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/collections">Shop</Link>
        <Link href="/#story">Our Story</Link>
        <Link href="/#journal">Journal</Link>
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
              style={{ animationDelay: `${idx * 160}ms` }}
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
        <button
          type="button"
          className="icon-btn theme-btn"
          aria-label="Toggle theme"
          onClick={toggleDark}
        >
          {dark ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <button
          type="button"
          className="icon-btn account-btn"
          aria-label="Account"
          onClick={handleAccountClick}
        >
          <UserRound size={19} />
        </button>
        <Link className="cart-trigger" href="/cart" onClick={handleBasketClick}>
          <ShoppingBasket size={19} />
          <span>Basket</span>
          <i>{cartCount}</i>
        </Link>
      </div>
    </header>
  );
}