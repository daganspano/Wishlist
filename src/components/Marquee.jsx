import { useAnimation } from '../hooks/useAnimation.js'
import { colors, displayFont } from '../styles.js'

const SCROLL = { transform: ['none', 'translateX(-100%)'] }
const SCROLL_TIMING = { duration: 18000, iterations: Infinity }

export default function Marquee() {
  const textRef = useAnimation(SCROLL, SCROLL_TIMING)

  return (
    <div
      aria-hidden="true"
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        background: colors.red,
        color: colors.gold,
        borderTop: '4px dashed #fff',
        borderBottom: '4px dashed #fff',
        fontFamily: displayFont,
        fontWeight: 700,
        fontSize: '1.6rem',
        padding: '0.15rem 0',
      }}
    >
      <span
        ref={textRef}
        style={{ display: 'inline-block', paddingLeft: '100%' }}
      >
        🎅 HO HO HO! 🎄 MERRY CHRISTMAS! 🎁 SANTA IS CHECKING THIS LIST TWICE! ⛄
        JINGLE ALL THE WAY! 🔔 ❄️ 🦌 🛷 ⭐ 🍪 🧦
      </span>
    </div>
  )
}
