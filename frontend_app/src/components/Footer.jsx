import React from "react";

/**
 * Footer renders the bottom area with lightweight links and attribution.
 */
// PUBLIC_INTERFACE
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footerInner">
        <p className="footerText">
          © {year} Retro UI Starter — built with React, zero backend calls.
        </p>

        <div className="footerLinks" aria-label="Footer links">
          <a href="#home">Top</a>
          <a href="#widget">Widget</a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            React Docs
          </a>
        </div>
      </div>
    </footer>
  );
}
