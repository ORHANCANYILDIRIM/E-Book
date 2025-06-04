// src/components/EditBook.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../api/bookService';
import { getAllCategories } from '../api/categoryService';
import { jwtDecode } from 'jwt-decode';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [kitap, setKitap] = useState({
    baslik: '',
    yazar: '',
    fiyat: '',
    aciklama: '',
    gorselUrl: '',
    kategoriId: '',
    ekleyenId: ''
  });

  const [kategoriler, setKategoriler] = useState([]);

  // Kitap ve kullanıcı bilgilerini çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const ekleyenId = decoded.userId;

        const kitapRes = await getBookById(id);
        const kitapDto = kitapRes.data;

        const kategoriRes = await getAllCategories();
        setKategoriler(kategoriRes.data);

        setKitap({
          baslik: kitapDto.baslik,
          yazar: kitapDto.yazar,
          fiyat: kitapDto.fiyat,
          aciklama: kitapDto.aciklama,
          gorselUrl: kitapDto.gorselUrl,
          kategoriId: '', // kullanıcı yeni kategori seçebilir
          ekleyenId: ekleyenId
        });
      } catch (err) {
        alert("Kitap bilgileri getirilemedi.");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setKitap({ ...kitap, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(id, kitap);
      alert("Kitap başarıyla güncellendi!");
      navigate("/my-books");
    } catch (err) {
      alert("Güncelleme başarısız oldu.");
    }
  };

  return (
    <div className="container">
      <h2>📘 Kitap Güncelle</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="baslik"
          placeholder="Başlık"
          value={kitap.baslik}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="yazar"
          placeholder="Yazar"
          value={kitap.yazar}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="fiyat"
          placeholder="Fiyat"
          value={kitap.fiyat}
          onChange={handleChange}
          required
        />
        <textarea
          name="aciklama"
          placeholder="Açıklama"
          value={kitap.aciklama}
          onChange={handleChange}
        />
        <input
          type="text"
          name="gorselUrl"
          placeholder="Görsel URL"
          value={kitap.gorselUrl}
          onChange={handleChange}
        />

        {/* Kategori Select */}
        <select
          name="kategoriId"
          value={kitap.kategoriId}
          onChange={handleChange}
          required
        >
          <option value="">Kategori Seçiniz</option>
          {kategoriler.map((kategori) => (
            <option key={kategori.id} value={kategori.id}>
              {kategori.tur}
            </option>
          ))}
        </select>

        <button type="submit" className="btn-view">Güncelle</button>
      </form>
    </div>
  );
};

export default EditBook;
