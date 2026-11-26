import { useState } from 'react'

// Stands in for the CSS :hover pseudo-class. Spread the returned handlers
// onto the element to track.
export function useHover() {
  const [hovered, setHovered] = useState(false)
  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }
  return [hovered, handlers]
}
