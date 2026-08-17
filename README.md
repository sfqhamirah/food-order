# FoodyNerd — Food Order App

A React food ordering web app built with Vite, Material UI v4, Context API, and localStorage. Built as a React Practicum project for TalentLabs.

---

## Features

### User Side

- Browse available food items in a card-based menu
- Add items to cart
- View cart in a modal (built with React Portals)
- Modify item quantity or remove items from cart
- Add optional remarks/notes to an order
- Place order (saved to localStorage)
- Switch to Admin view via the footer button

### Admin Side

- View all available food items
- Add new food items (name, description, price, image)
- Upload item images to Cloudinary (cloud storage)
- Delete food items
- View past orders (including items, quantities, remarks, and totals)
- Switch back to User view via the footer button

---

## Tech Stack

- **React** (Functional Components & Hooks)
- **Vite** (Development server & build tool)
- **Material UI v4** (`@material-ui/core`)
- **Context API**
  - `cart-context` – Manages shopping cart state
  - `items-context` – Manages food items and Admin/User mode
- **useReducer** – State management for cart and food items
- **useState** – UI state management
- **React Portals** – Cart modal rendering
- **Cloudinary** – Image hosting for uploaded food images
- **localStorage** – Stores order history

---

## Project Structure

```text
src/
│
├── component/
│   ├── admin/
│   │   ├── AdminForm.jsx          # Add food item form
│   │   └── Orders.jsx             # Displays saved orders
│   │
│   ├── user/
│   │   ├── Appbar.jsx             # Navigation bar
│   │   ├── Banner.jsx             # Hero section
│   │   ├── AboutUs.jsx            # About section
│   │   └── Cart.jsx               # Cart modal (React Portal)
│   │
│   ├── store/
│   │   ├── cart-context.js
│   │   ├── CartProvider.jsx
│   │   ├── items-context.js
│   │   └── ItemsProvider.jsx
│   │
│   ├── Meals.jsx                  # Food menu grid
│   ├── MealsItem.jsx              # Individual food card
│   └── Footer.jsx                 # Admin/User mode toggle
│
├── pages/
│   ├── Users.jsx
│   └── Admin.jsx
│
├── App.jsx
└── main.jsx
```

---

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment Variables

Create a `.env` file in the project root.

```env
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-unsigned-upload-preset
```

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Open the Application

```
http://localhost:5173
```

---

## How It Works

### Customer Flow

1. Browse the available food menu.
2. Add food items to the cart.
3. Update quantities or remove items.
4. Add optional order remarks.
5. Place an order.
6. Order details are saved to localStorage.

### Admin Flow

1. Switch to Admin mode using the footer button.
2. Add new food items with image upload.
3. Delete existing food items.
4. Review customer order history.

---

## Data Storage

| Data | Storage |
|------|---------|
| Food Items | React Context (runtime) |
| Cart | React Context |
| Order History | localStorage |
| Food Images | Cloudinary |

---

## Notes

- Uses **React 18** for compatibility with **Material UI v4**.
- Cloudinary upload preset must be configured as **Unsigned** to allow direct browser uploads.
- Default food items are seeded in `ItemsProvider.jsx`.
- Food images use public Unsplash URLs for demonstration.
- Orders are stored in localStorage.
- No backend or database is used.

---

## Known Limitations

- No user authentication or login system.
- Food items are not permanently stored in a database.
- Cart state resets after a page refresh.
- Checkout is simulated by saving the order to localStorage.
- No payment gateway integration.

---

## Future Improvements

- User authentication and authorization
- Backend API with database integration
- Online payment gateway
- Order status tracking
- Search and category filters
- Responsive admin dashboard
- Persistent cart storage
- Edit existing food items
- Inventory management

---

## Author

Developed as part of the **TalentLabs React Practicum** using React, Vite, Material UI, Context API, Cloudinary, and localStorage.