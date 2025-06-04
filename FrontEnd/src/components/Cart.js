import React, { useEffect, useState } from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { getCartByUser, removeFromCart, updateCartItem } from '../api/cartService';
import { getBookById } from '../api/bookService';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [booksInfo, setBooksInfo] = useState({});

  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token)?.userId : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const fetchCart = async () => {
    try {
      const response = await getCartByUser(userId);
      const sepetItems = response.data;
      setCartItems(sepetItems);

      const kitapPromises = sepetItems.map((item) =>
        getBookById(item.kitapId)
          .then(res => ({ kitapId: item.kitapId, data: res.data }))
          .catch(() => null)
      );

      const kitapDetaylari = await Promise.all(kitapPromises);
      const kitapMap = {};
      kitapDetaylari.forEach(k => {
        if (k && k.data) {
          kitapMap[k.kitapId] = k.data;
        }
      });

      setBooksInfo(kitapMap);
    } catch (error) {
      console.error("Sepet alınamadı:", error);
    }
  };

  const handleIncrease = async (sepetId, currentAdet) => {
    await updateCartItem(sepetId, currentAdet + 1);
    fetchCart();
  };

  const handleDecrease = async (sepetId, currentAdet) => {
    if (currentAdet > 1) {
      await updateCartItem(sepetId, currentAdet - 1);
    } else {
      await removeFromCart(sepetId);
    }
    fetchCart();
  };

  const total = cartItems.reduce((sum, item) => {
    const kitap = booksInfo[item.kitapId];
    return kitap ? sum + kitap.fiyat * item.adet : sum;
  }, 0);

  return (
                   <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">E-Kitap</div>
        <div className="nav-links">
          {/* Bu alana admin sayfaları linkleri ekleyebilirsin */}
        </div>
      </nav>
    <div style={styles.page}>
      <h2 style={styles.title}>🛒 Sepetim</h2>

      {cartItems.length === 0 ? (
        <p>Sepetiniz boş</p>
      ) : (
        <>
          {cartItems.map(item => {
            const kitap = booksInfo[item.kitapId];
            return kitap ? (
              <div key={item.sepetId} style={styles.itemRow}>
                <img src={kitap.gorselUrl} alt={kitap.baslik} style={styles.image} />
                <div style={styles.details}>
                  <p style={styles.name}>{kitap.baslik}</p>
                  <p style={styles.price}>{kitap.fiyat} ₺ x {item.adet}</p>

                  <div style={styles.qtyButtons}>
                    <button onClick={() => handleDecrease(item.sepetId, item.adet)} style={styles.qtyBtn}>
                      <FaMinus />
                    </button>
                    <span style={{ margin: '0 12px' }}>{item.adet}</span>
                    <button onClick={() => handleIncrease(item.sepetId, item.adet)} style={styles.qtyBtn}>
                      <FaPlus />
                    </button>
                  </div>
                </div>
    <button
  onClick={async () => {
    await removeFromCart(item.sepetId); // Beklenmeli
    fetchCart(); // Sonrasında yeniden veri alınmalı
  }}
  style={styles.removeBtn}
>
  <FaTrash />
</button>

              </div>
            ) : null;
          })}

          <hr style={{ margin: '20px 0' }} />
          <div style={styles.totalArea}>
            <strong>Toplam: {total.toFixed(2)} ₺</strong>
          </div>
          <button style={styles.buyBtn} onClick={() => navigate('/checkout')}>
            ✅ Satın Al
          </button>
        </>
      )}
    </div>
                   </>

  );
};

const styles = {
  page: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Georgia, serif',
    backgroundColor: '#fffefc',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '30px',
    color: '#4e342e',
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  },
  image: {
    width: '60px',
    height: '90px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginRight: '15px',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  price: {
    fontSize: '14px',
    color: '#555',
  },
  qtyButtons: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  qtyBtn: {
    backgroundColor: '#d7ccc8',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 10px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  removeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#b71c1c',
    fontSize: '18px',
    cursor: 'pointer',
  },
  totalArea: {
    textAlign: 'right',
    fontSize: '18px',
    marginBottom: '20px',
    color: '#3e2723',
  },
  buyBtn: {
    backgroundColor: '#6d4c41',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default Cart;
