import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../api/bookService';
import { getYorumlarByKitap } from '../api/reviewService';
import { FaStar } from 'react-icons/fa';

const AdminBookDetail = () => {
  const { id } = useParams();
  const [kitap, setKitap] = useState(null);
  const [yorumlar, setYorumlar] = useState([]);
  const [ortalamaPuan, setOrtalamaPuan] = useState(null);

  useEffect(() => {
    fetchKitap();
  }, []);

  useEffect(() => {
    if (kitap && kitap.id) {
      getYorumlarByKitap(kitap.id)
        .then(res => {
          const yorumlar = res.data;
          setYorumlar(yorumlar);

          if (yorumlar.length > 0) {
            const toplam = yorumlar.reduce((acc, y) => acc + y.puan, 0);
            const ort = toplam / yorumlar.length;
            setOrtalamaPuan(ort.toFixed(1));
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

  if (!kitap) {
    return <div style={styles.loading}>Yükleniyor...</div>;
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo">E-Kitap Admin</div>
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
  commentsSection: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  loading: {
    textAlign: 'center',
    paddingTop: '80px',
    fontSize: '20px',
  },
};

export default AdminBookDetail;
