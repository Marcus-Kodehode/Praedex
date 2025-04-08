import React, { useState } from 'react';
import SuccessModal from '../components/SuccessModal';
import JoakimModal from '../components/JoakimModal';
import styles from './Contact.module.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showStandardModal, setShowStandardModal] = useState(false);
  const [showJoakimModal, setShowJoakimModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isJoakim = name.trim().toLowerCase() === 'joakim';
    setShowJoakimModal(isJoakim);
    setShowStandardModal(!isJoakim);

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className={styles.contactContainer}>
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.inputField}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.textArea}
          required
        />
        <button type="submit" className={styles.submitButton}>
          Send Message
        </button>
      </form>

      {/* Modal visning */}
      {showStandardModal && <SuccessModal onClose={() => setShowStandardModal(false)} />}
      {showJoakimModal && <JoakimModal onClose={() => setShowJoakimModal(false)} />}
    </div>
  );
};

export default Contact;
