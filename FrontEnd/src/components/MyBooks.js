import React, { useEffect, useState } from 'react';
import { getOnayliKitaplar, deleteBook } from '../api/bookService';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function MyBooks() {
  const [myBooks, setMyBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.userId || decoded.sub;
      fetchBooks(userId);
    }
  }, []);

  const fetchBooks = async (userId) => {
    try {
      const response = await getOnayliKitaplar(userId);
      const onayliBooks = response.data.filter((book) => book.onayli === true);
      setMyBooks(onayliBooks);
    } catch (error) {
      console.error("Kitaplar alınamadı:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu kitabı silmek istediğinize emin misiniz?")) {
      try {
        await deleteBook(id);
        setMyBooks((prev) => prev.filter((book) => book.id !== id));
      } catch (err) {
        alert("Kitap silinemedi.");
      }
    }
  };

  return (
               <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">E-Kitap</div>
        <div className="nav-links">
          {/* Bu alana admin sayfaları linkleri ekleyebilirsin */}
        </div>
      </nav>
    <div className="container">
      <h2>📚 Onaylanmış Kitaplarım</h2>

      {myBooks.length === 0 ? (
        <p>Henüz onaylı kitabınız bulunmamaktadır.</p>
      ) : (
        <ul className="book-list">
          {myBooks.map((kitap) => (
            <li key={kitap.id} style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img
                  src={kitap.gorselUrl || '/kitap1.jpg'}
                  alt={kitap.baslik}
                  style={{ width: '60px', height: '90px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <div style={{ flex: 1 }}>
                  <strong>{kitap.baslik}</strong> <br />
                  <span>{kitap.kategoriAdi}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate(`/edit-book/${kitap.id}`)} className="btn-view">Düzenle</button>
                  <button onClick={() => handleDelete(kitap.id)} className="btn-delete">Sil</button>
                </div>
                
                
              </div>
              
              
            </li>
            
          ))}
          
        </ul>
        
      )} 

      <button
        onClick={() => navigate('/add-book')}
        className="btn-view"
        style={{ marginTop: '20px' }}
      >
        ➕ Yeni Kitap Ekle
      </button>
    </div>
                       </>

  );
}

export default MyBooks;
