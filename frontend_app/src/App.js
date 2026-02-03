import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AccentWidget from "./components/AccentWidget";

// PUBLIC_INTERFACE
function App() {
  const [activeSectionId, setActiveSectionId] = useState("home");

  const sections = useMemo(() => ["home", "widget", "about"], []);

  // Track active section for nav highlighting (simple intersection observer).
  useEffect(() => {
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the most visible entry.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible[0]?.target?.id) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const scrollToWidget = () => {
    const el = document.getElementById("widget");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="appRoot">
      <Header activeSectionId={activeSectionId} />

      <main id="main" className="main" tabIndex={-1}>
        <div className="container">
          <section id="home" className="hero" aria-label="Intro section">
            <div className="pixelCard heroPanel">
              <p className="heroKicker">PRESS START TO BUILD • LIGHT THEME • PIXEL BORDERS</p>

              <h2 className="heroTitle">
                A tiny <strong>retro</strong> React UI
              </h2>

              <p className="heroLead">
                Clean light theme, bold blue/cyan accents, and a subtle scanline overlay — plus a
                small interactive widget to prove it’s alive.
              </p>

              <div className="heroActions">
                <button className="btn btnPrimary" type="button" onClick={scrollToWidget}>
                  <span className="btnPip" aria-hidden="true" />
                  <span className="btnLabel">Try the widget</span>
                </button>

                <a className="btn" href="#about">
                  What’s inside?
                </a>
              </div>
            </div>

            <AccentWidget />
          </section>

          <section id="widget" className="section" aria-label="Widget section">
            <div className="grid2">
              <div className="pixelCard card">
                <h3 className="cardTitle">Interactive (and accessible)</h3>
                <p className="cardText">
                  The slider is keyboard-friendly, labeled, and announces its value. Focus rings
                  are high-contrast and consistent across the UI.
                </p>
              </div>

              <div className="pixelCard card">
                <h3 className="cardTitle">Retro, but still readable</h3>
                <p className="cardText">
                  Display text uses <span style={{ fontFamily: "var(--font-retro)" }}>Press Start 2P</span>
                  {" "}sparingly; body copy stays modern with Inter for comfort.
                </p>
              </div>
            </div>
          </section>

          <section id="about" className="section" aria-label="About section">
            <div className="pixelCard card">
              <h3 className="cardTitle">What this app includes</h3>
              <p className="cardText">
                Header with navigation, a hero area with CTA, a small interactive widget (Accent
                Mixer), and a footer — all in a vertical stack, responsive down to mobile widths.
              </p>
              <p className="cardText" style={{ marginTop: 10 }}>
                No backend calls. No extra UI frameworks. Just React + CSS, themed to the style
                guide: background <code>#f9fafb</code>, surface <code>#ffffff</code>, text{" "}
                <code>#111827</code>, accents <code>#3b82f6</code> and <code>#06b6d4</code>.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
