import React, { useEffect, useState } from 'react';
import {
  getPendingBooks,
  deleteBook,
  approveBook
} from '../api/bookService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AdminBookPanel() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const res = await getPendingBooks();
      setBooks(res.data);
    } catch (err) {
      console.error("Kitaplar alınamadı:", err);
    }
  };

const handleApprove = async (book) => {
  try {
    await approveBook(book.id);// 🔁 Artık onayli:true gidiyor
    loadBooks(); // Listeyi yenile
  } catch (err) {
    console.error("Onaylama hatası:", err);
    if (err.response) {
      console.error("Sunucu yanıtı:", err.response.data);
      alert("Hata: " + (err.response.data || "Bilinmeyen sunucu hatası"));
    } else if (err.request) {
      console.error("İstek hatası:", err.request);
    } else {
      console.error("İstek hazırlanırken hata:", err.message);
    }
  }
};



  const handleDelete = async (id) => {
    if (window.confirm("Kitabı silmek istediğinize emin misiniz?")) {
      await deleteBook(id);
      loadBooks();
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">E-Kitap</div>
        <div className="nav-links">
          <Link to="/admin">Anasayfa</Link>
          <Link to="/users">Kullanıcılar</Link>
          <Link to="/orders">Siparişler</Link>
        </div>
      </nav>
    <div className="container">
      <h2>📚 Onay Bekleyen Kitaplar</h2>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/admin/kitap-ekle')} style={{ marginRight: '10px' }}>➕ Kitap Ekle</button>
        <button onClick={() => navigate('/update-book')}>✏ Kitap Güncelle</button>
      </div>

      {books.length === 0 ? (
        <p>Onay bekleyen kitap yok.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Yazar</th>
              <th>Fiyat</th>
              <th>Kategori</th>
              <th>Ekleyen</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.baslik}</td>
                <td>{book.yazar}</td>
                <td>{book.fiyat} ₺</td>
                <td>{book.kategoriAdi}</td>
                <td>{book.ekleyenAd}</td>
                <td>
                  <button onClick={() => handleApprove(book)}>✅ Onayla</button>
                  <button onClick={() => handleDelete(book.id)}>🗑 Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
           </>

  );
}

export default AdminBookPanel;