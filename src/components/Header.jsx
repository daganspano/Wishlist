export default function Header() {
  return (
    <header>
      <h1>
        <span className="bounce">🎅</span>{' '}
        <span className="glitter">Dagan's Christmas Wishlist</span>{' '}
        <span className="bounce">🎁</span>
      </h1>
      <p className="powered">Powered by Santa's Workshop</p>
      <div className="stripe" aria-hidden="true" />
      <p className="intro">
        The links are examples of the item. Prices are estimates based on the
        examples. 🦌🛷 Ho ho hold on, there's a price limit!
      </p>
    </header>
  )
}
