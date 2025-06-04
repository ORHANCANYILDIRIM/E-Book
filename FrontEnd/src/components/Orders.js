import React, { useEffect, useState } from 'react';
import { getAllFaturalar, getFaturaBySiparisId } from '../api/orderService';
import { Link } from 'react-router-dom';
import '../App.css';

function Order() {
  const [siparisler, setSiparisler] = useState([]);
  const [secilenFatura, setSecilenFatura] = useState(null);

  useEffect(() => {
    const fetchSiparisler = async () => {
      try {
        const response = await getAllFaturalar(); // Admin fatura + ödeme yöntemi bilgisi içeriyor
        setSiparisler(response.data);
      } catch (err) {
        console.error("Siparişler alınamadı:", err);
      }
    };

    fetchSiparisler();
  }, []);

  const handleFaturaGoruntule = async (siparisId) => {
    try {
      const response = await getFaturaBySiparisId(siparisId);
      setSecilenFatura(response.data);
    } catch (err) {
      console.error("Fatura getirilemedi:", err);
    }
  };

  const kapatPopup = () => {
    setSecilenFatura(null);
  };

  return (
    <>
      {/* Admin NAVBAR */}
      <nav className="navbar">
        <div className="logo">E-Kitap Admin</div>
        <div className="nav-links">
          <Link to="/admin">Anasayfa</Link>
          <Link to="/users">Kullanıcılar</Link>
          <Link to="/admin-book-panel">Kitap İşlemleri</Link>
        </div>
      </nav>

      <div className="container">
        <h2>📦 Tüm Siparişler</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Sipariş ID</th>
              <th>Kullanıcı</th>
              <th>Ödeme Yöntemi</th>
              <th>Durum</th>
              <th>Tarih</th>
              <th>Fatura</th>
            </tr>
          </thead>
          <tbody>
            {siparisler.map((siparis) => (
              <tr key={siparis.faturaId}>
                <td>{siparis.siparisId}</td>
                <td>{siparis.userAdSoyad}</td>
                <td>{siparis.odemeYontemi || '—'}</td>
                <td>{siparis.durum || 'hazırlanıyor'}</td>
                <td>{new Date(siparis.tarih).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleFaturaGoruntule(siparis.siparisId)}>
                    Fatura Görüntüle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Fatura Popup */}
        {secilenFatura && (
          <div className="popup-overlay" onClick={kapatPopup}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
              <h3>🧾 Fatura Detayı</h3>
              <p><strong>Fatura ID:</strong> {secilenFatura.faturaId}</p>
              <p><strong>Kullanıcı:</strong> {secilenFatura.userAdSoyad}</p>
              <p><strong>Sipariş ID:</strong> {secilenFatura.siparisId}</p>
              <p><strong>Tutar:</strong> {secilenFatura.tutar} ₺</p>
              <p><strong>Tarih:</strong> {new Date(secilenFatura.tarih).toLocaleString()}</p>
              {secilenFatura.odemeYontemi && (
                <p><strong>Ödeme Yöntemi:</strong> {secilenFatura.odemeYontemi}</p>
              )}
              <button onClick={kapatPopup}>Kapat</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Order;