'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingBag,
  Menu,
  Moon,
  Sun,
  UserRound
} from 'lucide-react';

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 64 54">
        <path d="M4 45 25 17l10 13L45 15l15 30H4Z" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinejoin="round"/>
        <path d="M25 17 31 25 35 30M13 45c5-9 13-13 23-12M35 33c4-7 10-10 17-11" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round"/>
        <path d="M35 33c-1-7 2-12 9-15 1 7-2 12-9 15Z" fill="currentColor"/>
      </svg>
    </div>
  );
}

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
    opacity: 100,
    borderBottom: '1px solid #e5e9e4'
  }}
>
      <button className="icon-btn mobile-menu" onClick={() => setMobileMenu(!mobileMenu)}>
        <Menu />
      </button>

      <Link className="brand" href="/">
        <BrandMark />
        <span><b>organic</b><strong>devbhoomi</strong></span>
      </Link>

      <nav className={mobileMenu ? 'nav open' : 'nav'}>
        <Link href="/">Home</Link>
        <Link href="/collections">Shop</Link>
        <Link href="/#story">Our Story</Link>
        <Link href="/#journal">Journal</Link>
      </nav>

      <div className="header-actions">
        <label className="search-box">
          <Search size={17} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
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