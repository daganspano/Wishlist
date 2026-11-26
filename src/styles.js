// Style values that are used in more than one place. Anything used only once
// is written inline on the element it belongs to.

export const colors = {
  red: '#c1121f',
  green: '#0b6b2e',
  gold: '#ffd24d',
}

export const displayFont =
  '"Mountains of Christmas", "Barlow Condensed", "Comic Sans MS", cursive'

export const candyStripe =
  'repeating-linear-gradient(45deg, #c1121f 0 10px, #ffffff 10px 20px)'

// `border` must come before `borderImage`, the shorthand resets it
export const candyBorder = {
  border: '10px solid transparent',
  borderImage: `${candyStripe} 10`,
}

export const focusRing = {
  outline: `4px dotted ${colors.gold}`,
  outlineOffset: '3px',
}

export const controlLabel = {
  fontFamily: displayFont,
  fontWeight: 700,
  fontSize: '1.8rem',
  color: colors.gold,
  textShadow: '0 2px 0 #06260f',
}

export const photoFrame = {
  aspectRatio: '1 / 1',
  boxSizing: 'border-box',
  background: '#fff',
  borderBottom: `4px solid ${colors.green}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}

export const socialIcon = {
  width: '1.5rem',
  height: '1.5rem',
}
