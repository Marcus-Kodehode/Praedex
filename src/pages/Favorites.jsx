import { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'
import styles from './Favorites.module.css' // Import CSS for styling

export default function Favorites() {
  const [favoritter, setFavoritter] = useState([])

  useEffect(() => {
    const lagrede = JSON.parse(localStorage.getItem('favorites')) || []
    // Filtrer bort ugyldige/null objekter
    const gyldige = lagrede.filter((bok) => bok && bok.id)
    setFavoritter(gyldige)
  }, [])

  function fjernFavoritt(id) {
    const oppdatert = favoritter.filter((bok) => bok.id !== id)
    localStorage.setItem('favorites', JSON.stringify(oppdatert))
    setFavoritter(oppdatert)
  }

  return (
    <div>
      <h2>My Favorites</h2>
      <div className={styles.grid}>
        {favoritter.length > 0 ? (
          favoritter.map((bok) => (
            <BookCard
              key={bok.id}
              bok={bok}
              onFjern={() => fjernFavoritt(bok.id)}
            />
          ))
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  )
}
