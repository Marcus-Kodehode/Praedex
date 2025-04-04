import React from 'react';
import styles from './SuccessModal.module.css'; // Import CSS module

const SuccessModal = ({ onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <h3>Oops! Did you really think this would send a message?</h3>
        <p>Just kidding. Your message has been sent to the *imaginary* library. 🦄</p>
        <p>Thank you for your message! (Not really, but we appreciate your effort!)</p>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessModal;
