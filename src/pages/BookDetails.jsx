import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BookDetails() {
  const { id } = useParams()
  const [bok, setBok] = useState(null)
  const [laster, setLaster] = useState(false)
  const [feil, setFeil] = useState(null)

  useEffect(() => {
    if (!id) return

    setLaster(true)
    setFeil(null)

    fetch(`https://gutendex.com/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBok(data)
        setLaster(false)
      })
      .catch(() => {
        setFeil('Failed to fetch book details.')
        setLaster(false)
      })
  }, [id])

  if (laster) return <p>Loading book...</p>
  if (feil) return <p>{feil}</p>
  if (!bok) return <p>No book found.</p>

  const forfatter = bok.authors?.[0]?.name || 'Unknown author'
  const bilde = bok.formats['image/jpeg']
  const språk = bok.languages?.[0] || 'Unknown'
  const kategori = bok.subjects?.[0] || 'Unknown category'

  return (
    <div>
      <h2>{bok.title}</h2>
      {bilde && <img src={bilde} alt={bok.title} />}
      <p><strong>Author:</strong> {forfatter}</p>
      <p><strong>Category:</strong> {kategori}</p>
      <p><strong>Language:</strong> {språk}</p>
      <p><strong>Downloads:</strong> {bok.download_count}</p>

      {bok.formats['text/html'] && (
        <p>
          <a href={bok.formats['text/html']} target="_blank" rel="noreferrer">
            📖 Read the book online
          </a>
        </p>
      )}
    </div>
  )
}
