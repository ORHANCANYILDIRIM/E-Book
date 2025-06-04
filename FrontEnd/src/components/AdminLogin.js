import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/userService'; // backend giriş fonksiyonun
import { jwtDecode } from 'jwt-decode';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', sifre: '' });
  const [hata, setHata] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      const token = response.data.token;

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const rol = decoded.rol?.toUpperCase();

      if (rol === 'ADMIN') {
        navigate('/admin'); // ✔️ admin başarılı giriş
      } else {
        setHata("Yetkisiz kullanıcı. Bu sayfaya sadece admin girebilir.");
        localStorage.removeItem("token"); // Güvenlik için tokenı sil
      }
    } catch (err) {
      console.error("Giriş hatası:", err);
      setHata("Giriş başarısız. Email veya şifre hatalı.");
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
      <div style={styles.card}>
        <h2>Admin Girişi</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="sifre"
            placeholder="Şifre"
            value={formData.sifre}
            onChange={handleChange}
            required
            style={styles.input}
          />
          {hata && <p style={{ color: 'red' }}>{hata}</p>}
          <button type="submit" style={styles.button}>Giriş Yap</button>
        </form>
      </div>
    </div>
       </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    fontFamily: '"Georgia", serif',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  card: {
    backgroundColor: '#ffffffdd',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '400px',
  },
  input: {
    padding: '10px',
    margin: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#6f4f1f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '12px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default AdminLogin;


