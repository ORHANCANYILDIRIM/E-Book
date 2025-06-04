import axios from 'axios';

const BASE_URL = 'http://localhost:9090';

// 🔐 Tokenlı axios
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json',
  },
});

// 🔍 Başlığa göre arama
export const searchBooksByBaslik = (baslik) =>
  axios.get(`${BASE_URL}/kitaplar/ara`, {
    params: { baslik },
  });

// 📖 ID'ye göre kitap getir
export const getBookById = (id) =>
  axios.get(`${BASE_URL}/kitaplar/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// 📚 Tüm kitaplar (herkese açık)
export const getAllBooks = () => axios.get(`${BASE_URL}/kitaplar`);

// 🟡 Onaysız kitaplar (admin için)
export const getPendingBooks = () =>
  axios.get(`${BASE_URL}/kitaplar/onaysiz`, authHeaders());

// ✅ Onaylı kitaplar (Admin için)
export const getApprovedBooks = () =>
  axios.get(`${BASE_URL}/kitaplar/onayli`, authHeaders());

// ✅ Kullanıcının onaylı kitapları (eğer endpoint varsa)
export const getOnayliKitaplar = (userId) =>
  axios.get(`${BASE_URL}/kitaplar/onayli/${userId}`, authHeaders());

// ➕ Kitap oluştur
export const createBook = (book) =>
  axios.post(`${BASE_URL}/kitaplar`, book, authHeaders());

// ✏️ Kitap güncelle
export const updateBook = (id, book) =>
  axios.put(`${BASE_URL}/kitaplar/${id}`, book, authHeaders());

// 🗑️ Kitap sil
export const deleteBook = (id) =>
  axios.delete(`${BASE_URL}/kitaplar/${id}`, authHeaders());

// 🔓 Admin kitap onaylama
export const approveBook = (id) =>
  axios.put(`${BASE_URL}/kitaplar/${id}/onayla`, null, authHeaders());

// 🔍 Başlık veya yazara göre arama (ikili)
export const searchByBaslikOrYazar = (query) =>
  axios.get(`${BASE_URL}/kitaplar/ikiliara`, {
    params: { query },
  });
