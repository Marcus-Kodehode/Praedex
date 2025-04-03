import { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'

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
      <h2>Mine Favorites</h2>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
        {favoritter.map((bok) => (
          <BookCard key={bok.id} bok={bok} onFjern={fjernFavoritt} />
        ))}
      </div>
    </div>
  )
}
