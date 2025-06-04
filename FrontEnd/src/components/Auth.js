import { jwtDecode } from 'jwt-decode';

export const getToken = () => localStorage.getItem("token");

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.rol?.toLowerCase() || null; // örn. "admin" / "user"
  } catch (e) {
    return null;
  }
};

export const isAuthenticated = () => !!getToken();
