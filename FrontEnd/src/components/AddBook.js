import React, { useState, useEffect } from 'react';
import { createBook } from '../api/bookService';
import { getAllCategories } from '../api/categoryService'; // ✅ kategori servisi
import { jwtDecode } from 'jwt-decode';

function AddBook() {
  const [book, setBook] = useState({
    baslik: '',
    yazar: '',
    fiyat: '',
    aciklama: '',
    kategoriId: '',
    ekleyenId: '',
    gorselUrl: ''
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');


  // 🔐 Giriş yapan kullanıcıyı al
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId || decoded.sub;
        setBook(prev => ({ ...prev, ekleyenId: userId }));
      } catch (err) {
        console.error("Token çözümleme hatası:", err);
      }
    }

    // 🔄 Kategorileri çek
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Kategoriler alınamadı:", error);
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
            await createBook({
        ...book,
      // 1. Kitap kaydı (JSON gönderiyoruz)

        fiyat: parseFloat(book.fiyat),
      });

     setMessage("📚 Kitap başarıyla eklendi! Onay bekliyor.");
      setBook(prev => ({
        baslik: '',
        yazar: '',
        fiyat: '',
        aciklama: '',
        kategoriId: '',
        ekleyenId: prev.ekleyenId,
        gorselUrl: ''
      }));
    } catch (error) {
      console.error(error);
      setMessage("❌ Hata oluştu: " + (error.response?.data || error.message));
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
      <h2>Kitap Ekleme Sayfası</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="baslik" placeholder="Başlık" value={book.baslik} onChange={handleChange} required />
        <input type="text" name="yazar" placeholder="Yazar" value={book.yazar} onChange={handleChange} required />
        <input type="number" step="0.01" name="fiyat" placeholder="Fiyat" value={book.fiyat} onChange={handleChange} required />
        <textarea name="aciklama" placeholder="Açıklama" value={book.aciklama} onChange={handleChange} />

        {/* ✅ Kategori seçimi */}
        <select name="kategoriId" value={book.kategoriId} onChange={handleChange} required>
          <option value="">Kategori Seçin</option>
          {categories.map(kat => (
            <option key={kat.id} value={kat.id}>{kat.tur}</option>
          ))}
        </select>

        <input type="text" name="gorselUrl" placeholder="Görsel URL" value={book.gorselUrl} onChange={handleChange} />


        
        <button type="submit">📥 Kaydet</button>
      </form>

      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
    </div>
               </>

  );
  
}


export default AddBook;