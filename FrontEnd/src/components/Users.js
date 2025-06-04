 import React, { useEffect, useState } from 'react';
import { getNormalUsers, deleteUser } from '../api/userService';
import { Link } from 'react-router-dom';
import '../App.css';

function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getNormalUsers();
      setUsers(response.data);
    } catch (err) {
      console.error("Kullanıcılar alınamadı:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      fetchUsers(); // Listeyi yenile
    } catch (err) {
      console.error("Kullanıcı silinemedi:", err);
    }
  };

  return (
    <>
      {/* Admin NAVBAR */}
      <nav className="navbar">
        <div className="logo">E-Kitap Admin</div>
        <div className="nav-links">
          <Link to="/admin">Anasayfa</Link>

          <Link to="/admin-book-panel">Kitap İşlemleri</Link>
          <Link to="/orders">Siparişler</Link>
        </div>
      </nav>

      <div className="container">
        <h2>👥 Tüm Kullanıcılar</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Ad Soyad</th>
              <th>Email</th>
              <th>Adres</th>
              <th>Rol</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.adSoyad}</td>
                <td>{user.email}</td>
                <td>{user.adres}</td>
                <td>{user.rol}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;