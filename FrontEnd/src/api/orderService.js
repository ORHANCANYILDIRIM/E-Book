import axios from 'axios';
const BASE_URL = 'http://localhost:9090';

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json'
  }
});

export const createSiparis = (siparisData) =>
  axios.post(`${BASE_URL}/siparisler`, siparisData, authHeaders());

export const getFaturaBySiparisId = (siparisId) =>
  axios.get(`${BASE_URL}/faturalar/siparis/${siparisId}`, authHeaders());

export const getSiparislerByUserId = (userId) =>
  axios.get(`${BASE_URL}/siparisler/kullanici/${userId}`, authHeaders());

// ✅ EKLENMESİ GEREKEN FONKSİYON (Admin tüm siparişleri + fatura bilgileriyle alır)
export const getAllFaturalar = () =>
  axios.get(`${BASE_URL}/faturalar`, authHeaders());
