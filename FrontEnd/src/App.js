import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';  
import Login from './components/Login';  
import AdminLogin from './components/AdminLogin';  
import Register from './components/Register'; 
import BookManage from './components/BookManage';
import BookPage from './components/BookPage';
import './App.css';  
import MainPage from './components/MainPage';
import BookDetail from "./components/BookDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import MyBooks from "./components/MyBooks";
import AddBook from "./components/AddBook";
import Account from './components/Account';
import Profile from './components/Profile';
import AdminBookPanel from './components/AdminBookPanel';
import UpdateBook from './components/UpdateBook';
import AdminAdd from './components/AdminAdd';
import AdminMainPage from './components/AdminMainPage';
import Users from './components/Users';
import Orders from './components/Orders';
import EditBook from './components/EditBook';
import AdminOrders from './components/AdminOrders';
import AdminBookDetail from './components/AdminBookDetail';
import MyOrders from './components/MyOrders';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/book-manage" element={<BookManage />} />
          <Route path="/kitaplar" element={<BookPage />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-books" element={<MyBooks />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/account" element={<Account />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin-book-panel" element={<AdminBookPanel />} />
          <Route path="/update-book" element={<UpdateBook />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/admin/kitap-ekle" element={<AdminAdd />} />
          <Route path="/admin" element={<AdminMainPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/admin/book/:id" element={<AdminBookDetail />} />
          <Route path="/my-orders" element={<MyOrders/>}/>

          <Route path="/admin-orders"element= {<AdminOrders />} />


          





        </Routes>
      </div>
    </Router>
  );
}

export default App;