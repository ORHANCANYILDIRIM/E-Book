#  E-Book Management

A fully functional digital e-book sales and management web application. Users can browse books, add them to the cart, and place orders, while admins can approve, update, and manage the content and orders via a separate admin panel.

---

##  Features

###  Authentication & Authorization
- Secure registration and login using **JWT tokens**
- Role-based access control: `USER` and `ADMIN`
- All endpoints are secured using **Spring Security**

###  Book Management

**For Users:**
- View approved books only
- Search by title or author
- Filter by category
- View book details including image, description, and price

**For Admins:**
- Add new books (auto-approved)
- List pending books
- Approve, update, or delete books
- Access all books (approved/unapproved)

###  Image Upload
- Upload book cover images via form (`multipart/form-data`)
- Images are stored in `/uploads` directory on the server
- Each book stores its own image URL in the database

###  Shopping Cart
- Add books to cart
- Increase/decrease quantity
- Remove books from cart
- Real-time total calculation
- Cart is user-specific

###  Order & Checkout
- Create an order with cart contents and payment method
- Order saved in `orders` table
- Ordered books linked via `order_book` join table
- Cart is cleared after order is placed

###  Invoice Generation
- Automatic invoice generation for each order
- Invoice includes:
  - Order number
  - User info
  - Total amount
  - Order date
- Invoice is shown in the Checkout summary screen

---

##  Project Structure

###  Backend (Spring Boot)
- Layered architecture: `Entity`, `DTO`, `Service`, `Controller`
- Uses DTOs for clean and secure data transfer
- Images uploaded and served from local filesystem

###  Frontend (React)
- Pages: Books, Cart, Login, Admin Panel, Checkout, Invoice
- Centralized API services: `bookService`, `authService`, `cartService`, `orderService`
- Separate UI design for admin panel

---

##  User Roles

**User:**
- Browse and search books
- Manage cart and place orders

**Admin:**
- Manage all books
- Approve/reject books
- View invoices and orders

---

##  Extra Features

- Real-time autocomplete search by title/author
- Max image upload size limit (e.g. 2MB)
- Clean error messages on failed API calls
- Mobile-friendly, modular and scalable structure

---


