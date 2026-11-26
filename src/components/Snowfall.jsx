import { useState } from 'react'

const CHARS = ['❄', '❅', '❆', '✨', '⭐']
const FLAKE_COUNT = 70

function makeFlakes() {
  return Array.from({ length: FLAKE_COUNT }, (_, i) => ({
    id: i,
    char: CHARS[i % CHARS.length],
    style: {
      left: `${Math.random() * 100}vw`,
      fontSize: `${10 + Math.random() * 20}px`,
      animationDuration: `${6 + Math.random() * 10}s`,
      animationDelay: `-${Math.random() * 14}s`,
      '--dx': `${Math.random() * 120 - 60}px`,
    },
  }))
}

export default function Snowfall() {
  const [flakes] = useState(makeFlakes)

  return flakes.map((flake) => (
    <span key={flake.id} className="flake" style={flake.style} aria-hidden="true">
      {flake.char}
    </span>
  ))
}
