import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getAllCategories } from '../api/categoryService';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

function AdminAdd() {
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

  useEffect(() => {
    // Token'dan kullanıcı ID çek
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setBook(prev => ({ ...prev, ekleyenId: decoded.userId }));
    }

    // Kategorileri çek
    getAllCategories().then(res => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:9090/kitaplar/admin-ekle", book, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage("📘 Kitap başarıyla eklendi ve otomatik onaylandı!");
    } catch (err) {
      setMessage("❌ Hata oluştu: " + err.message);
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
      <h2>Admin Kitap Ekle</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="baslik" value={book.baslik} onChange={handleChange} placeholder="Başlık" required />
        <input type="text" name="yazar" value={book.yazar} onChange={handleChange} placeholder="Yazar" required />
        <input type="number" name="fiyat" value={book.fiyat} onChange={handleChange} placeholder="Fiyat" required />
        <textarea name="aciklama" value={book.aciklama} onChange={handleChange} placeholder="Açıklama" />
        <select name="kategoriId" value={book.kategoriId} onChange={handleChange} required>
          <option value="">Kategori Seçin</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.tur}</option>
          ))}
        </select>
        <input type="text" name="gorselUrl" value={book.gorselUrl} onChange={handleChange} placeholder="Görsel URL" />
        <button type="submit">Kaydet</button>
      </form>
      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
    </div>
           </>

  );
}

export default AdminAdd;
