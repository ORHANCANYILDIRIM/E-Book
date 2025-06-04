import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Account() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <div style={styles.logo}>E-Kitap</div>
        <div style={styles.navLinks}>
          <a href="#" style={styles.navLink}>Favorilerim</a>
          <Link to="/cart" style={styles.navLink}>Sepetim</Link>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Kitap ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <button style={styles.searchBtn}>Ara</button>
          </div>
        </div>
      </nav>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#f6f5f0',
    minHeight: '100vh',
    fontFamily: 'Georgia, serif',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#8d6e63',
    color: '#fff',
    padding: '10px 20px',
    width: '100%',
    boxSizing: 'border-box',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    marginRight: '15px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '14px',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'column',
  },
  searchInput: {
    padding: '5px',
    borderRadius: '4px',
    border: 'none',
    marginRight: '5px',
  },
  searchBtn: {
    padding: '5px 10px',
    backgroundColor: '#5d4037',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '5px',
  },
};

export default Account;
