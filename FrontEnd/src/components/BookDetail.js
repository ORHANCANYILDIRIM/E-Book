import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../api/bookService';
import { addToCart } from '../api/cartService';
import { postYorum, getYorumlarByKitap } from '../api/reviewService';
import { jwtDecode } from 'jwt-decode';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const BookDetail = () => {
  const { id } = useParams();
  const [kitap, setKitap] = useState(null);
  const [yorumlar, setYorumlar] = useState([]);
  const [yeniYorum, setYeniYorum] = useState('');
  const [puan, setPuan] = useState(5);
  const navigate = useNavigate();
  const [ortalamaPuan, setOrtalamaPuan] = useState(null);


  useEffect(() => {
    fetchKitap();
  }, []);

useEffect(() => {
  console.log("✅ [BookDetail] kitap objesi:", kitap);

  if (kitap && kitap.id) {
    console.log("🚀 Yorumları çekiyorum, kitapId:", kitap.id);

    getYorumlarByKitap(kitap.id)
  .then(res => {
    const yorumlar = res.data;
    setYorumlar(yorumlar);

    if (yorumlar.length > 0) {
      const toplam = yorumlar.reduce((acc, y) => acc + y.puan, 0);
      const ort = toplam / yorumlar.length;
      setOrtalamaPuan(ort.toFixed(1)); // virgülden sonra 1 basamak
    } else {
      setOrtalamaPuan(null);
    }
  })
  .catch(err => {
    console.error("❌ Yorumlar getirilemedi:", err);
  });

  }
}, [kitap]);



  const fetchKitap = async () => {
    try {
      const response = await getBookById(id);
      setKitap(response.data);
    } catch (error) {
      console.error("Kitap alınamadı:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Sepete eklemek için giriş yapmalısınız.");
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      const data = {
        userId: userId,
        kitapId: parseInt(id),
        adet: 1,
      };

      await addToCart(data);
      navigate("/cart");
    } catch (error) {
      console.error("Sepete eklenirken hata oluştu:", error);
      alert("Sepete eklenirken bir hata oluştu.");
    }
  };

  const handleYorumYap = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Yorum yapmak için giriş yapmalısınız.");

    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    try {
      const dto = {
        kitapId: kitap.id,
        userId: userId,
        puan: puan,
        yorum: yeniYorum
      };

      await postYorum(dto);
      alert("Yorum başarıyla gönderildi!");
      setYeniYorum('');
      setPuan(5);
      const res = await getYorumlarByKitap(kitap.id);
      setYorumlar(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Yorum gönderilemedi.");
    }
  };

  if (!kitap) {
    return <div style={styles.loading}>Yükleniyor...</div>;
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo">E-Kitap</div>
        <div className="nav-links"></div>
      </nav>
      <div style={styles.page}>
        <div style={styles.bookSection}>
          <div style={styles.leftSide}>
            <img src={kitap.gorselUrl} alt={kitap.baslik} style={styles.image} />

          </div>
          <div style={styles.rightSide}>
            <h1 style={styles.title}>{kitap.baslik}</h1>
            <p style={styles.author}><strong>Yazar:</strong> {kitap.yazar}</p>
            <p style={styles.summary}><strong>Özet:</strong> {kitap.aciklama || "Henüz özet eklenmemiş."}</p>
            <p style={styles.price}><strong>Fiyat:</strong> {kitap.fiyat} ₺</p>
            <p style={styles.rating}>
              <strong>Puan:</strong> <FaStar color="#ffc107" /> {ortalamaPuan ? `${ortalamaPuan} / 5` : 'Henüz puan yok'}
            </p>

            <button style={styles.cartBtn} onClick={handleAddToCart}>
              <FaShoppingCart style={{ marginRight: '8px' }} /> Sepete Ekle
            </button>
          </div>
        </div>

        <div style={styles.commentsSection}>
          <h2>Yorumlar</h2>
          {yorumlar.length === 0 ? (
            <p>Henüz yorum yapılmamış.</p>
          ) : (
            <ul>
              {yorumlar.map((y) => (
                <li key={y.id}>
                  <strong>{y.userAdSoyad}</strong> – ⭐ {y.puan}<br />
                  {y.yorum}
                  <hr />
                </li>
              ))}
            </ul>
          )}
          <h4>Yorum Yap</h4>
          <textarea
            placeholder="Yorumunuzu yazın..."
            value={yeniYorum}
            onChange={(e) => setYeniYorum(e.target.value)}
            rows={4}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <select value={puan} onChange={(e) => setPuan(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map(p => (
              <option key={p} value={p}>{p} ⭐</option>
            ))}
          </select>
          <br />
          <button onClick={handleYorumYap} style={styles.commentBtn}>Yorum Yap</button>
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    backgroundColor: '#f6f5f0',
    minHeight: '100vh',
    fontFamily: 'Georgia, serif',
    padding: '40px',
  },
  bookSection: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '60px',
  },
  leftSide: {
    marginRight: '60px',
    marginLeft: '40px',
  },
  image: {
    width: '240px',
    height: '340px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  rightSide: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#3e2723',
  },
  author: {
    fontSize: '18px',
    color: '#5d4037',
  },
  summary: {
    fontSize: '16px',
    color: '#4e342e',
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#6d4c41',
  },
  rating: {
    fontSize: '16px',
    color: '#ff9800',
  },
  cartBtn: {
    padding: '10px 16px',
    backgroundColor: '#6f4f1f',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    width: 'fit-content',
  },
  commentsSection: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  commentBtn: {
    marginTop: '15px',
    padding: '10px 16px',
    backgroundColor: '#8d6e63',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  loading: {
    textAlign: 'center',
    paddingTop: '80px',
    fontSize: '20px',
  },
};

export default BookDetail;
