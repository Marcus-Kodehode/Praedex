import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import styles from './Home.module.css';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const søkeord = searchParams.get('sok') || '';
  const [bøker, setBøker] = useState([]);
  const [laster, setLaster] = useState(false);
  const [feil, setFeil] = useState(null);
  const [page, setPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const navigate = useNavigate();

  // Nullstill side når søkeord endres
  useEffect(() => {
    setPage(1);
  }, [søkeord]);

  // Hent data
  useEffect(() => {
    if (søkeord) {
      hentSøk();
    } else {
      hentPopulæreBøker();
    }
  }, [søkeord, page]);

  function hentPopulæreBøker() {
    setLaster(true);
    setFeil(null);
    setBøker([]); // Nullstill gamle bøker
    fetch(`https://gutendex.com/books?page=${page}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setBøker(data.results);
        setTotalBooks(data.count);
        setLaster(false);
      })
      .catch(() => {
        setFeil('Could not fetch popular books.');
        setLaster(false);
      });
  }

  function hentSøk() {
    setLaster(true);
    setFeil(null);
    setBøker([]); // Nullstill gamle søkeresultater
    fetch(`https://gutendex.com/books?search=${encodeURIComponent(søkeord)}&page=${page}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setBøker(data.results);
        setTotalBooks(data.count);
        setLaster(false);
      })
      .catch(() => {
        setFeil('Something went wrong while searching.');
        setLaster(false);
      });
  }

  const loadMoreBooks = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const clearSearch = () => {
    setSearchParams({});
    setBøker([]);
    setPage(1);
    navigate('/');
  };

  return (
    <div>
      <h2>{søkeord ? `Search results for: ${søkeord}` : 'Explore popular books'}</h2>

      {søkeord && (
        <button onClick={clearSearch} className={styles.resetSearchButton}>
          Clear Search
        </button>
      )}

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

      {bøker.length < totalBooks && !laster && (
        <button onClick={loadMoreBooks} className={styles.showMoreButton}>
          Show more
        </button>
      )}
    </div>
  );
}
