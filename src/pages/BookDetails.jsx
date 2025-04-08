import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './BookDetails.module.css';

export default function BookDetails() {
  const { id } = useParams(); // Få tak i bokens ID fra URL-en
  const [bok, setBok] = useState(null); // State for å lagre bokdataene
  const [erFavoritt, setErFavoritt] = useState(false);

  useEffect(() => {
    // Hente bokdetaljer fra API basert på id
    fetch(`https://gutendex.com/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Bokdata hentet:', data);  // Legger til console log for å sjekke hva som skjer
        setBok(data);  // Oppdaterer state med bokdataene
        // Sjekk om boken er favoritt
        const lagrede = JSON.parse(localStorage.getItem('favorites')) || [];
        setErFavoritt(lagrede.some((b) => b?.id === data.id));
      })
      .catch((error) => {
        console.error('Error fetching book details:', error); // Logge feil om fetchen feiler
      });
  }, [id]); // Kjør funksjonen når ID-en endres (f.eks. ved navigering)

  if (!bok) {
    return <p>Loading book details...</p>; // Vist mens bokdataene lastes
  }

  // Hent informasjonen fra bokdataene
  const authors = bok.authors && Array.isArray(bok.authors) ? bok.authors.map((author) => author.name).join(', ') : 'No author information available';
  const description = bok.summaries || 'No description available.';
  const category = bok.subjects?.join(', ') || 'No category available';
  const language = bok.language || 'No language information available';
  const downloads = bok.download_count || 'No download count available';
  const imageUrl = bok.formats["image/jpeg"] || 'https://via.placeholder.com/150';  // Sett et placeholder-bilde om det mangler

  // Hente nedlastingslenker for EPUB, PDF og Kindle
  const epubLink = bok.formats?.['application/epub+zip'];
  const pdfLink = bok.formats?.['application/pdf'];
  const mobiLink = bok.formats?.['application/x-mobipocket-ebook'];

  // Sett opp nedlastingslenken (prioriter PDF først, deretter EPUB og Mobi)
  const downloadLink = pdfLink || epubLink || mobiLink;
  
  // Håndtere favoritter
  function leggTilIFavoritter() {
    if (!bok) return;
    const lagrede = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!lagrede.some((b) => b?.id === bok.id)) {
      const oppdatert = [...lagrede, bok];
      localStorage.setItem('favorites', JSON.stringify(oppdatert));
      setErFavoritt(true);
    }
  }

  function fjernFraFavoritter() {
    const lagrede = JSON.parse(localStorage.getItem('favorites')) || [];
    const oppdatert = lagrede.filter((b) => b?.id !== bok.id);
    localStorage.setItem('favorites', JSON.stringify(oppdatert));
    setErFavoritt(false);
  }

  return (
    <div className={styles.bookDetails}>
      <h1 className={styles.title}>{bok.title}</h1>
      <img src={imageUrl} alt={bok.title} className={styles.bookImage} />
      
      <div className={styles.bookInfo}>
        <p><strong className={styles.infoLabel}>Author(s):</strong> {authors}</p>
        <p><strong className={styles.infoLabel}>Category:</strong> {category}</p>
        <p><strong className={styles.infoLabel}>Language:</strong> {language}</p>
        <p><strong className={styles.infoLabel}>Downloads:</strong> {downloads}</p>
      </div>

      <div className={styles.description}>
        <h3>Description:</h3>
        <p>{description}</p>
      </div>

      <div className={styles.buttons}>
        {/* Button for reading or downloading */}
        {epubLink && (
          <a href={`https://www.gutenberg.org/ebooks/${bok.id}`} target="_blank" rel="noopener noreferrer">
            <button className={styles.readButton}>Read the Book Online</button>
          </a>
        )}
        
        {downloadLink && (
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            <button className={styles.downloadButton}>Download the Book</button>
          </a>
        )}

        {/* Favorite button */}
        {erFavoritt ? (
          <button onClick={fjernFraFavoritter} className={styles.favoriteButton}>Remove from Favorites</button>
        ) : (
          <button onClick={leggTilIFavoritter} className={styles.favoriteButton}>Add to Favorites</button>
        )}
      </div>
    </div>
  );
}
