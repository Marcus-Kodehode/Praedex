import { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import styles from './BookCard.module.css';

export default function BookCard({ bok, onFjern }) {
  // Sjekk om forfatter er definert, og fall tilbake på "Ukjent forfatter" hvis ikke
  const forfatter = bok?.authors?.[0]?.name || 'Ukjent forfatter'; 
  const bilde = bok?.formats?.['image/jpeg'] || null; 

  // Hent nedlastingslenken for EPUB, PDF og Kindle
  const downloadLink = bok?.formats?.['application/epub+zip'] || 
                       bok?.formats?.['application/pdf'] || 
                       bok?.formats?.['application/x-mobipocket-ebook'];

  const [erFavoritt, setErFavoritt] = useState(false);

  useEffect(() => {
    if (!bok || !bok.id) return;

    const lagrede = JSON.parse(localStorage.getItem('favorites')) || [];
    setErFavoritt(lagrede.some((b) => b?.id === bok.id));
  }, [bok]);

  function leggTilIFavoritter() {
    if (!bok) return;
    const lagrede = JSON.parse(localStorage.getItem('favorites')) || [];
    const finnesAllerede = lagrede.some((b) => b?.id === bok.id);
    if (finnesAllerede) return;

    const oppdatert = [...lagrede, bok];
    localStorage.setItem('favorites', JSON.stringify(oppdatert));
    setErFavoritt(true);
  }

  function fjernFraFavoritter() {
    const lagrede = JSON.parse(localStorage.getItem('favorites')) || [];
    const oppdatert = lagrede.filter((b) => b?.id !== bok.id);
    localStorage.setItem('favorites', JSON.stringify(oppdatert));
    setErFavoritt(false);

    if (onFjern) {
      onFjern(bok.id);
    }
  }

  // Hvis bok er ugyldig, ikke render noe
  if (!bok || !bok.id) {
    return null;
  }

  return (
    <div className={styles.card}>
      {bilde && <img src={bilde} alt={bok.title} />}
      <div>
        <h3>
          <Link to={`/bok/${bok.id}`}>{bok.title}</Link>
        </h3>
        <p>{forfatter}</p>
        <p>Nedlastinger: {bok.download_count}</p>

        {erFavoritt ? (
          <button onClick={fjernFraFavoritter}>📖 Fjern fra favoritt</button>
        ) : (
          <button onClick={leggTilIFavoritter}>❤️ Legg til favoritt</button>
        )}

        {/* Vis nedlastingsknapp hvis downloadLink finnes */}
        {downloadLink && (
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            <button className={styles.downloadButton}>Last ned bok</button>
          </a>
        )}
      </div>
    </div>
  );
}
