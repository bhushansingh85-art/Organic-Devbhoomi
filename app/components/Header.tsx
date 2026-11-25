'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ShoppingBag,
  ArrowRight,
  Star,
  Plus,
  Minus,
  Trash2,
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
  Flower2,
  Apple,
} from 'lucide-react';
import Header from './components/Header';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  unit: string;
  rating: number;
  reviews: number;
  image: string;
  tag?: string;
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    category: 'Plants',
    price: 499,
    oldPrice: 599,
    unit: '1 plant',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=900&q=85',
    tag: 'Bestseller',
    description: 'A statement indoor plant with beautiful split leaves. Loves bright, indirect light.',
  },
  {
    id: 2,
    name: 'Himachali Red Apples',
    category: 'Fresh Fruits',
    price: 180,
    unit: '1 kg',
    rating: 4.8,
    reviews: 96,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=900&q=85',
    tag: 'Fresh harvest',
    description: 'Crisp, naturally sweet apples sourced from Himachal orchards.',
  },
  {
    id: 3,
    name: 'Sunflower Seed Mix',
    category: 'Flowers & Seeds',
    price: 149,
    unit: '1 packet',
    rating: 4.7,
    reviews: 54,
    image: 'https://images.unsplash.com/photo-1597848212624-E6CF1A2F8C2A?w=900&q=85',
    description: 'Easy-to-grow sunflower seeds for a bright, pollinator-friendly garden.',
  },
  {
    id: 4,
    name: 'Peace Lily',
    category: 'Plants',
    price: 349,
    unit: '1 plant',
    rating: 4.9,
    reviews: 83,
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=900&q=85',
    tag: 'Easy care',
    description: 'An elegant flowering houseplant that prefers soft light and evenly moist soil.',
  },
  {
    id: 5,
    name: 'Fresh Himachali Pears',
    category: 'Fresh Fruits',
    price: 160,
    unit: '1 kg',
    rating: 4.6,
    reviews: 41,
    image: 'https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=900&q=85',
    description: 'Juicy seasonal pears selected from local growers.',
  },
  {
    id: 6,
    name: 'Wildflower Seed Kit',
    category: 'Flowers & Seeds',
    price: 229,
    unit: '1 kit',
    rating: 4.8,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900&q=85',
    tag: 'Seasonal pick',
    description: 'A cheerful mix of flower seeds with a simple growing guide.',
  },
];

