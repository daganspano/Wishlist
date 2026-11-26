import { useMemo, useState } from 'react'
import Controls from './components/Controls.jsx'
import Header from './components/Header.jsx'
import ItemCard from './components/ItemCard.jsx'
import Lights from './components/Lights.jsx'
import Marquee from './components/Marquee.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import Snowfall from './components/Snowfall.jsx'
import SparkleTrail from './components/SparkleTrail.jsx'
import { items, priceValue } from './data/items.js'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion.js'
import { colors, displayFont } from './styles.js'

const prices = items.map(priceValue)
const MIN_PRICE = Math.min(...prices)
const MAX_PRICE = Math.max(...prices)

export default function App() {
  const [sortByPrice, setSortByPrice] = useState(false)
  const [limit, setLimit] = useState(MAX_PRICE)
  const calm = usePrefersReducedMotion()

  const shown = useMemo(
    () =>
      items
        .filter((item) => priceValue(item) <= limit)
        .sort((a, b) => {
          if (sortByPrice) {
            const d = priceValue(a) - priceValue(b)
            if (d !== 0) return d
          }
          return a.priority - b.priority
        }),
    [sortByPrice, limit],
  )

  const countText = shown.length
    ? `${shown.length} of ${items.length} items`
    : `No items at or under $${limit}.`

  return (
    <>
      <Lights />
      <Marquee />
      <main
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '2rem 1.25rem 4rem',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        <Header />
        <Controls
          sortByPrice={sortByPrice}
          onSortChange={setSortByPrice}
          limit={limit}
          onLimitChange={setLimit}
          min={MIN_PRICE}
          max={MAX_PRICE}
        />
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(15.5rem, 1fr))',
            gap: '1.8rem 1.4rem',
          }}
        >
          {/* The position in the list picks each card's tilt and emoji */}
          {shown.map((item, index) => (
            <ItemCard key={item.priority} item={item} index={index} />
          ))}
        </ul>
        <footer
          id="count"
          style={{
            marginTop: '2.5rem',
            textAlign: 'center',
            fontFamily: displayFont,
            fontWeight: 700,
            fontSize: '2rem',
            color: colors.gold,
            textShadow: '0 3px 0 #06260f',
          }}
        >
          🎄 {countText} 🎄
        </footer>
      </main>
      <SiteFooter />
      {!calm && (
        <>
          <Snowfall />
          <SparkleTrail />
        </>
      )}
    </>
  )
}
