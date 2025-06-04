import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookManage = () => {
  const navigate = useNavigate();
  const [kitaplar, setKitaplar] = useState([
    { id: 1, baslik: 'Sefiller', yazar: 'Victor Hugo' },
    { id: 2, baslik: 'Suç ve Ceza', yazar: 'Dostoyevski' },
  ]);

  const [yeniKitap, setYeniKitap] = useState({ baslik: '', yazar: '' });

  const handleChange = (e) => {
    setYeniKitap({ ...yeniKitap, [e.target.name]: e.target.value });
  };

  const handleEkle = () => {
    if (yeniKitap.baslik && yeniKitap.yazar) {
      setKitaplar([...kitaplar, { ...yeniKitap, id: Date.now() }]);
      setYeniKitap({ baslik: '', yazar: '' });
    }
  };

  const handleSil = (id) => {
    setKitaplar(kitaplar.filter((k) => k.id !== id));
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.header}> Kitap Yönetim Paneli</h2>

      <div style={styles.form}>
        <input
          type="text"
          name="baslik"
          placeholder="Kitap Başlığı"
          value={yeniKitap.baslik}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="yazar"
          placeholder="Yazar"
          value={yeniKitap.yazar}
          onChange={handleChange}
          style={styles.input}
        />
        <button onClick={handleEkle} style={styles.addButton}>
          Ekle
        </button>
       
      </div>

      <div style={styles.list}>
        {kitaplar.map((kitap) => (
          <div key={kitap.id} style={styles.card}>
            <h3>{kitap.baslik}</h3>
            <p><strong>Yazar:</strong> {kitap.yazar}</p>
            <div>
              <button style={styles.editButton}>Güncelle</button>
              <button onClick={() => handleSil(kitap.id)} style={styles.deleteButton}>Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1512820790803-83ca734da794)',
    backgroundSize: 'cover',
    minHeight: '100vh',
    padding: '50px',
    fontFamily: 'Georgia, serif',
    backgroundAttachment: 'fixed',
  },
  header: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: '30px',
    textShadow: '1px 1px #333',
  },
  form: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    minWidth: '200px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  authButton: {
    padding: '10px 20px',
    backgroundColor: '#795548',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffffdd',
    borderRadius: '10px',
    padding: '20px',
    width: '280px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    textAlign: 'left',
  },
  editButton: {
    marginRight: '10px',
    padding: '8px 12px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '8px 12px',
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default BookManage;

