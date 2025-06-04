import React, { useEffect, useState } from 'react';
import { getAllFaturalar } from '../api/orderService';
import '../App.css'; // varsayılan stiller
import { Link } from 'react-router-dom';


const AdminOrders = () => {
  const [faturalar, setFaturalar] = useState([]);

  useEffect(() => {
    fetchFaturalar();
  }, []);

  const fetchFaturalar = async () => {
    try {
      const response = await getAllFaturalar();
      setFaturalar(response.data);
    } catch (error) {
      console.error("Faturalar alınamadı:", error);
    }
  };

  return (

     <>
      {/* Navbar */}
     <nav className="navbar">
        <div className="logo">E-Kitap</div>
        <div className="nav-links">
          <Link to="/admin">Anasayfa</Link>
        </div>
</nav>
    <div className="container">
      <h2>📦 Tüm Siparişler ve Faturalar</h2>
      {faturalar.length === 0 ? (
        <p>Hiç sipariş bulunamadı.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Sipariş ID</th>
              <th>Kullanıcı Adı</th>
              <th>Kitap</th>
              <th>Adet</th>
              <th>Toplam</th>
              <th>Tarih</th>
            </tr>
          </thead>
          <tbody>
            {faturalar.map((fatura) => (
              <tr key={fatura.id}>
                <td>{fatura.siparisId}</td>
                <td>{fatura.userAdSoyad}</td>
                <td>{fatura.kitapBaslik}</td>
                <td>{fatura.adet}</td>
                <td>{fatura.toplamTutar} ₺</td>
                <td>{new Date(fatura.tarih).toLocaleString('tr-TR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
            </>

  );
};

export default AdminOrders;
