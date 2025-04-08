import React from 'react';
import styles from './JoakimModal.module.css';

export default function JoakimModal({ onClose }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        {/* Bilde */}
        <img
          src="/images/joakim.jpg"
          alt="Joakim the Identified"
          className={styles.joakimImage}
        />

        <h2 className={styles.modalTitle}>🧙‍♂️ You’ve been identified, Joakim.</h2>

        <hr className={styles.separator} />

        <p><em>The system trembles... A name echoes through the codebase...</em></p>

        <p>
          Joakim — not by choice, but by legend. Rumored to be a half-goblin, half-wizard,
          100% unpredictable. His appearance in this form has triggered ancient UI scripts
          long thought deprecated.
        </p>

        <p>
          Your message has not been sent. Instead, it’s been trapped in a dimensional socket
          and studied by a committee of confused backend gnomes. 🧑‍💻🪵
        </p>

        <p>
          You may proceed, but be warned: the goblin council is now aware of your
          presence. And they <em>do</em> love bug reports.
        </p>

        <button onClick={onClose} className={styles.joakimCloseButton}>
          Acknowledge the prophecy
        </button>
      </div>
    </div>
  );
}
