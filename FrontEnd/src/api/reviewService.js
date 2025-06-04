import axios from 'axios';

const BASE_URL = 'http://localhost:9090';

// Giriş yapılmış kullanıcı için Authorization header'ı
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Yorum gönder
 * @param {Object} yorumData - { kitapId, userId, puan, yorum }
 */
export const postYorum = (yorumData) => {
  return axios.post(`${BASE_URL}/degerlendirmeler/yorum`, yorumData, authHeaders()); // ✅ token ile gönder
};

/**
 * Kitaba ait yorumları getir
 * @param {Number} kitapId
 */
export const getYorumlarByKitap = (kitapId) => {
  return axios.get(`${BASE_URL}/degerlendirmeler/kitap/${kitapId}`);
};
