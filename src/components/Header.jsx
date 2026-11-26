import { useAnimation } from '../hooks/useAnimation.js'
import { candyStripe, displayFont } from '../styles.js'

const BOUNCE = {
  transform: ['none', 'translateY(-0.2em) rotate(12deg)'],
  easing: 'ease-in-out',
}
const BOUNCE_TIMING = {
  duration: 1000,
  iterations: Infinity,
  direction: 'alternate',
}
const BOUNCE_LATE_TIMING = { ...BOUNCE_TIMING, delay: 500 }

const SHIMMER = { backgroundPosition: ['0% 0%', '300% 0%'] }
const SHIMMER_TIMING = { duration: 4000, iterations: Infinity }

function Bounce({ late = false, children }) {
  const ref = useAnimation(BOUNCE, late ? BOUNCE_LATE_TIMING : BOUNCE_TIMING)

  return (
    <span ref={ref} style={{ display: 'inline-block' }}>
      {children}
    </span>
  )
}

export default function Header() {
  const glitterRef = useAnimation(SHIMMER, SHIMMER_TIMING)

  return (
    <header>
      <h1
        style={{
          fontFamily: displayFont,
          fontWeight: 700,
          fontSize: 'clamp(2.6rem, 10vw, 5.5rem)',
          lineHeight: 1.05,
          margin: '0 0 0.5rem',
          textAlign: 'center',
          textShadow: '0 4px 0 #0b3d1c, 0 0 24px rgba(255, 210, 77, 0.8)',
        }}
      >
        <Bounce>🎅</Bounce>{' '}
        <span
          ref={glitterRef}
          style={{
            backgroundImage:
              'linear-gradient(90deg, #fff, #ffd24d, #ff6b6b, #7dff9a, #fff, #ffd24d)',
            backgroundSize: '300% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: 'none',
            filter: 'drop-shadow(0 3px 0 #0b3d1c)',
          }}
        >
          Dagan's Christmas Wishlist
        </span>{' '}
        <Bounce late>🎁</Bounce>
      </h1>
      <p
        style={{
          margin: '0 0 0.7rem',
          textAlign: 'center',
          fontFamily: displayFont,
          fontWeight: 700,
          fontSize: '1.7rem',
          color: '#fff',
          textShadow: '0 2px 0 #0b3d1c',
        }}
      >
        🛠️ Powered by Santa's Workshop 🧝
      </p>
      <div
        aria-hidden="true"
        style={{
          height: '1.1rem',
          margin: '0 auto 1rem',
          maxWidth: '40rem',
          boxSizing: 'border-box',
          background: candyStripe,
          border: '3px solid #fff',
          borderRadius: '99px',
        }}
      />
      <p
        style={{
          margin: '0 0 1.5rem',
          textAlign: 'center',
          fontFamily: displayFont,
          fontSize: '1.6rem',
          textShadow: '0 2px 0 #0b3d1c',
        }}
      >
        The links are examples of the item. Prices are estimates based on the
        examples. 🦌🛷 Ho ho hold on, there's a price limit!
      </p>
    </header>
  )
}
