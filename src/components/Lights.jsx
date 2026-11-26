const BULBS = Array.from({ length: 40 }, (_, i) => i)

export default function Lights() {
  return (
    <div className="lights" aria-hidden="true">
      {BULBS.map((i) => (
        <span key={i} className="bulb" />
      ))}
    </div>
  )
}
