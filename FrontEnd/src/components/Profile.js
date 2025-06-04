import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
  const [email, setEmail] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const decoded = jwtDecode(token);
      const userEmail = decoded.sub || decoded.email;

      if (!userEmail) throw new Error("Token'da email bulunamadı.");

      setEmail(userEmail);
    } catch (error) {
      console.error("Token çözümlenirken hata:", error);
      localStorage.removeItem("token");
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">E-Kitap</div>
        <div className="nav-links">

          
        </div>

        <div
          className="account-menu"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="account-btn">
            {email ? " Hesabım" : "🔐 Giriş Yap"}
          </button>

          {showDropdown && (
            <div className="dropdown">
              {email ? (
                <>
                  <Link to="/" onClick={() => localStorage.removeItem("token")}>
                    Çıkış Yap
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">Giriş Yap</Link>
                  <Link to="/register">Üye Ol</Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Profil içeriği */}
      <div className="container" style={{ marginTop: '40px', textAlign: 'center' }}>
        <div style={{
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
          maxWidth: '500px',
          margin: '0 auto',
          backgroundColor: '#fff'
        }}>
          <div style={{
            fontSize: '80px',
            backgroundColor: '#eee',
            borderRadius: '50%',
            width: '100px',
            height: '100px',
            margin: '0 auto 10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            👤
          </div>

          <h2>Profil Sayfası</h2>
          <p><strong>Email:</strong> {email || "Bilinmiyor"}</p>

          <hr style={{ margin: '20px 0' }} />

          <Link to="/my-orders" className="account-btn" style={{ display: 'block', margin: '10px auto', width: '60%' }}> Siparişlerim</Link>
          
        </div>
      </div>
    </div>
  );
}

export default Profile;
