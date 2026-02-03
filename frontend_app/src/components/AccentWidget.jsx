import React, { useId, useMemo, useState } from "react";

/**
 * AccentWidget is a small interactive widget: a slider mixes primary and success accents
 * and updates a preview swatch. This keeps the app simple while demonstrating interaction.
 */
// PUBLIC_INTERFACE
export default function AccentWidget() {
  const sliderId = useId();
  const [mix, setMix] = useState(55);

  const previewColor = useMemo(() => {
    // Mix between primary (#3b82f6) and success (#06b6d4) using a simple linear interpolation.
    const c1 = { r: 0x3b, g: 0x82, b: 0xf6 };
    const c2 = { r: 0x06, g: 0xb6, b: 0xd4 };
    const t = Math.min(100, Math.max(0, mix)) / 100;

    const r = Math.round(c1.r + (c2.r - c1.r) * t);
    const g = Math.round(c1.g + (c2.g - c1.g) * t);
    const b = Math.round(c1.b + (c2.b - c1.b) * t);

    return `rgb(${r}, ${g}, ${b})`;
  }, [mix]);

  return (
    <div className="pixelCard sidePanel" role="region" aria-labelledby="accent-widget-title">
      <h2 id="accent-widget-title" className="sideTitle">
        ACCENT MIXER
      </h2>

      <p className="miniNote">
        Drag the slider to blend <strong>#3b82f6</strong> into <strong>#06b6d4</strong>.
        No storage, no network — just vibes.
      </p>

      <div className="pixelCard" style={{ padding: 14, boxShadow: "var(--shadow-sm)" }}>
        <label htmlFor={sliderId} style={{ fontWeight: 800 }}>
          Mix level: <span aria-live="polite">{mix}%</span>
        </label>

        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          value={mix}
          onChange={(e) => setMix(Number(e.target.value))}
          style={{
            width: "100%",
            marginTop: 10,
            accentColor: previewColor,
          }}
        />

        <div
          aria-label="Preview color swatch"
          style={{
            marginTop: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: 12,
            borderRadius: 12,
            border: "2px solid rgba(17, 24, 39, 0.85)",
            background: "rgba(255,255,255,0.7)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              aria-hidden="true"
              style={{
                width: 18,
                height: 18,
                border: "2px solid rgba(17, 24, 39, 0.85)",
                background: previewColor,
                boxShadow: "0 2px 0 rgba(17, 24, 39, 0.12)",
              }}
            />
            <span style={{ fontWeight: 800 }}>Preview</span>
          </div>

          <code style={{ fontWeight: 700, fontSize: 12 }}>{previewColor}</code>
        </div>
      </div>
    </div>
  );
}
