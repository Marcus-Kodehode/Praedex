import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { useState, useEffect } from 'react'

export default function Header({ bøker = [] }) {
  const [søkeord, setSøkeord] = useState('')
  const [forslag, setForslag] = useState([])
  const navigate = useNavigate()

  const kategorier = [
    'Fiction', 'Mystery', 'Thriller', 'Romance', 'Fantasy',
    'Morality', 'Society', 'Power', 'Justice',
    'Adventure', 'Tragedy', 'War', 'Philosophy'
  ]

  useEffect(() => {
    if (!søkeord.trim()) {
      setForslag([])
      return
    }

    const filtrert = bøker
      .filter((bok) =>
        bok?.title?.toLowerCase().includes(søkeord.toLowerCase())
      )
      .slice(0, 5)

    setForslag(filtrert)
  }, [søkeord, bøker])

  function handleSubmit(e) {
    e.preventDefault()
    if (!søkeord.trim()) return
    navigate(`/?sok=${encodeURIComponent(søkeord)}`)
    setSøkeord('')
    setForslag([])
  }

  function velgForslag(tittel) {
    setSøkeord('')                            // Blank ut input
    setForslag([])                            // Skjul forslag
    navigate(`/?sok=${encodeURIComponent(tittel)}`)  // Naviger
  }

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>Praedex</NavLink>

      <nav className={styles.nav}>
        <NavLink to="/favoritter" className={styles.navItem}>❤️</NavLink>
        <NavLink to="/contact" className={styles.navItem}>📩</NavLink>
        <NavLink to="/about" className={styles.navItem}>ℹ️</NavLink>
        {/* New Link to Utforsk page */}
      </nav>

      <form onSubmit={handleSubmit} className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for books…"
          value={søkeord}
          onChange={(e) => setSøkeord(e.target.value)}
          className={styles.searchInput}
        />
        {forslag.length > 0 && (
          <ul className={styles.forslagListe}>
            {forslag.map((bok) => (
              <li
                key={bok.id}
                className={styles.forslagItem}
                onClick={() => velgForslag(bok.title)}
              >
                {bok.title}
              </li>
            ))}
          </ul>
        )}
      </form>

      <select
        onChange={(e) => {
          const valgt = e.target.value
          if (valgt) navigate(`/kategori/${valgt}`)
        }}
        className={styles.categorySelect}
      >
        <option value="">Choose category</option>
        {kategorier.map((kat) => (
          <option key={kat} value={kat.toLowerCase()}>
            {kat}
          </option>
        ))}
      </select>
    </header>
  )
}
