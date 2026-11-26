import { useEffect, useRef, useState } from 'react'
import { useAnimation } from '../hooks/useAnimation.js'

const TRAIL = ['❄️', '⭐', '🎄', '🎁', '🔔']
const MIN_INTERVAL_MS = 45

const FADE = {
  transform: ['none', 'translateY(40px) rotate(180deg) scale(0.3)'],
  opacity: [1, 0],
  easing: 'ease-out',
}
const FADE_TIMING = { duration: 900, fill: 'forwards' }

function Spark({ spark, onDone }) {
  const ref = useAnimation(FADE, FADE_TIMING, {
    onFinish: () => onDone(spark.id),
  })

  return (
    <span
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: spark.left,
        top: spark.top,
        zIndex: 70,
        pointerEvents: 'none',
      }}
    >
      {spark.char}
    </span>
  )
}

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
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
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
    <Spark key={spark.id} spark={spark} onDone={remove} />
  ))
}
