import { useState } from "react";
import { useAnimation } from "../hooks/useAnimation.js";

const CHARS = ["❄", "❅", "❆"];
const FLAKE_COUNT = 30;

function makeFlakes() {
  return Array.from({ length: FLAKE_COUNT }, (_, i) => {
    const drift = Math.random() * 120 - 60;
    return {
      id: i,
      char: CHARS[i % CHARS.length],
      left: `${Math.random() * 100}vw`,
      fontSize: `${10 + Math.random() * 20}px`,
      fall: {
        transform: [
          "none",
          `translate3d(${drift}px, 110vh, 0) rotate(360deg)`,
        ],
      },
      // A negative delay starts each flake part-way through its fall
      timing: {
        duration: (6 + Math.random() * 10) * 1000,
        delay: -Math.random() * 14 * 1000,
        iterations: Infinity,
      },
    };
  });
}

function Flake({ flake }) {
  const ref = useAnimation(flake.fall, flake.timing);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "-2rem",
        left: flake.left,
        zIndex: 55,
        pointerEvents: "none",
        color: "#fff",
        fontSize: flake.fontSize,
        textShadow: "0 0 6px #9cf",
      }}
    >
      {flake.char}
    </span>
  );
}

export default function Snowfall() {
  const [flakes] = useState(makeFlakes);

  return flakes.map((flake) => <Flake key={flake.id} flake={flake} />);
}
