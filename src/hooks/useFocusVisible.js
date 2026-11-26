import { useState } from 'react'

// Stands in for the CSS :focus-visible pseudo-class. Spread the returned
// handlers onto the element to track.
export function useFocusVisible() {
  const [focusVisible, setFocusVisible] = useState(false)
  const sync = (e) => setFocusVisible(e.currentTarget.matches(':focus-visible'))
  const handlers = {
    onFocus: sync,
    // A key press makes an element that was focused by mouse focus-visible
    onKeyDown: sync,
    onBlur: () => setFocusVisible(false),
  }
  return [focusVisible, handlers]
}
