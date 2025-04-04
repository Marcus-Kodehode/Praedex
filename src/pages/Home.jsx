import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import styles from './Home.module.css';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const søkeord = searchParams.get('sok') || '';  // Hent søkeord fra URL
  const [bøker, setBøker] = useState([]);
  const [laster, setLaster] = useState(false);
  const [feil, setFeil] = useState(null);
  const [page, setPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const navigate = useNavigate();  // Bruker navigate for å håndtere URL-oppdatering

  // Fetch bøker ved søk eller når siden laster
  useEffect(() => {
    console.log('Søkeord:', søkeord);  // Legger til logg her
    if (søkeord) {
      hentSøk();
    } else {
      hentPopulæreBøker();
    }
  }, [søkeord, page]);  // Kjør funksjonen ved endring av søk eller side

  // Hent populære bøker
  function hentPopulæreBøker() {
    console.log('Henter populære bøker...');  // Logg for å se når vi henter populære bøker
    setLaster(true);
    setFeil(null);
    fetch(`https://gutendex.com/books?page=${page}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Populære bøker:', data);  // Logg dataene vi får tilbake
        setBøker((prevBøker) => [...prevBøker, ...data.results]);
        setTotalBooks(data.count);
        setLaster(false);
      })
      .catch(() => {
        setFeil('Could not fetch popular books.');
        setLaster(false);
      });
  }

  // Hent bøker basert på søket
  function hentSøk() {
    console.log('Henter bøker for søk:', søkeord);  // Logg for å se hva vi søker etter
    setLaster(true);
    setFeil(null);
    fetch(`https://gutendex.com/books?search=${encodeURIComponent(søkeord)}&page=${page}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Søkeresultater:', data);  // Logg søkedata
        setBøker((prevBøker) => [...prevBøker, ...data.results]);
        setTotalBooks(data.count);
        setLaster(false);
      })
      .catch(() => {
        setFeil('Something went wrong while searching.');
        setLaster(false);
      });
  }

  // Håndtere "Show more"-knappen
  const loadMoreBooks = () => {
    console.log('Last inn flere bøker...');  // Logg når "Show more" trykkes
    setPage((prevPage) => prevPage + 1);
  };

  // Tilbakestill søket (Clear Search)
  const clearSearch = () => {
    console.log('Rydder søket');  // Logg når søket nullstilles
    setSearchParams({ sok: '' });  // Tøm søkeordet i URL-en
    navigate('/');  // Naviger tilbake til hovedsiden
  };

  return (
    <div>
      <h2>{søkeord ? `Search results for: ${søkeord}` : 'Explore popular books'}</h2>

      {/* Clear Search Button */}
      {søkeord && (
        <button onClick={clearSearch} className={styles.resetSearchButton}>
          Clear Search
        </button>
      )}

      {/* Laster status */}
      {laster && <p>Loading books...</p>}
      {feil && <p>{feil}</p>}

      {/* Visning av bøker */}
      {bøker.length > 0 ? (
        <div className={styles.grid}>
          {bøker.map((bok) => (
            // Bruker kun bok.id som key, som skal være unik for hver bok
            <BookCard key={bok.id} bok={bok} />
          ))}
        </div>
      ) : !laster ? (
        <p>{søkeord ? 'No books found.' : 'No books available.'}</p>
      ) : null}

      {/* Show More Button */}
      {bøker.length < totalBooks && !laster && (
        <button onClick={loadMoreBooks} className={styles.showMoreButton}>
          Show more
        </button>
      )}
    </div>
  );
}
