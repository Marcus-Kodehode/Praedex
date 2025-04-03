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

  useEffect(() => {
    if (!søkeord) {
      // Vis populære bøker hvis ingen søkeord
      hentPopulæreBøker()
    } else {
      hentSøk()
    }
  }, [søkeord])

  function hentPopulæreBøker() {
    setLaster(true)
    setFeil(null)
    fetch('https://gutendex.com/books?sort=popular')
      .then((res) => res.json())
      .then((data) => {
        setBøker(data.results)
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
    fetch(`https://gutendex.com/books?search=${encodeURIComponent(søkeord)}`)
      .then((res) => res.json())
      .then((data) => {
        setBøker(data.results)
        setLaster(false)
      })
      .catch(() => {
        setFeil('Something went wrong while searching.')
        setLaster(false)
      })
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
    </div>
  )
}
