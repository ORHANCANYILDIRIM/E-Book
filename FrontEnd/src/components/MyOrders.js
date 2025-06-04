import React, { useEffect, useState } from 'react';
import { getSiparislerByUserId } from '../api/orderService';
import { jwtDecode } from 'jwt-decode';

const MyOrders = () => {
  const [siparisler, setSiparisler] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId || decoded.sub;

      fetchSiparisler(userId);
    } catch (err) {
      console.error("JWT çözülemedi:", err);
    }
  }, []);

  const fetchSiparisler = async (userId) => {
    try {
      const res = await getSiparislerByUserId(userId);
      setSiparisler(res.data);
    } catch (err) {
      console.error("Siparişler getirilemedi:", err);
    }
  };

  return (
    <div className="container">
      <h2>📦 Siparişlerim</h2>
      {siparisler.length === 0 ? (
        <p>Henüz siparişiniz yok.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sipariş ID</th>
              <th>Tarih</th>
              <th>Durum</th>
              <th>Ödeme Yöntemi</th>
            </tr>
          </thead>
          <tbody>
            {siparisler.map((siparis) => (
              <tr key={siparis.siparisId}>
                <td>{siparis.siparisId}</td>
                <td>{new Date(siparis.tarih).toLocaleString()}</td>
                <td>{siparis.durum}</td>
                <td>{siparis.odemeYontemi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
