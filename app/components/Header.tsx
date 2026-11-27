import React, { useState, useEffect } from 'react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface HeaderProps {
  navItems?: NavItem[];
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  cartCount?: number;
  isDark?: boolean;
  onToggleTheme?: () => void;
  onOpenCart?: () => void;
  onOpenAccount?: () => void;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'shop', label: 'Shop', href: '#shop' },
  { id: 'about', label: 'About', href: '#about' },
];

const LEAF_POSITION_CLASSES: readonly string[] = [
  'botanical-leaf--1',
  'botanical-leaf--2',
  'botanical-leaf--3',
];

export const Header: React.FC<HeaderProps> = ({
  navItems = DEFAULT_NAV_ITEMS,
  searchQuery = '',
  onSearchChange,
  cartCount = 0,
  isDark = false,
  onToggleTheme,
  onOpenCart,
  onOpenAccount,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [internalSearch, setInternalSearch] = useState<string>(searchQuery);

  useEffect(() => {
    setInternalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleToggleMenu = (): void => {
    setMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = (): void => {
    setMenuOpen(false);
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setInternalSearch(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (onSearchChange) {
      onSearchChange(internalSearch);
    }
  };

  return (
    <>
      <header className="header">
        <button
          type="button"
          className="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={handleToggleMenu}
        >
          <span />
          <span />
          <span />
        </button>

        <a href="#home" className="brand" onClick={handleCloseMenu}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 36 36" fill="none">
              <path
                d="M18 4C10 10 7 18 11 27C18 25 25 19 28 10C25 7 22 5 18 4Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span>
            <b>BOTANICAL</b>
            <strong>STUDIO</strong>
          </span>
        </a>

        <nav className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.id} href={item.href} onClick={handleCloseMenu}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <form className="search-box" onSubmit={handleSearchSubmit} role="search">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              placeholder="Search plants..."
              aria-label="Search plants"
              value={internalSearch}
              onChange={handleSearchInput}
            />
          </form>

          {onOpenAccount && (
            <button
              type="button"
              className="icon-btn account-btn"
              aria-label="Account"
              onClick={onOpenAccount}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          )}

          {onToggleTheme && (
            <button
              type="button"
              className="icon-btn"
              aria-label="Toggle dark mode"
              onClick={onToggleTheme}
            >
              {isDark ? '☀' : '☾'}
            </button>
          )}

          {onOpenCart && (
            <button
              type="button"
              className="cart-trigger"
              aria-label="Open cart"
              onClick={onOpenCart}
            >
              <span>Cart</span>
              <i>{cartCount}</i>
            </button>
          )}
        </div>
      </header>

      {menuOpen && (
        <>
          <div
            className="botanical-drawer-backdrop"
            onClick={handleCloseMenu}
            aria-hidden="true"
          />

          <div
            className="botanical-leaf-layer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile botanical navigation menu"
            onClick={handleCloseMenu}
          >
            {navItems.map((item, index) => {
              const positionClass =
                LEAF_POSITION_CLASSES[index % LEAF_POSITION_CLASSES.length];

              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`botanical-leaf ${positionClass}`}
                  style={{ animationDelay: `${0.06 + index * 0.12}s` }}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.stopPropagation();
                    handleCloseMenu();
                  }}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Header;