import { useState } from "react";
import { useAnimation } from "../hooks/useAnimation.js";
import { useFocusVisible } from "../hooks/useFocusVisible.js";
import { useHover } from "../hooks/useHover.js";
import {
  candyBorder,
  candyStripe,
  colors,
  displayFont,
  focusRing,
  photoFrame,
} from "../styles.js";

// Cycled by the card's position in the list
const STICKERS = ["🎁", "⛄", "🦌"];
const NAME_ICONS = ["🎄", "⭐", "🍪", "🧦"];

const HOVER_TRANSFORM = "rotate(0deg) scale(1.04)";
const JINGLE = [
  { transform: HOVER_TRANSFORM, easing: "ease" },
  { offset: 0.25, transform: "rotate(-4deg) scale(1.04)", easing: "ease" },
  { offset: 0.75, transform: "rotate(4deg) scale(1.04)", easing: "ease" },
  { transform: HOVER_TRANSFORM },
];
const JINGLE_TIMING = { duration: 400, iterations: 2 };

function Placeholder() {
  return (
    <div
      role="img"
      aria-label="No image available"
      style={{ ...photoFrame, background: candyStripe, color: colors.green }}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        aria-hidden="true"
        style={{
          width: "34%",
          height: "auto",
          boxSizing: "border-box",
          background: "#fff",
          padding: "0.6rem",
          borderRadius: "50%",
        }}
      >
        <path d="M8 20l14-10 22 6-2 10-18-4z" />
        <path d="M34 22l22 34" />
      </svg>
    </div>
  );
}

export default function ItemCard({ item, index }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [hovered, hoverHandlers] = useHover();
  const [linkHovered, linkHoverHandlers] = useHover();
  const [linkFocused, linkFocusHandlers] = useFocusVisible();
  const cardRef = useAnimation(JINGLE, JINGLE_TIMING, { active: hovered });
  const tilt = index % 2 ? "rotate(1.2deg)" : "rotate(-1.2deg)";

  return (
    <li
      ref={cardRef}
      {...hoverHandlers}
      style={{
        position: "relative",
        color: "#1b1b1b",
        background: "#fffaf0",
        ...candyBorder,
        display: "flex",
        flexDirection: "column",
        transform: hovered ? HOVER_TRANSFORM : tilt,
        boxShadow: "0 10px 24px rgba(0, 0, 0, 0.55)",
        transition: "transform 0.2s",
        zIndex: hovered ? 5 : undefined,
      }}
    >
      {item.imgUrl && !imgFailed ? (
        <div style={photoFrame}>
          <img
            src={item.imgUrl}
            alt={item.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
      ) : (
        <Placeholder />
      )}
      <div
        style={{
          padding: "0.8rem 1rem 1rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <h2
          style={{
            fontFamily: displayFont,
            fontWeight: 700,
            fontSize: "1.6rem",
            lineHeight: 1.1,
            margin: 0,
            color: colors.green,
          }}
        >
          {NAME_ICONS[index % NAME_ICONS.length]} {item.name}
        </h2>
        {item.note && (
          <p
            style={{
              margin: "0.3rem 0 0",
              color: "#5a1f23",
              fontSize: "0.95rem",
              fontStyle: "italic",
            }}
          >
            {item.note}
          </p>
        )}
        <p
          style={{
            display: "inline-block",
            alignSelf: "flex-start",
            margin: "0.6rem 0 0",
            padding: "0.1rem 0.7rem",
            fontFamily: '"Barlow", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: "1.6rem",
            lineHeight: 1.25,
            letterSpacing: "0.01em",
            fontVariantNumeric: "lining-nums tabular-nums",
            color: colors.gold,
            background: colors.red,
            border: `3px solid ${colors.gold}`,
            borderRadius: "99px",
            transform: "rotate(-3deg)",
          }}
        >
          <span style={{ fontSize: "1.3rem" }}>🔔 </span>
          {item.price}
        </p>
        <div style={{ marginTop: "auto", paddingTop: "0.9rem" }}>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              {...linkHoverHandlers}
              {...linkFocusHandlers}
              style={{
                display: "inline-block",
                padding: "0.35rem 0.9rem",
                color: "#fff",
                background: linkHovered ? colors.red : colors.green,
                border: `2px dashed ${colors.gold}`,
                borderRadius: "8px",
                fontWeight: 700,
                textDecoration: "none",
                ...(linkFocused && focusRing),
              }}
            >
              🎁 Example on {item.store}
            </a>
          )}
        </div>
      </div>
      <span
        style={{
          position: "absolute",
          top: "-1.9rem",
          right: "-1.4rem",
          fontSize: "2.4rem",
          transform: "rotate(14deg)",
          filter: "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))",
        }}
      >
        {STICKERS[index % STICKERS.length]}
      </span>
    </li>
  );
}
