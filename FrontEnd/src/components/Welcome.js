import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

function Welcome() {
  return (
               <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">E-Kitap</div>
        <div className="nav-links">
          {/* Bu alana admin sayfaları linkleri ekleyebilirsin */}
        </div>
      </nav>
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>Hoşgeldiniz!</h1>
        <p style={styles.description}>Admin mi Kullanıcı girişi mi yapmak istiyorsunuz?</p>
      </div>
      
      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.button}>Kullanıcı Girişi</Link>
        <Link to="/admin-login" style={styles.button}>Admin Girişi</Link>
      </div>
      

      <div style={styles.footer}>
        <p style={styles.footerText}>Bir kitap gibi okuması kolay, kullanması eğlenceli!</p>
      </div>
    </div>
               </>

  );
  
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f9f9f9',
    fontFamily: '"Georgia", serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: '30px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#5A2D0C',
    letterSpacing: '2px',
    margin: '0',
  },
  description: {
    fontSize: '20px',
    color: '#555',
  },
  buttonContainer: {
    marginTop: '30px',
  },
  button: {
    display: 'inline-block',
    padding: '15px 30px',
    margin: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  },
 
  buttonHover: {
    backgroundColor: '#45a049',
  },
  registerContainer: {
    marginTop: '50px',
  },
  registerButton: {
    display: 'inline-block',
    padding: '12px 25px',
    backgroundColor: '#FF9800',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  },
  
  registerButtonHover: {
    backgroundColor: '#e68900',
  },
  footer: {
    marginTop: '60px',
    color: '#888',
    fontSize: '14px',
  },
  footerText: {
    fontStyle: 'italic',
  },
};

const hoverStyle = `
  .button:hover {
    background-color: #45a049;
  }
  .registerButton:hover {
    background-color: #e68900;
  }
`;

export default Welcome;

