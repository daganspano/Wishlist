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

  return (
    <>
      <Lights />
      <Marquee />
      <main>
        <Header />
        <Controls
          sortByPrice={sortByPrice}
          onSortChange={setSortByPrice}
          limit={limit}
          onLimitChange={setLimit}
          min={MIN_PRICE}
          max={MAX_PRICE}
        />
        <ul className="grid">
          {shown.map((item) => (
            <ItemCard key={item.priority} item={item} />
          ))}
        </ul>
        <footer id="count">
          {shown.length
            ? `${shown.length} of ${items.length} items`
            : `No items at or under $${limit}.`}
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
