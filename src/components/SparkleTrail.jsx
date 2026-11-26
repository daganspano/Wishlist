import { useEffect, useRef, useState } from 'react'

const TRAIL = ['❄️', '⭐', '🎄', '🎁', '🔔']
const MIN_INTERVAL_MS = 45

export default function SparkleTrail() {
  const [sparks, setSparks] = useState([])
  const nextId = useRef(0)

  useEffect(() => {
    let last = 0
    function onMove(e) {
      const now = Date.now()
      if (now - last < MIN_INTERVAL_MS) return
      last = now
      const spark = {
        id: nextId.current++,
        char: TRAIL[Math.floor(Math.random() * TRAIL.length)],
        style: { left: `${e.clientX}px`, top: `${e.clientY}px` },
      }
      setSparks((current) => [...current, spark])
    }
    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  function remove(id) {
    setSparks((current) => current.filter((spark) => spark.id !== id))
  }

  return sparks.map((spark) => (
    <span
      key={spark.id}
      className="spark"
      style={spark.style}
      aria-hidden="true"
      onAnimationEnd={() => remove(spark.id)}
    >
      {spark.char}
    </span>
  ))
}