const categories = [
  { name: 'All', icon: Sprout },
  { name: 'Plants', icon: Leaf },
  { name: 'Fresh Fruits', icon: Apple },
  { name: 'Flowers & Seeds', icon: Flower2 },
];

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
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [dark, setDark] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatText, setChatText] = useState('');
  const [chatMessages, setChatMessages] = useState<string[]>([
    'Hi! I’m Dev AI 🌿 How can I help you find something from nature today?',
  ]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const visible = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === 'All' || p.category === category) &&
          p.name.toLowerCase().includes(query.toLowerCase())
      ),
    [category, query]
  );

  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);

  const add = (id: number) => setCart((old) => ({ ...old, [id]: (old[id] || 0) + 1 }));
  const change = (id: number, delta: number) =>
    setCart((old) => {
      const n = (old[id] || 0) + delta;
      const next = { ...old };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });

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
        dark={dark}
        onToggleDark={() => setDark((prev) => !prev)}
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

      <section className="shop-section section-wrap" id="shop">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" /> THE GOODNESS STORE
            </div>
            <h2>
              Find your kind
              <br />
              of <em>fresh.</em>
            </h2>
          </div>
          <p>Little things that make everyday living feel a bit more natural. Pick your favourites.</p>
        </div>
        <div className="category-row">
          {categories.map((c) => (
            <button
              key={c.name}
              className={category === c.name ? 'category-pill active' : 'category-pill'}
              onClick={() => setCategory(c.name)}
            >
              <c.icon size={16} />
              {c.name}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {visible.map((p, i) => (
            <motion.article
              className="product-card"
              key={p.id}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <div className="product-image-wrap" onClick={() => setActiveProduct(p)}>
                <img src={p.image} alt={p.name} />
                {p.tag && <span className="product-tag">{p.tag}</span>}
                <button
                  className={wishlist.includes(p.id) ? 'wish-btn wished' : 'wish-btn'}
                  onClick={(e) => {
                    e.stopPropagation();
                    setWishlist((w) =>
                      w.includes(p.id) ? w.filter((x) => x !== p.id) : [...w, p.id]
                    );
                  }}
                  aria-label="Add to wishlist"
                >
                  <Heart size={17} fill={wishlist.includes(p.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="product-info">
                <div className="product-meta">
                  <span>{p.category}</span>
                  <span className="rating">
                    <Star size={12} fill="currentColor" /> {p.rating} <small>({p.reviews})</small>
                  </span>
                </div>
                <h3>{p.name}</h3>
                <div className="product-bottom">
                  <div>
                    <b>₹{p.price}</b> <small>/ {p.unit}</small>
                    {p.oldPrice && <del>₹{p.oldPrice}</del>}
                  </div>
                  <button className="add-btn" onClick={() => add(p.id)}>
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        {visible.length === 0 && (
          <div className="empty-state">No products found. Try another search.</div>
        )}
        <div className="center-link">
          <Link className="outline-btn" href="/collections">
            Explore all products
            <ArrowRight size={16} />
          </Link>
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
              {count === 0 ? (
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
              ) : (
                <>
                  <div className="cart-items">
                    {products
                      .filter((p) => cart[p.id])
                      .map((p) => (
                        <div className="cart-item" key={p.id}>
                          <img src={p.image} alt={p.name} />
                          <div className="cart-item-info">
                            <b>{p.name}</b>
                            <small>
                              ₹{p.price} / {p.unit}
                            </small>
                            <div className="qty">
                              <button onClick={() => change(p.id, -1)}>
                                <Minus size={13} />
                              </button>
                              <span>{cart[p.id]}</span>
                              <button onClick={() => change(p.id, 1)}>
                                <Plus size={13} />
                              </button>
                            </div>
                          </div>
                          <strong>₹{p.price * cart[p.id]}</strong>
                          <button
                            className="remove"
                            onClick={() =>
                              setCart((old) => {
                                const n = { ...old };
                                delete n[p.id];
                                return n;
                              })
                            }
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))}
                  </div>
                  <div className="drawer-summary">
                    <div>
                      <span>Subtotal</span>
                      <b>₹{subtotal}</b>
                    </div>
                    <small>Delivery charges calculated at checkout.</small>
                    <button
                      className="checkout-btn"
                      onClick={() =>
                        alert(
                          'Checkout preview. Firebase, address validation and payment gateway must be connected before accepting real orders.'
                        )
                      }
                    >
                      Continue to checkout <ArrowRight size={17} />
                    </button>
                    <p>
                      <ShieldCheck size={14} /> Secure checkout experience
                    </p>
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeProduct && (
          <>
            <motion.div
              className="drawer-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProduct(null)}
            />
            <motion.div
              className="product-modal"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <button className="modal-close icon-btn" onClick={() => setActiveProduct(null)}>
                <X />
              </button>
              <img src={activeProduct.image} alt={activeProduct.name} />
              <div className="modal-copy">
                <span className="eyebrow">{activeProduct.category}</span>
                <h2>{activeProduct.name}</h2>
                <div className="rating">
                  <Star size={14} fill="currentColor" /> {activeProduct.rating} (
                  {activeProduct.reviews} reviews)
                </div>
                <h3>
                  ₹{activeProduct.price} <small>/ {activeProduct.unit}</small>
                </h3>
                <p>{activeProduct.description}</p>
                <div className="availability">
                  <span /> In stock · Estimated delivery shown at checkout
                </div>
                <button
                  className="primary-btn"
                  onClick={() => {
                    add(activeProduct.id);
                    setActiveProduct(null);
                    setCartOpen(true);
                  }}
                >
                  Add to basket <ShoppingBag size={17} />
                </button>
              </div>
            </motion.div>
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
