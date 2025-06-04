import axios from 'axios';

const BASE_URL = 'http://localhost:9090';

// 🔐 Ortak Authorization header (gizli endpointler için)
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// 🔑 Login → JWT token al
export const login = (loginRequest) =>
  axios.post(`${BASE_URL}/auth/login`, loginRequest);

// 📝 Yeni kullanıcı oluştur (register)
export const createUser = (userCreateDto) =>
  axios.post(`${BASE_URL}/users`, userCreateDto);

// 🔍 Kullanıcıyı ID’ye göre getir
export const getUserById = (id) =>
  axios.get(`${BASE_URL}/users/${id}`, authHeaders());

// 🔄 Kullanıcı bilgilerini güncelle
export const updateUser = (id, userCreateDto) =>
  axios.put(`${BASE_URL}/users/${id}`, userCreateDto, authHeaders());

// ❌ Kullanıcı sil
export const deleteUser = (id) =>
  axios.delete(`${BASE_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// 📃 Sadece "user" rolündeki kullanıcıları getir (admin görür)
export const getNormalUsers = () =>
  axios.get(`${BASE_URL}/users/normal-users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// 👤 Giriş yapmış kullanıcı bilgisi (profil)
export const getCurrentUser = () =>
  axios.get(`${BASE_URL}/users/me`, authHeaders());

// 📃 Tüm kullanıcıları getir (sadece admin görür)
export const getAllUsers = () =>
  axios.get(`${BASE_URL}/users`, authHeaders());
