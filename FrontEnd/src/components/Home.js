import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Hoş Geldiniz</h1>
        <p>Lütfen giriş türünüzü seçin:</p>
        <div style={styles.buttonContainer}>
          <button onClick={() => navigate('/login')} style={styles.button}>Admin Giriş</button>
          <button onClick={() => navigate('/register')} style={styles.button}>Kullanıcı Giriş</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4e1d2',
    fontFamily: '"Georgia", serif',
    backgroundImage: 'url(https://example.com/book-background.jpg)',  // Background görseli
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '400px',
  },
  buttonContainer: {
    marginTop: '30px',
  },
  button: {
    backgroundColor: '#6f4f1f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '12px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

export default Home;
