import axios from 'axios';

const BASE_URL = 'http://localhost:9090/sepet'; 


//  Kullanıcının sepetini getir
export const getCartByUser = (userId) =>
  axios.get(`${BASE_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  
export const addToCart = (data) =>
  axios.post(`${BASE_URL}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    }
  });


// Sepetten ürün sil
export const removeFromCart = (sepetId) =>
  axios.delete(`${BASE_URL}/${sepetId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });




// Sepetteki ürün adedini güncelle
export const updateCartItem = (sepetId, yeniAdet) =>
  axios.put(`${BASE_URL}/adet/${sepetId}`, { adet: yeniAdet }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

// Sepeti temizle (sipariş sonrası)
export const clearCartByUser = (userId) =>
  axios.delete(`${BASE_URL}/clear/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

