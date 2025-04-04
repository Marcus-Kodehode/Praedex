import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'
import styles from './Category.module.css' // Egen CSS for grid og farger

export default function Category() {
  const { kategoriNavn } = useParams()
  const [bøker, setBøker] = useState([])
  const [laster, setLaster] = useState(false)
  const [feil, setFeil] = useState(null)
  const [page, setPage] = useState(1) // Page state for paginering
  const [totalBooks, setTotalBooks] = useState(0) // Total antall bøker for å vite når vi kan slutte å hente

  useEffect(() => {
    if (!kategoriNavn) return

    setLaster(true)
    setFeil(null)

    fetchBooks() // Hent bøker ved første lasting
  }, [kategoriNavn, page]) // Hver gang vi endrer kategori eller page, hent bøker

  function fetchBooks() {
    fetch(`https://gutendex.com/books?topic=${kategoriNavn}&page=${page}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setBøker((prevBøker) => [...prevBøker, ...data.results]) // Legg til de nye bøkene til eksisterende
        setTotalBooks(data.count) // Sett total antall bøker
        setLaster(false)
      })
      .catch(() => {
        setFeil('Failed to fetch books in this category.')
        setLaster(false)
      })
  }

  const loadMoreBooks = () => {
    setPage((prevPage) => prevPage + 1) // Øk siden når brukeren klikker på "Show more"
  }

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

      {/* Show more button */}
      {bøker.length < totalBooks && !laster && (
        <button onClick={loadMoreBooks} className={styles.showMoreButton}>Show more</button>
      )}
    </div>
  )
}
