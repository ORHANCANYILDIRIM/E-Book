import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Link } from 'react-router-dom';


function UpdateBook() {
  const [baslik, setBaslik] = useState('');
  const [book, setBook] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [kitapId, setKitapId] = useState('');


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:9090/kategoriler");
      setCategories(res.data);
    } catch (error) {
      console.error("Kategoriler alınamadı:", error);
    }
  };

const fetchBookById = async () => {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const ekleyenId = decoded.userId || decoded.sub;

    const res = await axios.get(`http://localhost:9090/kitaplar/${kitapId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data;

    setBook({
      baslik: data.baslik,
      yazar: data.yazar,
      fiyat: data.fiyat,
      aciklama: data.aciklama,
      gorselUrl: data.gorselUrl || '',
      kategoriId: data.kategori?.id ?? '',
      ekleyenId,
      id: data.id
    });

    setMessage('');
  } catch (error) {
    console.error("📛 HATA:", error);
    setMessage("❌ Kitap bulunamadı.");
  }
};



  const fetchAllBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:9090/kitaplar/onaysiz", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllBooks(res.data);
      setMessage('');
    } catch (err) {
      console.error("Onaysız kitaplar getirilemedi:", err);
      setMessage("❌ Onaysız kitaplar getirilemedi.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: name === "kategoriId" ? Number(value) : value });
  };

  const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:9090/kitaplar/${book.id}`, {
      baslik: book.baslik,
      yazar: book.yazar,
      fiyat: parseFloat(book.fiyat),
      aciklama: book.aciklama,
      gorselUrl: book.gorselUrl || '',
      kategoriId: book.kategoriId,
      ekleyenId: book.ekleyenId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMessage("✅ Kitap güncellendi.");
  } catch (err) {
    console.error("❌ Güncelleme hatası:", err.response?.data || err.message);
    setMessage("❌ Güncelleme başarısız: " + (err.response?.data?.message || err.message));
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
      <h2>Kitap Güncelleme Sayfası</h2>

      <input
        type="number"
        placeholder="Kitap ID"
        value={kitapId}
        onChange={(e) => setKitapId(e.target.value)}
      />
      <button onClick={fetchBookById}>Kitabı Getir</button>
      <button onClick={fetchAllBooks} style={{ marginLeft: '10px' }}>Kitapları Listele</button>

      {book && (
        <form onSubmit={handleUpdate} style={{ marginTop: '20px' }}>
          <input type="text" name="baslik" value={book.baslik} onChange={handleChange} required />
          <input type="text" name="yazar" value={book.yazar} onChange={handleChange} required />
          <input type="number" name="fiyat" value={book.fiyat} onChange={handleChange} required />
          <textarea name="aciklama" value={book.aciklama} onChange={handleChange}></textarea>

          {/* ✅ Kategori ismiyle seçim yapılır */}
          <select name="kategoriId" value={book.kategoriId} onChange={handleChange} required>
            <option value="">Kategori Seçin</option>
            {categories.map(kat => (
              <option key={kat.id} value={kat.id}>{kat.tur}</option>
            ))}
          </select>

          <button type="submit">💾 Güncelle</button>
        </form>
      )}

      {allBooks.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Kitaplar</h3>
          <ul>
            {allBooks.map(k => (
             <li key={k.id}>
                <strong>ID:</strong> {k.id} – <strong>{k.baslik}</strong> – {k.yazar} – {k.fiyat} ₺
              </li>

            ))}
          </ul>
        </div>
      )}

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
               </>

  );
}

export default UpdateBook;
