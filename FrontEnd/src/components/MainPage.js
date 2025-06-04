import React, { useState, useEffect } from 'react';
import '../App.css';
import '../MainPage.css';
import { getApprovedBooks } from '../api/bookService';
import { Link } from 'react-router-dom';

function MainPage() {
  const [kitaplar, setKitaplar] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getApprovedBooks('');
        setKitaplar(response.data);
        setFilteredBooks(response.data); // Arama için başlangıçta tümü
      } catch (error) {
        console.error("Kitaplar alınamadı:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const term = searchText.toLowerCase();
    const filtreli = kitaplar.filter(
      (kitap) =>
        kitap.baslik.toLowerCase().includes(term) ||
        kitap.yazar.toLowerCase().includes(term)
    );
    setFilteredBooks(filtreli);
  }, [searchText, kitaplar]);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">E-Kitap</div>
        <div className="nav-links">
          {/* Arama Kutusu */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Kitap veya yazar ara..."
              className="search-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && filteredBooks.length > 0 && (
              <div className="search-dropdown">
                {filteredBooks.map((kitap) => (
                  <Link
                    to={`/book/${kitap.id}`}
                    key={kitap.id}
                    className="search-item"
                    onClick={() => setSearchText('')}
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
                    <span style={{ color: 'black', fontWeight: 'initial' }}>{kitap.baslik}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className="account-menu"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="account-btn">Giriş Yap</button>
          {showDropdown && (
            <div className="dropdown">
              <a href="/welcome">Giriş Yap</a>
              <a href="/register">Üye Ol</a>
            </div>
          )}
        </div>
      </nav>

      <div className="marquee">
        <p>
          📢 Siz de bizimle çalışmak ister misiniz?{' '}
          <a href="/login" style={{ color: 'red', textDecoration: 'underline' }}>buraya tıklayın</a>!
        </p>
      </div>

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

      <section className="section about">
        <h2>Site Hakkında</h2>
        <p>
          E-Kitap, binlerce kitap arasından dilediğinizi bulmanızı sağlayan dijital bir platformdur.
          Kitap okumayı kolay, erişilebilir ve ekonomik hale getiriyoruz.
        </p>
      </section>
    </div>
  );
}

export default MainPage;
