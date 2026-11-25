'use client';
import { useState } from 'react';

export function HamburgerXMorph() {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      aria-label="Toggle menu"
      aria-expanded={open}
      onClick={() => setOpen((prev) => !prev)}
      style={{
        width: 44,
        height: 44,
        display: 'grid',
        placeItems: 'center',
        background: 'transparent',
        border: '1px solid rgba(0,0,0,0.14)',
        borderRadius: 10,
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <span style={{ position: 'relative', width: 22, height: 14, display: 'block' }}>
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: open ? 6 : 0,
            width: '100%',
            height: 2,
            borderRadius: 999,
            background: 'currentColor',
            transform: open ? 'rotate(45deg)' : 'none',
            transition: 'all 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: 6,
            width: '100%',
            height: 2,
            borderRadius: 999,
            background: 'currentColor',
            opacity: open ? 0 : 1,
            transform: open ? 'scaleX(0)' : 'scaleX(1)',
            transition: 'all 0.2s ease',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: open ? 6 : 12,
            width: '100%',
            height: 2,
            borderRadius: 999,
            background: 'currentColor',
            transform: open ? 'rotate(-45deg)' : 'none',
            transition: 'all 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </span>
    </button>
  );
}
