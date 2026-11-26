'use client';

import Link from 'next/link';
import { Sprout, Store, UserRound } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function BottomNav() {
  const { dark } = useTheme();

  return (
    <nav className={dark ? 'bottom-nav dark' : 'bottom-nav'}>
      <Link href="/">
        <Sprout />
        <span>Home</span>
      </Link>

      <Link href="/collections">
        <Store />
        <span>Shop</span>
      </Link>

      <Link href="/Profile/login">
        <UserRound />
        <span>Profile</span>
      </Link>
    </nav>
  );
}
