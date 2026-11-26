"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export interface DrawerNavItem {
  label: string;
  href?: string;
  route?: string;
}

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  items: DrawerNavItem[];
  title?: string;
}

export default function MobileDrawer({
  open,
  onClose,
  items,
  title = "Menu",
}: MobileDrawerProps) {
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleNavigate = (item: DrawerNavItem) => {
    onClose();

    if (item.route) {
      router.push(item.route);
      return;
    }

    if (item.href) {
      if (item.href.startsWith("#")) {
        const section = document.querySelector(item.href);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      router.push(item.href);
    }
  };

  return (
    <>
      <div
        className="botanical-drawer-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="botanical-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div>
          <div className="botanical-drawer-header">
            <span className="botanical-drawer-tag">{title}</span>
            <button
              type="button"
              className="botanical-drawer-close"
              onClick={onClose}
              aria-label="Close navigation menu"
            >
              ×
            </button>
          </div>

          <nav className="botanical-nav-list" style={{ marginTop: 18 }}>
            {items.map((item, index) => (
              <button
                key={`${item.label}-${index}`}
                type="button"
                className="botanical-nav-card"
                style={{ animationDelay: `${80 + index * 55}ms` }}
                onClick={() => handleNavigate(item)}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="botanical-nav-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.label}</span>
                </span>
                <span className="botanical-nav-arrow">→</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="botanical-drawer-footer">
          <span>Tap outside or press Esc to close</span>
          <span>{items.length} items</span>
        </div>
      </aside>
    </>
  );
}