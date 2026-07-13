# 🍕 FoodHub – MERN Stack Food Ordering System

FoodHub is a full-stack food ordering web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. It allows users to browse food items, securely authenticate using JWT, manage their cart, save delivery addresses, and provides a responsive user experience.

> 🚧 This project is actively being enhanced with Checkout, Order Management, and Admin Dashboard modules.

---

## ✨ Features

### 👤 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing (bcrypt)

### 🍔 Food Module
- View All Food Items
- Food Details
- Dynamic Food Listing from MongoDB

### 🛒 Cart Module
- Add Items to Cart
- Update Item Quantity
- Remove Individual Item
- Clear Entire Cart
- Auto Price Calculation

### 📍 Address Module
- Add New Address
- View Saved Addresses
- Update Address
- Delete Address
- Default Address Selection

### 🧾 Checkout Module
- Order Summary
- Address Selection
- Price Breakdown
- Cash on Delivery

### 🎨 Frontend
- Responsive User Interface
- React Component-Based Architecture
- Axios API Integration
- Modern Dark Theme

---

## 🚀 Upcoming Features

- Admin Dashboard
- Food Management (Admin)
- Order Management (Admin)
- Payment Gateway Integration
- Delivery Partner Module

---

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
Add to Cart
     │
     ▼
Manage Cart
     │
     ▼
Manage Address
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

> Screenshots will be added soon.

- Home
- Login
- Register
- Cart
- Address
- Checkout
- Orders
- Admin Dashboard

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

---

## 🔮 Future Enhancements

- Payment Gateway Integration
- Delivery Partner Module
- Category Management
- Search & Filters
- Reviews & Ratings
- Wishlist
- Email Notifications
- Order Tracking

---

## 👩‍💻 Author

**Sonali Kale**

GitHub: https://github.com/sonali19705

LinkedIn: https://www.linkedin.com/in/sonaliikale

Email: sonalikale19705@gmail.com

---

⭐ If you like this project, consider giving it a star on GitHub.