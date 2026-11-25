'use client';

import { useMemo, useState } from 'react';
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
    <article
      className="product-card"
      style={{
        backgroundColor: '#ffffff',
        color: '#111827',
        border: '1px solid #e5e7eb',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)'
      }}
    >
      <Link
        href={`/products/${product.id}`}
        className="product-image-wrap"
        style={{
          display: 'block',
          position: 'relative',
          backgroundColor: '#f3f4f6'
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '220px',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        {product.tag && (
          <span
            className="product-tag"
            style={{
              backgroundColor: '#ecfdf5',
              color: '#1b4332',
              border: '1px solid #a7f3d0'
            }}
          >
            {product.tag}
          </span>
        )}
      </Link>

      <div
        className="product-info"
        style={{
          backgroundColor: '#ffffff',
          color: '#111827',
          padding: '14px'
        }}
      >
        <div
          className="product-meta"
          style={{
            color: '#4b5563',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>{product.category}</span>
          <span
            className="rating"
            style={{
              color: '#b45309',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Star size={11} fill="currentColor" />
            {product.rating}
            <small style={{ color: '#6b7280' }}>({product.reviews})</small>
          </span>
        </div>

        <h3 style={{ color: '#111827', margin: '6px 0 10px' }}>
          {product.name}
        </h3>

        <div
          className="product-bottom"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <div style={{ color: '#111827' }}>
            <b>₹{product.price}</b>
            <small style={{ color: '#6b7280' }}> / {product.unit}</small>
            {product.oldPrice && (
              <del style={{ color: '#9ca3af', marginLeft: '6px' }}>
                ₹{product.oldPrice}
              </del>
            )}
          </div>

          <Link
            href={`/products/${product.id}`}
            className="add-btn"
            style={{
              textDecoration: 'none',
              backgroundColor: '#1b4332',
              color: '#ffffff',
              borderRadius: '999px',
              padding: '6px 12px',
              fontSize: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
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
  const [query] = useState('');
  const [sort, setSort] = useState('featured');

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
    const filtered = products.filter((product) => {
      const matchesCategory =
        category === 'All' || product.category === category;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    const sorted = [...filtered];
    if (sort === 'price-low') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);

    return sorted;
  }, [category, query, sort]);

  const showFeaturedSection =
    category === 'All' && sort === 'featured' && featuredProducts.length > 0;

  return (
    <main style={{ backgroundColor: '#ffffff', color: '#111827', minHeight: '100vh' }}>
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
          <button
            type="button"
            onClick={() => window.history.back()}
            aria-label="Go back"
            style={{
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: 'transparent',
              color: '#111827',
              fontSize: 32,
              fontWeight: 700,
              lineHeight: 1,
              cursor: 'pointer',
              padding: 0
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
              width: '130px',
              height: '33px',
              border: '1px solid #111827',
              borderRadius: 4,
              background: '#ffffff',
              color: '#111827',
              display: 'block',
              fontSize: 11
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
          {categories.map((item) => {
            const isActive = category === item;
            return (
              <button
                key={item}
                type="button"
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => setCategory(item)}
                style={{
                  flex: '0 0 auto',
                  whiteSpace: 'nowrap',
                  backgroundColor: isActive ? '#1b4332' : '#ffffff',
                  color: isActive ? '#ffffff' : '#111827',
                  border: isActive ? '1.5px solid #1b4332' : '1px solid #cbd5e1',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  cursor: 'pointer'
                }}
              >
                {item}
              </button>
            );
          })}
        </div>

        <p style={{ color: '#4b5563', fontSize: 11, marginBottom: 22 }}>
          Showing {visibleProducts.length} products in &ldquo;{category}&rdquo;
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
              <h3 style={{ margin: 0, fontSize: 18, color: '#111827' }}>
                Featured Collection
              </h3>
              <span style={{ color: '#4b5563', fontSize: 12 }}>
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
          <h3 style={{ marginTop: 0, marginBottom: 14, fontSize: 18, color: '#111827' }}>
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
          <div
            className="empty-state"
            style={{
              backgroundColor: '#f9fafb',
              color: '#374151',
              border: '1px solid #e5e7eb',
              borderRadius: '12px'
            }}
          >
            No products found in &ldquo;{category}&rdquo;. Try another category.
          </div>
        )}
      </section>
    </main>
  );
}
