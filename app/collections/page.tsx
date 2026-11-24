'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import Header from '../components/Header';

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
  featured?: boolean;
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
    featured: true,
    description: 'A statement indoor plant with beautiful split leaves.'
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
    featured: true,
    description: 'Crisp, naturally sweet apples sourced from Himachal orchards.'
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
    description: 'Easy-to-grow sunflower seeds for your garden.'
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
    featured: true,
    description: 'An elegant flowering houseplant that prefers soft light.'
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
    description: 'Juicy seasonal pears selected from local growers.'
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
    description: 'A cheerful mix of flower seeds with a simple growing guide.'
  }
];

const categories = ['All', 'Plants', 'Fresh Fruits', 'Flowers & Seeds', 'More', 'Best Value'];

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link
        href={`/products/${product.id}`}
        className="product-image-wrap"
        style={{ display: 'block' }}
      >
        <img src={product.image} alt={product.name} />
        {product.tag && (
          <span className="product-tag">{product.tag}</span>
        )}
      </Link>

      <div className="product-info">
        <div className="product-meta">
          <span>{product.category}</span>
          <span className="rating">
            <Star size={11} fill="currentColor" />
            {product.rating}
            <small>({product.reviews})</small>
          </span>
        </div>

        <h3>{product.name}</h3>

        <div className="product-bottom">
          <div>
            <b>₹{product.price}</b>
            <small> / {product.unit}</small>
            {product.oldPrice && (
              <del>₹{product.oldPrice}</del>
            )}
          </div>

          <Link
            href={`/products/${product.id}`}
            className="add-btn"
            style={{ textDecoration: 'none' }}
          >
            View Details <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function CollectionsPage() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [showFloatingControls, setShowFloatingControls] = useState(true);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      if (window.scrollY <= 10) {
        setShowFloatingControls(true);
      } else {
        setShowFloatingControls(false);
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setShowFloatingControls(true);
      }, 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const featuredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesFeatured = Boolean(product.featured || product.tag);
      const matchesSearch = product.name
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesFeatured && matchesSearch;
    });
  }, [query]);

  const visibleProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesCategory =
        category === 'All' || product.category === category;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sort === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [category, query, sort]);

  const showFeaturedSection =
    category === 'All' && sort === 'featured' && featuredProducts.length > 0;

  return (
    <main>
      <Header />
      <section className="section-wrap collection-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" />
              FROM NATURE TO YOUR HOME
            </span>
            <h2>Our <em>Collections</em></h2>
          </div>
          <p className="collection-description">
            Organic Devbhoomi offers plants, fresh Himachali fruits, flowers, and quality seeds online. Shop nature-inspired products and get them delivered to your doorstep across Himachal Pradesh.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 14,
            flexWrap: 'wrap',
            marginBottom: 20
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 20 }}>
  <button
    type="button"
    onClick={() => window.history.back()}
    aria-label="Go back"
    style={{
      width: 44,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      position: 'fixed',
      top: '280px',
      right: '20px',
      justifyContent: 'center',
      border: 'none',
      background: 'transparent',
      color: 'var(--text)',
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1,
      cursor: 'pointer',
      padding: 0,
      zIndex: 20,
    }}
  >
    ←
  </button>

  <select
    value={sort}
    onChange={(event) => setSort(event.target.value)}
    aria-label="Sort products"
    style={{
      padding: '0px 15px',
      width: '100px',
      height: '33px',
      position: 'fixed',
      top: '280px',
      right: '20px',
      border: '1px solid #000000',
      borderRadius: 4,
      background: 'var(--bg)',
      color: 'var(--text)',
      display: 'block',
      fontSize: 11,
    }}
  >
    <option value="featured">Featured</option>
    <option value="price-low">Price: Low to High</option>
    <option value="price-high">Price: High to Low</option>
    <option value="rating">Top Rated</option>
  </select>
</div>
        {/* Single-line horizontally scrollable category bar */}
        <div
          role="tablist"
          aria-label="Product categories"
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            gap: 8,
            paddingBottom: 8,
            marginBottom: 14,
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin'
          }}
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`category-pill ${category === item ? 'active' : ''}`}
              onClick={() => setCategory(item)}
              style={{
                flex: '0 0 auto',
                whiteSpace: 'nowrap',
                border: category === item ? '1.5px solid #1b4332' : '1px solid #cbd5e1',
                borderRadius: '999px',
                padding: '6px 14px',
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <p style={{ color: 'var(--sub)', fontSize: 11, marginBottom: 22 }}>
          Showing {visibleProducts.length} products
        </p>

        {/* Separate Featured Collection block */}
        {showFeaturedSection && (
          <div style={{ marginBottom: 36 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: 14
              }}
            >
              <h3 style={{ margin: 0, fontSize: 18 }}>Featured Collection</h3>
              <span style={{ color: 'var(--sub)', fontSize: 12 }}>
                Handpicked highlights
              </span>
            </div>

            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={`featured-${product.id}`} product={product} />
              ))}
            </div>

            <hr
              style={{
                border: 'none',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                marginTop: 32
              }}
            />
          </div>
        )}

        {/* All / Filtered Collection grid */}
        {showFeaturedSection && (
          <h3 style={{ marginTop: 0, marginBottom: 14, fontSize: 18 }}>
            All Collections
          </h3>
        )}

        {visibleProducts.length > 0 ? (
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            No products found. Try another search.
          </div>
        )}
      </section>
    </main>  
}

