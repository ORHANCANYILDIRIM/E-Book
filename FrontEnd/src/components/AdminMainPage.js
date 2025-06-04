import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getApprovedBooks } from '../api/bookService';
import '../BookPage.css';
import { Link, useNavigate } from 'react-router-dom';

function AdminMainPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [approvedBooks, setApprovedBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let userEmail = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userEmail = decoded.sub || decoded.email;
    } catch (e) {
      console.error("Token çözümlenemedi:", e);
    }
  }

  useEffect(() => {
    const fetchApprovedBooks = async () => {
      try {
        const response = await getApprovedBooks();
        setApprovedBooks(response.data);
        setFilteredBooks(response.data); // Hem liste hem arama için
      } catch (error) {
        console.error("Onaylı kitaplar alınamadı:", error);
      }
    };

    fetchApprovedBooks();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = approvedBooks.filter(
      (book) =>
        book.baslik.toLowerCase().includes(term) ||
        book.yazar.toLowerCase().includes(term)
    );
    setFilteredBooks(filtered);
  }, [searchTerm, approvedBooks]);

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">E-Kitap</div>
        <div className="nav-links">
          <Link to="/admin-book-panel">Kitap İşlemleri</Link>
          <Link to="/users">Kullanıcılar</Link>
<Link to="/orders">Siparişler</Link>

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

        <div
          className="account-menu"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="account-btn">
            {userEmail ? "👤 Admin Paneli" : "🔐 Giriş Yap"}
          </button>
          {showDropdown && (
            <div className="dropdown">
              {userEmail ? (
                <a href="/" onClick={() => localStorage.removeItem("token")}>Çıkış Yap</a>
              ) : (
                <>
                  <a href="/login">Giriş Yap</a>
                  <a href="/register">Üye Ol</a>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Marquee */}
      <div className="marquee">
        <p>📢 Admin Paneline Hoş Geldiniz | Kitapları yönetin, kullanıcıları kontrol edin, siparişleri takip edin!</p>
      </div>

      {/* ✅ Onaylı Kitaplar Listesi */}
      <section className="section about">
        <h2> Kitaplar</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '20px',
          padding: '20px'
        }}>
          {approvedBooks.map((kitap) => (
            <div
              key={kitap.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                padding: '10px',
                textAlign: 'center'
              }}
            >
              <img
                src={kitap.gorselUrl}
                alt={kitap.baslik}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  marginBottom: '10px'
                }}
              />
              <h4>{kitap.baslik}</h4>
              <p>{kitap.yazar}</p>
              <p><strong>{kitap.fiyat} ₺</strong></p>
              <button
                onClick={() => navigate(`/admin/book/${kitap.id}`)}
                style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  backgroundColor: '#6f4f1f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Görüntüle
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminMainPage;
