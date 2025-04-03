import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './BookCard.module.css'

export default function BookCard({ bok, onFjern }) {
  const forfatter = bok?.authors?.[0]?.name || 'Unknown author'
  const bilde = bok?.formats?.['image/jpeg'] || null

  const [erFavoritt, setErFavoritt] = useState(false)

  useEffect(() => {
    if (!bok || !bok.id) return

    const lagrede = JSON.parse(localStorage.getItem('favorites')) || []
    setErFavoritt(lagrede.some((b) => b?.id === bok.id))
  }, [bok])

  function leggTilIFavoritter() {
    if (!bok) return
    const lagrede = JSON.parse(localStorage.getItem('favorites')) || []
    const finnesAllerede = lagrede.some((b) => b?.id === bok.id)
    if (finnesAllerede) return

    const oppdatert = [...lagrede, bok]
    localStorage.setItem('favorites', JSON.stringify(oppdatert))
    setErFavoritt(true)
  }

  function fjernFraFavoritter() {
    const lagrede = JSON.parse(localStorage.getItem('favorites')) || []
    const oppdatert = lagrede.filter((b) => b?.id !== bok.id)
    localStorage.setItem('favorites', JSON.stringify(oppdatert))
    setErFavoritt(false)

    if (onFjern) {
      onFjern(bok.id)
    }
  }

  // Hvis bok er ugyldig, ikke render noe
  if (!bok || !bok.id) {
    return null
  }

  return (
    <div className={styles.card}>
      {bilde && <img src={bilde} alt={bok.title} />}
      <div>
        <h3>
          <Link to={`/bok/${bok.id}`}>{bok.title}</Link>
        </h3>
        <p>{forfatter}</p>
        <p>Downloads: {bok.download_count}</p>

        {/* Button container for centering buttons */}
        <div className={styles.buttonContainer}>
          {erFavoritt ? (
            <button onClick={fjernFraFavoritter}>📖 Remove from favorites</button>
          ) : (
            <button onClick={leggTilIFavoritter}>❤️ Add to favorites</button>
          )}
        </div>
      </div>
    </div>
  )
}
