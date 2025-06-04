import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/userService';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [hata, setHata] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, sifre });
      const token = response.data.token;

      localStorage.setItem('token', token);

      const decoded = jwtDecode(token);
      const rol = decoded.rol?.toLowerCase() || 'user';

      if (rol === 'admin') {
        navigate('/admin-panel');
      } else if (rol === 'user') {
        navigate('/kitaplar');
      } else {
        setHata('Yetkisiz kullanıcı rolü.');
      }
    } catch (error) {
      console.error('Login hatası:', error.response?.data || error.message);
      setHata('Giriş bilgileri hatalı veya sistem hatası oluştu.');
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">E-Kitap</div>
        <div className="nav-links">
        </div>


      </nav>

      {/* Login Card */}
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Giriş Yap</h2>
          <p style={styles.description}>Hesabınıza giriş yapın</p>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Şifre"
              required
              style={styles.input}
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
            />
            {hata && <p style={{ color: 'red', marginTop: '10px' }}>{hata}</p>}
            <button type="submit" style={styles.button}>Giriş Yap</button>
          </form>

          <p style={styles.registerText}>
            Üye değil misiniz?{' '}
            <Link to="/register" style={styles.registerLink}>Kayıt Ol</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 80px)', // Navbar'dan sonra kalan yükseklik
    backgroundColor: '#f5f5f5',
    fontFamily: 'Georgia, serif',
  },
  card: {
    backgroundColor: '#ffffffdd',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '350px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#5A2D0C',
    marginBottom: '10px',
  },
  description: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '15px',
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
  registerText: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#333',
  },
  registerLink: {
    color: '#6f4f1f',
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
};
