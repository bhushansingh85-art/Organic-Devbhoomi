import Link from 'next/link';
import { Sprout, Store, UserRound } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link href="/">
        <Sprout />
        <span>Home</span>
      </Link>

      <Link href="/collections">
        <Store />
        <span>Shop</span>
      </Link>

      <Link href="/profile">
        <UserRound />
        <span>Profile</span>
      </Link>
    </nav>
  );
}
