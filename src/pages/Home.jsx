import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BookCard from '../components/BookCard'
import styles from './Home.module.css'

export default function Home() {
  const [searchParams] = useSearchParams()
  const søkeord = searchParams.get('sok') || ''
  const [bøker, setBøker] = useState([])
  const [laster, setLaster] = useState(false)
  const [feil, setFeil] = useState(null)
  const [page, setPage] = useState(1) // Page state for paginering
  const [totalBooks, setTotalBooks] = useState(0) // Total antall bøker for å vite når vi kan slutte å hente

  useEffect(() => {
    if (!søkeord) {
      // Vis populære bøker hvis ingen søkeord
      hentPopulæreBøker()
    } else {
      hentSøk()
    }
  }, [søkeord, page]) // Hver gang vi endrer søkeord eller side, hent nye bøker

  function hentPopulæreBøker() {
    setLaster(true)
    setFeil(null)
    fetch(`https://gutendex.com/books?page=${page}&limit=10`) // Hent bøker basert på den aktuelle siden
      .then((res) => res.json())
      .then((data) => {
        setBøker((prevBøker) => [...prevBøker, ...data.results]) // Legg til de nye bøkene til eksisterende
        setTotalBooks(data.count) // Sett total antall bøker
        setLaster(false)
      })
      .catch(() => {
        setFeil('Could not fetch popular books.')
        setLaster(false)
      })
  }

  function hentSøk() {
    setLaster(true)
    setFeil(null)
    fetch(`https://gutendex.com/books?search=${encodeURIComponent(søkeord)}&page=${page}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setBøker((prevBøker) => [...prevBøker, ...data.results]) // Legg til de nye bøkene til eksisterende
        setTotalBooks(data.count) // Sett total antall bøker
        setLaster(false)
      })
      .catch(() => {
        setFeil('Something went wrong while searching.')
        setLaster(false)
      })
  }

  const loadMoreBooks = () => {
    setPage((prevPage) => prevPage + 1) // Øk siden når brukeren klikker på "Vis mer"
  }

  return (
    <div>
      <h2>{søkeord ? `Search results for: ${søkeord}` : 'Explore popular books'}</h2>

      {laster && <p>Loading books...</p>}
      {feil && <p>{feil}</p>}

      {bøker.length > 0 ? (
        <div className={styles.grid}>
          {bøker.map((bok) => (
            <BookCard key={bok.id} bok={bok} />
          ))}
        </div>
      ) : !laster ? (
        <p>{søkeord ? 'No books found.' : 'No books available.'}</p>
      ) : null}

      {/* Vis mer knapp */}
      {bøker.length < totalBooks && !laster && (
        <button onClick={loadMoreBooks}>Show more</button> // Laster flere bøker når knappen trykkes
      )}
    </div>
  )
}
