'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ShoppingBag,
  ArrowRight,
  Heart,
  Truck,
  ShieldCheck,
  MessageCircle,
  ChevronRight,
  Sparkles,
  UserRound,
  Store,
  Sprout,
  X,
  Leaf,
} from 'lucide-react';
import Header from './components/Header';
import { useTheme } from './context/ThemeContext';

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

export default function Home() {
  const { dark } = useTheme();
  const [cartOpen, setCartOpen] = useState(false);
  const [cart] = useState<Record<number, number>>({});
  const [mobileMenu, setMobileMenu] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatText, setChatText] = useState('');
  const [chatMessages, setChatMessages] = useState<string[]>([
    'Hi! I’m Dev AI 🌿 How can I help you find something from nature today?',
  ]);

  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  const sendChat = () => {
    if (!chatText.trim()) return;
    setChatMessages((m) => [
      ...m,
      chatText.trim(),
      'Thanks for asking! I can help with product discovery and order questions. Connect the AI service to enable live answers.',
    ]);
    setChatText('');
  };

  return (
    <main className={dark ? 'site dark' : 'site'}>
      <div className="announcement">
        <span>🌱 Fresh from the hills of Himachal</span>
        <span className="announce-right">Thoughtfully grown. Naturally yours.</span>
      </div>

      <Header
        cartCount={count}
        onOpenCart={() => setCartOpen(true)}
      />

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            className="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenu(false)}
          />
        )}
      </AnimatePresence>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" /> ROOTED IN THE HIMALAYAS
          </div>
          <h1>
            Bring home a little
            <br />
            <em>more nature.</em>
          </h1>
          <p>
            From thriving greens to orchard-fresh goodness, discover the simple joy of living
            closer to nature.
          </p>
          <div className="hero-actions">
            <Link className="primary-btn" href="/collections">
              Explore the collection
              <ArrowRight size={17} />
            </Link>
            <a className="text-link" href="#story">
              Our story <ChevronRight size={16} />
            </a>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars">
              <span>🌿</span>
              <span>🍎</span>
              <span>🌼</span>
            </div>
            <div>
              <b>Grown with care</b>
              <small>From local Himachali growers</small>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image" />
          <div className="hero-stamp">
            <BrandMark />
            <span>
              GOOD THINGS
              <br />
              GROW HERE
            </span>
          </div>
          <div className="floating-note">
            <span className="note-icon">
              <Leaf size={17} />
            </span>
            <span>
              <b>Nature, delivered</b>
              <small>Fresh picks. Happy homes.</small>
            </span>
          </div>
        </div>
        <div className="hero-bottom-label">
          01 — THE NATURE EDIT <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      <section className="benefits">
        <div>
          <Sprout />
          <span>
            <b>Rooted in nature</b>
            <small>Thoughtfully selected</small>
          </span>
        </div>
        <div>
          <Truck />
          <span>
            <b>Across Himachal</b>
            <small>Delivery to your doorstep</small>
          </span>
        </div>
        <div>
          <ShieldCheck />
          <span>
            <b>Carefully packed</b>
            <small>Quality you can trust</small>
          </span>
        </div>
        <div>
          <Heart />
          <span>
            <b>Made for living</b>
            <small>A little greener every day</small>
          </span>
        </div>
      </section>

      <section className="seasonal">
        <div className="seasonal-photo" />
        <div className="seasonal-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" /> SEASONAL, SIMPLE, SPECIAL
          </div>
          <h2>
            A season for
            <br />
            <em>slower living.</em>
          </h2>
          <p>
            Celebrate what’s growing right now. Explore seasonal favourites picked with the rhythm
            of the hills.
          </p>
          <Link className="primary-btn" href="/collections">
            Shop seasonal picks
            <ArrowRight size={17} />
          </Link>
          <small className="season-note">THE HIMALAYAN SEASONAL EDIT · NO. 01</small>
        </div>
      </section>

      <section className="story-section section-wrap" id="story">
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1100&q=85"
            alt="Lush green fields in the hills"
          />
          <div className="story-caption">A closer connection to the land.</div>
        </div>
        <div className="story-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" /> A LITTLE ABOUT US
          </div>
          <h2>
            Inspired by the
            <br />
            <em>Devbhoomi.</em>
          </h2>
          <p>
            We believe the best things grow with care. Organic Devbhoomi brings together plants,
            seasonal produce, flowers and seeds — celebrating the beauty and abundance of Himachal.
          </p>
          <a className="text-link dark-link" href="#journal">
            Get to know us <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section className="journal section-wrap" id="journal">
        <div className="journal-top">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" /> NOTES FROM NATURE
            </div>
            <h2>
              Grow a little
              <br />
              <em>every day.</em>
            </h2>
          </div>
          <a className="text-link" href="#journal">
            Visit the journal <ArrowRight size={16} />
          </a>
        </div>
        <div className="journal-grid">
          <article>
            <img
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=85"
              alt="Indoor plant care"
            />
            <span>PLANT CARE · 5 MIN READ</span>
            <h3>A happier home starts with a little green.</h3>
          </article>
          <article>
            <img
              src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=900&q=85"
              alt="Fresh seasonal fruit"
            />
            <span>SEASONAL LIVING · 4 MIN READ</span>
            <h3>Eating with the seasons, naturally.</h3>
          </article>
          <article>
            <img
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=900&q=85"
              alt="Garden flowers"
            />
            <span>GARDEN NOTES · 6 MIN READ</span>
            <h3>Make room for a garden of your own.</h3>
          </article>
        </div>
      </section>

      <section className="newsletter">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> A NOTE FROM NATURE
          </div>
          <h2>
            Good things grow
            <br />
            <em>when we stay connected.</em>
          </h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(
              'Newsletter signup UI preview — connect a mailing service to enable subscriptions.'
            );
          }}
        >
          <input type="email" required placeholder="Your email address" />
          <button type="submit">
            Join our list <ArrowRight size={16} />
          </button>
          <small>Seasonal updates, growing tips and fresh finds. No noise.</small>
        </form>
      </section>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="#home">
              <BrandMark />
              <span>
                <b>organic</b>
                <strong>devbhoomi</strong>
              </span>
            </a>
            <p>
              From Nature to Your Home.
              <br />A little closer to the goodness of Himachal.
            </p>
          </div>
          <div>
            <b>Explore</b>
            <a href="#shop">Shop all</a>
            <a href="#shop">Plants</a>
            <a href="#shop">Fresh fruits</a>
            <a href="#shop">Flowers &amp; seeds</a>
          </div>
          <div>
            <b>Help &amp; info</b>
            <a href="#story">Our story</a>
            <a href="#journal">Journal</a>
            <a href="#">Shipping &amp; delivery</a>
            <a href="#">Contact us</a>
          </div>
          <div>
            <b>Stay connected</b>
            <p className="footer-small">Have a question? Our team would love to help.</p>
            <button className="whatsapp-link" onClick={() => setChatOpen(true)}>
              <MessageCircle size={16} /> Chat with Dev AI
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Organic Devbhoomi</span>
          <span>Made with care in Himachal Pradesh ♡</span>
          <span>Privacy · Terms</span>
        </div>
      </footer>

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

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              className="drawer-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
            />
            <motion.aside
              className="cart-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            >
              <div className="drawer-head">
                <div>
                  <h2>
                    Your basket <span>({count})</span>
                  </h2>
                </div>
                <button className="icon-btn" onClick={() => setCartOpen(false)}>
                  <X />
                </button>
              </div>
              <div className="cart-empty">
                <div className="empty-bag">
                  <ShoppingBag size={30} />
                </div>
                <h3>Your basket is taking a little nap.</h3>
                <p>Add something lovely from nature to wake it up.</p>
                <Link
                  className="primary-btn"
                  href="/collections"
                  onClick={() => setCartOpen(false)}
                >
                  Explore products <ArrowRight size={16} />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24 }}
          >
            <div className="chat-head">
              <div className="bot-avatar">
                <Sparkles />
              </div>
              <div>
                <b>Dev AI</b>
                <small>
                  <span /> Here to help you grow
                </small>
              </div>
              <button className="icon-btn" onClick={() => setChatOpen(false)}>
                <X />
              </button>
            </div>
            <div className="chat-body">
              {chatMessages.map((m, i) => (
                <div className={i % 2 === 0 ? 'bot-message' : 'user-message'} key={i}>
                  {m}
                </div>
              ))}
            </div>
            <form
              className="chat-input"
              onSubmit={(e) => {
                e.preventDefault();
                sendChat();
              }}
            >
              <input
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                placeholder="Ask me anything..."
              />
              <button type="submit">
                <ArrowRight />
              </button>
            </form>
            <div className="chat-disclaimer">Demo assistant · Connect an AI API for live answers</div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
