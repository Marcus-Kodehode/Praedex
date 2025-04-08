import React from 'react';
import styles from './SuccessModal.module.css'; // OBS: dette må være riktig path og navn

export default function SuccessModal({ onClose }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Oops! Did you really think this would send a message?</h2>
        <p>Just kidding. Your message has been sent to the <em>imaginary</em> library. 🦄</p>
        <p>Thank you for your message! (Not really, but we appreciate your effort!)</p>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
}
