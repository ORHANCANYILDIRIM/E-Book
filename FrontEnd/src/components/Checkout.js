import React, { useEffect, useState, useRef } from 'react';
import { createSiparis, getFaturaBySiparisId } from '../api/orderService';
import { jwtDecode } from 'jwt-decode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Checkout = () => {
  const [odemeYontemi, setOdemeYontemi] = useState('Kredi Kartı');
  const [userId, setUserId] = useState(null);
  const [mesaj, setMesaj] = useState('');
  const [fatura, setFatura] = useState(null);
  const [siparisId, setSiparisId] = useState(null);
  const faturaRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const email = decoded.sub;

      fetch(`http://localhost:9090/users/email/${email}`)
        .then(res => res.json())
        .then(data => {
          setUserId(data.id);
        })
        .catch(err => console.error("Kullanıcı ID alınamadı:", err));
    }
  }, []);

  const handleSiparis = async () => {
    try {
      const response = await createSiparis({ odemeYontemi });
      const siparisId = response.data.siparisId;
      setSiparisId(siparisId);

      const faturaResponse = await getFaturaBySiparisId(siparisId);
      setFatura(faturaResponse.data);

      setMesaj("🎉 Siparişiniz başarıyla oluşturuldu!");
    } catch (err) {
      console.error("Sipariş oluşturulamadı:", err);
      setMesaj("❌ Sipariş sırasında hata oluştu.");
    }
  };

  const handleDownloadPDF = () => {
    const input = faturaRef.current;
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('fatura.pdf');
    });
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
    <div className="container" style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h2>🧾 Sipariş Özeti</h2>

      <div style={{ margin: '20px 0' }}>
        <label>Ödeme Yöntemi:</label>
        <select value={odemeYontemi} onChange={(e) => setOdemeYontemi(e.target.value)} style={{ marginLeft: '10px' }}>
          <option>Kredi Kartı</option>
          <option>Kapıda Ödeme</option>
          <option>Havale / EFT</option>
        </select>
      </div>

      <button onClick={handleSiparis} style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px' }}>
        ✅ Siparişi Tamamla
      </button>

      {mesaj && <p style={{ marginTop: '20px', color: 'green' }}>{mesaj}</p>}

      {fatura && (
        <>
          <button onClick={handleDownloadPDF} style={{ marginTop: '20px', padding: '8px 16px', backgroundColor: '#2196f3', color: '#fff', border: 'none', borderRadius: '5px' }}>
            📄 Fatura Detay (PDF)
          </button>

          <div ref={faturaRef} style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f9f9f9', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>🧾 Fatura Bilgisi</h3>
            <p><strong>Ad Soyad:</strong> {fatura.userAdSoyad}</p>
            <p><strong>Toplam Tutar:</strong> {fatura.tutar} ₺</p>
            <p><strong>Tarih:</strong> {new Date(fatura.tarih).toLocaleString()}</p>
            <p><strong>Sipariş ID:</strong> {fatura.siparisId}</p>
          </div>
        </>
      )}
    </div>
                           </>

  );
};

export default Checkout;
