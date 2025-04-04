import { useState, useEffect } from 'react'
import BookCard from '../components/BookCard'
import styles from './Explore.module.css' // Legg til CSS-stil for utforsker-siden

export default function Explore() {
  const [bøker, setBøker] = useState([])
  const [søkeord, setSøkeord] = useState('')
  const [sortering, setSortering] = useState('popularity') // Default sorting: popularitet
  const [laster, setLaster] = useState(false)
  const [feil, setFeil] = useState(null)

  useEffect(() => {
    hentBøker()
  }, [søkeord, sortering])

  // Funksjon for å hente bøker med søkekriterier
  function hentBøker() {
    setLaster(true)
    setFeil(null)

    const url = `https://gutendex.com/books?search=${encodeURIComponent(søkeord)}&sort=${encodeURIComponent(sortering)}`
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBøker(data.results)
        setLaster(false)
      })
      .catch(() => {
        setFeil('Something went wrong while fetching books.')
        setLaster(false)
      })
  }

  // Håndtering av søk
  function handleSubmit(e) {
    e.preventDefault()
    hentBøker()
  }

  return (
    <div className={styles.explore}>
      <h2>Explore Books</h2>

      {/* Søkeinput */}
      <form onSubmit={handleSubmit} className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for books…"
          value={søkeord}
          onChange={(e) => setSøkeord(e.target.value)}
          className={styles.searchInput}
        />
      </form>

      {/* Sortering */}
      <div className={styles.sorting}>
        <label htmlFor="sorting">Sort by: </label>
        <select
          id="sorting"
          value={sortering}
          onChange={(e) => setSortering(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="popularity">Popularity</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </div>

      {/* Vise bokene */}
      {laster && <p>Loading books...</p>}
      {feil && <p>{feil}</p>}
      
      <div className={styles.grid}>
        {bøker.length > 0 ? (
          bøker.map((bok) => <BookCard key={bok.id} bok={bok} />)
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  )
}
