# 🍔 FoodyNerd — Food Ordering Web Application

FoodyNerd is a responsive food ordering web application built with **React**, **Vite**, **Material UI v4**, **Context API**, and **Cloudinary**. The application allows customers to browse food items, place orders, and enables administrators to manage the menu and review customer orders. Order history is stored locally using **localStorage**, while food images are uploaded and hosted through **Cloudinary**.

---

## 📸 Demo Video

https://github.com/user-attachments/assets/b4a15217-70f4-47df-b364-0ac316773ced

## ✨ Features

### 👤 Customer Features

- Browse available food items
- Add food items to the shopping cart
- Increase or decrease item quantity
- Remove items from the cart
- Add optional remarks before placing an order
- View the shopping cart in a modal using React Portals
- Place an order
- Switch to Admin mode using the footer button

### 👨‍💼 Admin Features

- View all available food items
- Add new food items
- Upload food images to Cloudinary
- Delete food items
- View customer order history
- Review ordered items, quantities, remarks, and total price
- Switch back to Customer mode

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Material UI v4

### State Management

- Context API
- useReducer
- useState

### Storage

- Cloudinary (Image Hosting)
- localStorage (Order History)

### Other

- React Portals

---

## 📁 Project Structure

```text
src/
│
├── component/
│   ├── admin/
│   │   ├── AdminForm.jsx
│   │   └── Orders.jsx
│   │
│   ├── user/
│   │   ├── Appbar.jsx
│   │   ├── Banner.jsx
│   │   ├── AboutUs.jsx
│   │   └── Cart.jsx
│   │
│   ├── store/
│   │   ├── cart-context.js
│   │   ├── CartProvider.jsx
│   │   ├── items-context.js
│   │   └── ItemsProvider.jsx
│   │
│   ├── Meals.jsx
│   ├── MealsItem.jsx
│   └── Footer.jsx
│
├── pages/
│   ├── Users.jsx
│   └── Admin.jsx
│
├── App.jsx
└── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites

Before running the project, make sure you have:

- Node.js (v18 or later)
- npm

### 1. Clone the Repository

```bash
git clone <repository-url>
cd FoodyNerd
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

```
http://localhost:5173
```

---

## 🔄 How It Works

### Customer Workflow

1. Browse the food menu.
2. Add food items to the shopping cart.
3. Modify item quantities or remove items.
4. Add optional remarks.
5. Place the order.
6. Order details are saved to localStorage.

### Admin Workflow

1. Switch to Admin mode from the footer.
2. Add new food items.
3. Upload food images to Cloudinary.
4. Delete food items.
5. Review customer order history.

---

## 💾 Data Storage

| Data | Storage |
|------|---------|
| Food Items | React Context (Runtime) |
| Shopping Cart | React Context |
| Order History | localStorage |
| Food Images | Cloudinary |

---

## 🧠 Key React Concepts Used

- Functional Components
- React Hooks (`useState`, `useReducer`, `useContext`)
- Context API for global state management
- React Portals for rendering the shopping cart modal
- Component based architecture
- Conditional rendering
- Event handling
- Props and state management

---

## 📌 Notes

- Built with **React 18** for compatibility with Material UI v4.
- Images are uploaded directly to Cloudinary using an unsigned upload preset.
- Default food items are initialized in `ItemsProvider.jsx`.
- Orders are stored locally in the browser using localStorage.
- No backend server or database is required.

---

## ⚠️ Known Limitations

- No user authentication or authorization
- Food items are not permanently stored
- Shopping cart resets after refreshing the page
- Checkout process is simulated
- No payment gateway integration
- No backend API or database

---

## 🚀 Future Improvements

- User authentication and authorization
- Backend API integration
- Database support
- Online payment gateway
- Order status tracking
- Search functionality
- Food category filtering
- Responsive admin dashboard improvements
- Persistent shopping cart
- Edit existing food items
- Inventory management

---

## 👨‍💻 Author

Developed as a learning project using:

- React
- Vite
- Material UI v4
- Context API
- React Portals
- Cloudinary
- localStorage

This project demonstrates React fundamentals, state management with Context API, image uploading, reusable component design, and basic CRUD functionality for a food ordering application.
