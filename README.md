# 🍕 FoodHub – MERN Stack Food Ordering System

FoodHub is a full-stack food ordering web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. It allows users to browse food items, securely authenticate using JWT, manage their cart, save delivery addresses, and provides a responsive user experience.

> ✅ FoodHub now includes complete Customer and Admin modules with JWT authentication, cart management, address management, checkout, order tracking, food management, and admin dashboard.

---
## 🌟 Project Highlights

- Full-Stack MERN Application
- JWT-Based Authentication & Authorization
- Customer & Admin Modules
- Dynamic Category Navigation
- Food CRUD Operations
- Order Management System
- Responsive UI
- RESTful API Architecture
- MongoDB Atlas Integration

---

## ✨ Features

### 👤 Authentication
- User Registration
- User Login
- JWT Authentication
- Role-Based Authorization
- Protected Routes
- Secure Password Hashing (bcrypt)

### 🍔 Food Module
- Dynamic Food Listing
- Search Food by Name
- Filter Foods by Category
- Responsive Food Cards
- Add to Cart

### 🛒 Cart Module
- Add Items to Cart
- Update Quantity
- Remove Individual Item
- Clear Cart
- Automatic Total Calculation

### 📍 Address Module
- Add Address
- View Saved Addresses
- Update Address
- Delete Address
- Select Delivery Address

### 🧾 Checkout & Orders
- Order Summary
- Address Selection
- Cash on Delivery
- Place Order
- Prevent Duplicate Orders
- View Order History
- Track Order Status

### 🛠️ Admin Module
- Admin Dashboard
- Dashboard Statistics
- Food Management (CRUD)
- Order Management
- Update Order Status
- Protected Admin Routes

### 🎨 User Experience
- Responsive Design
- Dynamic Categories
- Loading Component
- Empty State Component
- Modern Dark Theme

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript (ES6+)
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt.js

### Database
- MongoDB
- Mongoose

### Tools
- Git
- GitHub
- Postman
- VS Code

---

## 📂 Project Structure

```
FoodHub
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── assets
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── app.js
│   └── server.js
│
└── README.md
```

---

## 🔐 Authentication Flow

```
User Login/Register
        │
        ▼
Generate JWT Token
        │
        ▼
Store Token in Local Storage
        │
        ▼
Send Token in Authorization Header
        │
        ▼
Express Auth Middleware
        │
        ▼
Protected API Access
```

---

## 🛒 Current Customer Flow

```
Register
     │
     ▼
Login
     │
     ▼
Browse Foods
     │
     ▼
Search / Filter Foods
     │
     ▼
Add to Cart
     │
     ▼
Manage Cart
     │
     ▼
Select Address
     │
     ▼
Checkout
     │
     ▼
Place Order
     │
     ▼
Track Orders
```
## 🛠️ Admin Flow

```text
Admin Login
      │
      ▼
Dashboard
      │
      ▼
Manage Foods
      │
      ▼
Manage Orders
      │
      ▼
Update Order Status
```

---

## 📡 REST APIs

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |

### Food

| Method | Endpoint |
|---------|----------|
| GET | `/api/foods` |

### Cart

| Method | Endpoint |
|---------|----------|
| GET | `/api/cart` |
| POST | `/api/cart` |
| PUT | `/api/cart/:foodId` |
| DELETE | `/api/cart/:foodId` |
| DELETE | `/api/cart` |

### Address

| Method | Endpoint |
|---------|----------|
| GET | `/api/address` |
| POST | `/api/address` |
| PUT | `/api/address/:id` |
| DELETE | `/api/address/:id` |

### Orders

| Method | Endpoint |
|---------|----------|
| POST | `/api/orders` |
| GET | `/api/orders` |
| GET | `/api/orders/:id` |

### Admin

| Method | Endpoint |
|---------|----------|
| GET | `/api/admin/dashboard` |
| GET | `/api/orders/admin` |
| PATCH | `/api/orders/:id/status` |
| POST | `/api/foods` |
| PUT | `/api/foods/:id` |
| DELETE | `/api/foods/:id` |

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/sonali19705/foodhub-mern.git
```

### Go to Project

```bash
cd foodhub-mern
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Install Frontend Dependencies

```bash
cd ../client
npm install
```

### Create Environment File

Create a `.env` file inside the **server** folder.

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

---

## 📸 Screenshots

- Home Page
- Menu Page
- Login Page
- Register Page
- Cart Page
- Address Management
- Checkout Page
- Orders Page
- Admin Dashboard
- Food Management
- Order Management

---

## 🎯 Learning Outcomes

Through this project, I gained practical experience in:

- MERN Stack Development
- REST API Development
- JWT Authentication
- MongoDB Schema Design
- React Component Architecture
- Express Middleware
- CRUD Operations
- API Integration using Axios
- Git & GitHub Workflow
- Responsive Web Design
- Role-Based Authentication
- Admin Dashboard Development
- CRUD Operations with MongoDB
- State Management using React Hooks
- RESTful API Design
- Secure Route Protection

---

## 🔮 Future Enhancements

- Online Payment Gateway (Stripe/Razorpay)
- Delivery Partner Module
- Category Management
- Product Reviews & Ratings
- Wishlist
- Email Notifications
- Real-Time Order Tracking
- Image Upload using Cloudinary

---

## 👩‍💻 Author

**Sonali Kale**

GitHub: https://github.com/sonali19705

LinkedIn: https://www.linkedin.com/in/sonaliikale

Email: sonalikale19705@gmail.com

---

⭐ If you like this project, consider giving it a star on GitHub.