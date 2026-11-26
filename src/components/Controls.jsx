import { useState } from 'react'

export default function Controls({
  sortByPrice,
  onSortChange,
  limit,
  onLimitChange,
  min,
  max,
}) {
  // Text of the number box, kept separately so partial/invalid input can be typed
  const [limitText, setLimitText] = useState(String(limit))

  function handleSlider(e) {
    const n = Number(e.target.value)
    setLimitText(String(n))
    onLimitChange(n)
  }

  function handleBox(e) {
    setLimitText(e.target.value)
    const n = parseFloat(e.target.value)
    if (!isFinite(n) || n < 0) return
    onLimitChange(n)
  }

  return (
    <div className="sort">
      <span className="sort-label">Sort By:</span>
      <span
        className={sortByPrice ? 'opt' : 'opt active'}
        onClick={() => onSortChange(false)}
      >
        Most Wanted
      </span>
      <button
        type="button"
        className="switch"
        role="switch"
        aria-checked={sortByPrice}
        aria-label="Sort by price instead of most wanted"
        onClick={() => onSortChange(!sortByPrice)}
      >
        <span className="knob" />
      </button>
      <span
        className={sortByPrice ? 'opt active' : 'opt'}
        onClick={() => onSortChange(true)}
      >
        Price
      </span>
      <div className="limit">
        <label htmlFor="limit">Price Limit:</label>
        <input
          type="range"
          id="limit"
          step="1"
          min={min}
          max={max}
          value={Math.min(max, Math.max(min, limit))}
          onChange={handleSlider}
        />
        <span className="money">
          $
          <input
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            aria-label="Price limit in dollars"
            value={limitText}
            onChange={handleBox}
            onBlur={() => setLimitText(String(limit))}
          />
        </span>
      </div>
    </div>
  )
}
