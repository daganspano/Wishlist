import { useAnimation } from '../hooks/useAnimation.js'

const TWINKLE = {
  opacity: [1, 0.25],
  transform: ['scale(1)', 'scale(0.85)'],
  easing: 'ease',
}

// Colours repeat every four bulbs, each one blinking 0.3s after the last
const VARIANTS = ['#ff2d3d', '#2dff6b', '#ffd24d', '#ffffff'].map(
  (color, i) => ({
    color,
    timing: {
      duration: 1200,
      delay: i * 300,
      iterations: Infinity,
      direction: 'alternate',
    },
  }),
)

const BULBS = Array.from(
  { length: 40 },
  (_, i) => VARIANTS[i % VARIANTS.length],
)

function Bulb({ color, timing }) {
  const ref = useAnimation(TWINKLE, timing)

  return (
    <span
      ref={ref}
      style={{
        width: '1rem',
        height: '1.5rem',
        borderRadius: '50% 50% 55% 55%',
        background: color,
        boxShadow: `0 0 14px 4px ${color}`,
      }}
    />
  )
}

export default function Lights() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2.2rem',
        zIndex: 60,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        background: 'linear-gradient(#0a2e16 0 4px, transparent 4px)',
        pointerEvents: 'none',
      }}
    >
      {BULBS.map((bulb, i) => (
        <Bulb key={i} color={bulb.color} timing={bulb.timing} />
      ))}
    </div>
  )
}
