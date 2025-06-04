import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api/userService'; // API fonksiyonunu unutma

function Register() {
  const [formData, setFormData] = useState({
    adSoyad: '',
    email: '',
    sifre: '',
    adres: '',
    rol: 'user', // Sabit olarak "user"
  });

  const [hata, setHata] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.adSoyad || !formData.email || !formData.sifre) {
      setHata("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    try {
      await createUser(formData); // API çağrısı
      navigate('/login'); // Başarılı ise login sayfasına yönlendir
    } catch (error) {
      console.error("Kayıt hatası:", error);
      let mesaj = "Kayıt başarısız.";

      if (error.response?.data?.message) {
        mesaj = error.response.data.message;
      }

      setHata(mesaj);
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
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <h2 style={styles.title}>Üye Ol</h2>
        <p style={styles.description}>Ailemize siz de katılın.</p>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="adSoyad"
          value={formData.adSoyad}
          onChange={handleChange}
          placeholder="Ad Soyad"
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          style={styles.input}
        />
        <input
          type="password"
          name="sifre"
          value={formData.sifre}
          onChange={handleChange}
          placeholder="Şifre"
          style={styles.input}
        />
        <input
          type="text"
          name="adres"
          value={formData.adres}
          onChange={handleChange}
          placeholder="Adres"
          style={styles.input}
        />

        {hata && <p style={{ color: 'red' }}>{hata}</p>}

        <button type="submit" style={styles.button}>Kayıt Ol</button>
      </form>
      <div style={styles.footer}>
        <p style={styles.footerText}>Bir kitap gibi okuması kolay, kullanması eğlenceli!</p>
      </div>
    </div>
            </>

  );
}

export default Register;



const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f9f9f9',
    fontFamily: '"Georgia", serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: '30px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#5A2D0C',
    letterSpacing: '2px',
    margin: '0',
  },
  description: {
    fontSize: '20px',
    color: '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    margin: '0 auto',
  },
  input: {
    padding: '12px',
    margin: '10px',
    width: '100%',
    maxWidth: '300px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '12px 24px',
    marginTop: '20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '300px',
  },
  footer: {
    marginTop: '60px',
    color: '#888',
    fontSize: '14px',
  },
  footerText: {
    fontStyle: 'italic',
},
};


