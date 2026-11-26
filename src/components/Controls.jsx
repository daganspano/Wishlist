import { useState } from "react";
import { useFocusVisible } from "../hooks/useFocusVisible.js";
import { candyBorder, colors, controlLabel, focusRing } from "../styles.js";

function SortOption({ active, onClick, children }) {
  return (
    <div
      onClick={onClick}
      style={{
        color: active ? "#fff" : "#cfe9d6",
        cursor: "pointer",
        userSelect: "none",
        fontWeight: active ? 700 : 500,
        textDecoration: active ? `underline wavy ${colors.gold}` : undefined,
      }}
    >
      {children}
    </div>
  );
}

export default function Controls({
  sortByPrice,
  onSortChange,
  limit,
  onLimitChange,
  min,
  max,
}) {
  // Text of the number box, kept separately so partial/invalid input can be typed
  const [limitText, setLimitText] = useState(String(limit));
  const [switchFocused, switchFocusHandlers] = useFocusVisible();
  const [sliderFocused, sliderFocusHandlers] = useFocusVisible();
  const [boxFocused, boxFocusHandlers] = useFocusVisible();

  function handleSlider(e) {
    const n = Number(e.target.value);
    setLimitText(String(n));
    onLimitChange(n);
  }

  function handleBox(e) {
    setLimitText(e.target.value);
    const n = parseFloat(e.target.value);
    if (!isFinite(n) || n < 0) return;
    onLimitChange(n);
  }

  function handleBoxBlur(e) {
    boxFocusHandlers.onBlur(e);
    setLimitText(String(limit));
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
        marginBottom: "2rem",
        background: colors.green,
        padding: "1rem 1.25rem",
        ...candyBorder,
        boxShadow: `0 0 0 4px ${colors.gold}, 0 10px 30px rgba(0, 0, 0, 0.5)`,
      }}
    >
      {/* Sort by toggle switch */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={controlLabel}>🎅 Sort By:</div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <SortOption active={!sortByPrice} onClick={() => onSortChange(false)}>
            Most Wanted
          </SortOption>
          <button
            type="button"
            role="switch"
            aria-checked={sortByPrice}
            aria-label="Sort by price instead of most wanted"
            onClick={() => onSortChange(!sortByPrice)}
            {...switchFocusHandlers}
            style={{
              position: "relative",
              width: "3.6rem",
              height: "1.9rem",
              boxSizing: "border-box",
              padding: 0,
              cursor: "pointer",
              background: sortByPrice ? "#2ecc71" : colors.red,
              border: `3px solid ${sortByPrice ? colors.gold : "#fff"}`,
              borderRadius: "999px",
              boxShadow: `inset 0 0 0 2px ${sortByPrice ? colors.green : "#7a0a13"}`,
              ...(switchFocused && focusRing),
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: sortByPrice ? "calc(100% - 1.4rem - 2px)" : "2px",
                width: "1.4rem",
                height: "1.4rem",
                transform: "translateY(-50%)",
                transition: "left 0.2s ease",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  fontSize: "1.3rem",
                  lineHeight: "1.4rem",
                }}
              >
                🔔
              </span>
            </span>
          </button>
          <SortOption active={sortByPrice} onClick={() => onSortChange(true)}>
            Price
          </SortOption>
        </div>
      </div>

      {/* Price Limit Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <label htmlFor="limit" style={controlLabel}>
          💰 Price Limit:
        </label>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <input
            type="range"
            id="limit"
            step="1"
            min={min}
            max={max}
            value={Math.min(max, Math.max(min, limit))}
            onChange={handleSlider}
            {...sliderFocusHandlers}
            style={{
              width: "11rem",
              maxWidth: "40vw",
              boxSizing: "border-box",
              accentColor: "#ff2d3d",
              cursor: "pointer",
              ...(sliderFocused && focusRing),
            }}
          />
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.2rem",
              fontWeight: 700,
              color: colors.gold,
              fontSize: "1.3rem",
            }}
          >
            $
            <input
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              aria-label="Price limit in dollars"
              value={limitText}
              onChange={handleBox}
              {...boxFocusHandlers}
              onBlur={handleBoxBlur}
              style={{
                width: "5rem",
                boxSizing: "border-box",
                font: "inherit",
                color: colors.red,
                background: "#fffbe6",
                border: `3px dashed ${colors.red}`,
                borderRadius: "8px",
                padding: "0.2rem 0.4rem",
                ...(boxFocused && focusRing),
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
