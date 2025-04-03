import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Header from './components/Header'

import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Category from './pages/Category'
import BookDetails from './pages/BookDetails'
import Contact from './pages/Contact'
import About from './pages/About'

function App() {
  const [bøker, setBøker] = useState([])

  useEffect(() => {
    async function hentBøker() {
      try {
        const respons = await fetch('https://gutendex.com/books')
        const data = await respons.json()
        setBøker(data.results)
      } catch (err) {
        console.error('Klarte ikke hente bøker:', err)
      }
    }

    hentBøker()
  }, [])

  return (
    <BrowserRouter>
      <Header bøker={bøker} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritter" element={<Favorites />} />
          <Route path="/kategori/:kategoriNavn" element={<Category />} />
          <Route path="/bok/:id" element={<BookDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
