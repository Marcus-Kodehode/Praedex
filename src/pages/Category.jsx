import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'
import styles from './Category.module.css' // Egen css for grid og farger

export default function Category() {
  const { kategoriNavn } = useParams()
  const [bøker, setBøker] = useState([])
  const [laster, setLaster] = useState(false)
  const [feil, setFeil] = useState(null)

  useEffect(() => {
    if (!kategoriNavn) return

    setLaster(true)
    setFeil(null)

    fetch(`https://gutendex.com/books?topic=${kategoriNavn}`)
      .then((res) => res.json())
      .then((data) => {
        setBøker(data.results)
        setLaster(false)
      })
      .catch(() => {
        setFeil('Failed to fetch books in this category.')
        setLaster(false)
      })
  }, [kategoriNavn])

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Category: {kategoriNavn}</h2>

      {laster && <p>Loading books…</p>}
      {feil && <p>{feil}</p>}

      {bøker.length > 0 ? (
        <div className={styles.grid}>
          {bøker.map((bok) => (
            <BookCard key={bok.id} bok={bok} />
          ))}
        </div>
      ) : (
        !laster && <p>No books found in this category.</p>
      )}
    </div>
  )
}
