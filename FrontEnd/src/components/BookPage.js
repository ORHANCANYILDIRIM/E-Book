import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApprovedBooks } from '../api/bookService';
import { jwtDecode } from 'jwt-decode';
import '../BookPage.css';

const BookPage = () => {
  const [kitaplar, setKitaplar] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const token = localStorage.getItem("token");
  let userEmail = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userEmail = decoded.sub || decoded.email;
    } catch (e) {
      console.error("Token çözülemiyor:", e);
    }
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getApprovedBooks();
        setKitaplar(response.data);
        setFilteredBooks(response.data); // Arama için başlangıçta tümü
      } catch (error) {
        console.error("Kitaplar alınamadı:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtreli = kitaplar.filter(
      (kitap) =>
        kitap.baslik.toLowerCase().includes(term) ||
        kitap.yazar.toLowerCase().includes(term)
    );
    setFilteredBooks(filtreli);
  }, [searchTerm, kitaplar]);

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">E-Kitap</div>

        <div className="nav-links">
          <Link to="/cart">Sepetim</Link>
          <Link to="/my-books">Kitaplarım</Link>

          {/* Arama Kutusu */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Kitap veya yazar ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <div className="search-dropdown">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((kitap) => (
                    <Link
                      to={`/book/${kitap.id}`}
                      key={kitap.id}
                      className="search-item"
                    >
                      <img
                        src={kitap.gorselUrl}
                        alt={kitap.baslik}
                        style={{
                          width: '30px',
                          height: '45px',
                          marginRight: '10px',
                          borderRadius: '4px'
                        }}
                      />
                      <span style={{ color: 'black', fontWeight: '500' }}>
                        {kitap.baslik}
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="search-item">Sonuç bulunamadı.</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Hesap Menüsü */}
        <div
          className="account-menu"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="account-btn">👤 Hesabım</button>
          {showDropdown && (
            <div className="dropdown">
              <Link to="/profile">Profilim</Link>
              <Link to="/" onClick={() => localStorage.removeItem("token")}>
                Çıkış Yap
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Reklam */}
      <div className="ad-banner">
        <img src="/images/reklam.png" alt="Reklam" className="banner-img" />
      </div>

      {/* Kitaplar */}
      <div className="popular-section">
        <h2>📚 Kitaplar</h2>
        <div className="popular-scroll">
          {filteredBooks.map((kitap) => (
            <div className="popular-card" key={kitap.id}>
              <img src={kitap.gorselUrl} alt={kitap.baslik} />
              <h4>{kitap.baslik}</h4>
              <p>{kitap.yazar}</p>
              <p><strong>{kitap.fiyat} ₺</strong></p>
              <Link to={`/book/${kitap.id}`}>
                <button className="btn-view">İncele</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
