import React from "react";
import styles from "../App.css";

/**
 * Header renders the sticky top navigation bar with brand title and anchor links.
 * This is a presentational component (no external calls).
 */
// PUBLIC_INTERFACE
export default function Header({ activeSectionId }) {
  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#widget", label: "Widget" },
    { href: "#about", label: "About" },
  ];

  return (
    <header className="header">
      <a className="skipLink" href="#main">
        Skip to content
      </a>

      <div className="container headerInner">
        <div className="brand" aria-label="App brand">
          <span className="brandMark" aria-hidden="true" />
          <h1 className="brandTitle">RETRO UI</h1>
        </div>

        <nav className="nav" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="navLink"
              href={item.href}
              aria-current={activeSectionId === item.href.slice(1) ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
