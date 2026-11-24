
import { Sprout, Store, UserRound } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <a href="/">
        <Sprout />
        <span>Home</span>
      </a>

      <a href="/collections">
        <Store />
        <span>Shop</span>
      </a>

      <a href="/profile">
        <UserRound />
        <span>Profile</span>
      </a>
    </nav>
  );
}
