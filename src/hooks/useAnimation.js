import { useEffectEvent, useLayoutEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js'

// Plays a Web Animations API animation on the element the returned ref is
// attached to, standing in for CSS @keyframes. Nothing plays when the user
// prefers reduced motion.
//
// `keyframes` and `timing` must be stable references (module constants or
// state), because a new reference restarts the animation.
export function useAnimation(
  keyframes,
  timing,
  { active = true, onFinish } = {},
) {
  const ref = useRef(null)
  const calm = usePrefersReducedMotion()
  const handleFinish = useEffectEvent(() => onFinish?.())

  useLayoutEffect(() => {
    if (calm || !active) return
    const animation = ref.current.animate(keyframes, timing)
    animation.onfinish = () => handleFinish()
    return () => animation.cancel()
  }, [keyframes, timing, active, calm])

  return ref
}
