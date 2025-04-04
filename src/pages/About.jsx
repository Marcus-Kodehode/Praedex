import React from 'react'
import styles from './About.module.css'

const About = () => {
  return (
    <div className={styles.container}>
      <h1>About Praedex</h1>
      <section className={styles.section}>
        <h2>Who am I?</h2>
        <p>
          Hi, I'm Marcus, a student and developer working on Praedex. I have a passion for programming, web development, and building applications that help people. 
          I am currently learning Frontend and Backend development, focusing on JavaScript, React, and API integration.
        </p>
      </section>

      <section className={styles.section}>
        <h2>What is Praedex?</h2>
        <p>
          Praedex is an app that allows users to explore a vast collection of classic books from Project Gutenberg. 
          The app gives users the ability to browse, search, and save books in their favorites for later. 
          It integrates with the Gutenberg API (Gutendex) to access the library of over 60,000 public domain books.
        </p>
      </section>

      <section className={styles.section}>
        <h2>What is Gutendex?</h2>
        <p>
          Gutendex is an open-source API that gives users access to Project Gutenberg’s entire library. 
          Project Gutenberg is a digital library offering free access to thousands of classic literary works, all in the public domain.
          The API allows developers to search for books, retrieve metadata like titles, authors, download counts, and more.
        </p>
        <p>
          With Gutendex, developers can integrate Project Gutenberg’s data into their own applications, just like in Praedex.
        </p>
      </section>

      {/* New section for Credits */}
      <section className={styles.section}>
        <h2>Credits</h2>
        <p>
          The initial layout and inspiration for this project were taken from two of my classmates. 
          Their projects provided a solid starting point for Praedex, and I have since extended and improved the app to add more features and functionality.
        </p>
        <p>
          You can check out their work at the following links:
        </p>
        <ul>
          <li><a href="https://gutendex-lib.vercel.app/" target="_blank" rel="noopener noreferrer">Richard's Project</a></li>
          <li><a href="https://gutendex-bibliotek.vercel.app/" target="_blank" rel="noopener noreferrer">Lillan's Project</a></li>
        </ul>
      </section>

    </div>
  )
}

export default About
