import { useState } from 'react'

function Placeholder() {
  return (
    <div className="photo empty" role="img" aria-label="No image available">
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M8 20l14-10 22 6-2 10-18-4z" />
        <path d="M34 22l22 34" />
      </svg>
    </div>
  )
}

export default function ItemCard({ item }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <li className="card">
      {item.imgUrl && !imgFailed ? (
        <div className="photo">
          <img
            src={item.imgUrl}
            alt={item.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        </div>
      ) : (
        <Placeholder />
      )}
      <div className="body">
        <h2 className="name">{item.name}</h2>
        {item.note && <p className="note">{item.note}</p>}
        <p className="price">{item.price}</p>
        <div className="link">
          {item.url ? (
            <a
              className="example"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Example on {item.store}
            </a>
          ) : (
            <span className="none">No example link</span>
          )}
        </div>
      </div>
    </li>
  )
}
