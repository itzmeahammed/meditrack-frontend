# MediTrack Component Guide

## Component Overview

This document provides detailed information about all the enhanced components in the MediTrack application.

---

## 🎯 Landing Page Component

**File**: `src/pages/landing.js`

### Purpose
Serves as the public-facing homepage with feature showcase and call-to-action buttons.

### Features
- Hero section with gradient background
- Feature cards with icons
- Smooth animations using Framer Motion
- Responsive design
- Navigation to login page

### Props
None (standalone component)

### Usage
```jsx
import Landing from "./pages/landing";

<Route path="/" element={<Landing />} />
```

### Key Sections
1. **Hero Section**: Welcome message and CTA buttons
2. **Features Section**: 4 key features with icons
3. **CTA Section**: Final call-to-action

---

## 🔐 Enhanced Login Page

**File**: `src/pages/login_enhanced.js`

### Purpose
Handles user authentication and registration with localStorage support.

### Features
- Toggle between Login and Sign Up
- Form validation
- Password visibility toggle
- Admin secret code validation
- Loading states
- Error messages
- localStorage integration

### Props
None (standalone component)

### Usage
```jsx
import EnhancedLoginPage from "./pages/login_enhanced";

<Route path="/login" element={<EnhancedLoginPage />} />
```

### Form Validation
- **Email**: Must be valid email format
- **Password**: Minimum 6 characters
- **Phone**: Must be 10 digits
- **Admin Code**: Must be "ADMIN123"

### localStorage Keys Used
- `meditrack_users`: Array of registered users
- `meditrack_currentUser`: Currently logged-in user

---

## 🏠 Enhanced Home Page

**File**: `src/pages/home_enhanced.js`

### Purpose
Displays medicines catalog with search and filter functionality.

### Props
```jsx
{
  addToCart: (product) => void  // Function to add product to cart
}
```

### Features
- Product grid display
- Search functionality
- Category filtering
- Favorite toggle
- Product ratings
- Stock status
- Add to cart

### Usage
```jsx
import HomeEnhanced from "./pages/home_enhanced";

<HomeEnhanced addToCart={addToCart} />
```

### localStorage Keys Used
- `meditrack_products`: Available medicines
- `meditrack_favorites`: Favorite product IDs

### Product Object Structure
```javascript
{
  id: number,
  productName: string,
  price: number,
  category: string,
  description: string,
  rating: number,
  inStock: boolean
}
```

---

## 🛒 Enhanced Cart Page

**File**: `src/pages/cart_enhanced.js`

### Purpose
Manages shopping cart and checkout process.

### Props
```jsx
{
  cartItems: Array,                          // Array of cart items
  removeFromCart: (productId) => void        // Function to remove item
}
```

### Features
- Cart items table
- Quantity adjustment
- Order summary
- Tax calculation (18%)
- Shipping cost ($50)
- Checkout dialog
- Order history

### Usage
```jsx
import CartEnhanced from "./pages/cart_enhanced";

<CartEnhanced cartItems={cartItems} removeFromCart={removeFromCart} />
```

### localStorage Keys Used
- `meditrack_cart`: Current cart items
- `meditrack_orders`: Order history

### Cart Item Structure
```javascript
{
  id: number,
  productName: string,
  price: number,
  quantity: number,
  totalPrice: number,
  ...productData
}
```

### Order Structure
```javascript
{
  id: string,
  items: Array,
  subtotal: number,
  tax: number,
  shipping: number,
  total: number,
  customer: {
    name: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    zipCode: string
  },
  status: string,
  createdAt: ISO string
}
```

---

## 📱 Enhanced User Sidebar

**File**: `src/pages/userSidebar_enhanced.js`

### Purpose
Navigation sidebar for user dashboard with profile information.

### Props
```jsx
{
  setSelectedTab: (tab) => void,    // Function to change active tab
  selectedTab: string               // Currently selected tab
}
```

### Features
- User profile section
- Navigation menu
- Mobile drawer support
- Logout functionality
- Smooth animations

### Usage
```jsx
import UserSidebarEnhanced from "./pages/userSidebar_enhanced";

<UserSidebarEnhanced 
  setSelectedTab={setSelectedTab} 
  selectedTab={selectedTab} 
/>
```

### Menu Items
- Home
- Shopping Cart
- AI Assistance
- Prescription Analyzer

### localStorage Keys Used
- `meditrack_currentUser`: Current user info

---

## 👤 Enhanced User Header

**File**: `src/pages/userHeader_enhanced.js`

### Purpose
Header component for user dashboard with welcome message and user menu.

### Props
None (uses localStorage for user data)

### Features
- Welcome message with date
- Notification button
- Settings button
- User profile dropdown
- Logout option

### Usage
```jsx
import UserHeaderEnhanced from "./pages/userHeader_enhanced";

<UserHeaderEnhanced />
```

### localStorage Keys Used
- `meditrack_currentUser`: Current user info

---

## 📊 Enhanced User Dashboard

**File**: `src/pages/userDashboard_enhanced.js`

### Purpose
Main user dashboard integrating all user components.

### Props
None (standalone component)

### Features
- Tab-based navigation
- Cart state management
- localStorage persistence
- Mobile responsive
- Authentication check

### Usage
```jsx
import UserDashboardEnhanced from "./pages/userDashboard_enhanced";

<Route path="/user" element={<UserDashboardEnhanced />} />
```

### Tabs
1. **Home**: Browse medicines
2. **Cart**: Shopping cart and checkout
3. **AI Assistance**: Chat with AI
4. **Prescription Analyzer**: Analyze prescriptions

### localStorage Keys Used
- `meditrack_currentUser`: User authentication
- `meditrack_cart`: Shopping cart
- `meditrack_products`: Products list
- `meditrack_favorites`: Favorites

---

## 🔧 Enhanced Admin Dashboard

**File**: `src/pages/adminDashboard_enhanced.js`

### Purpose
Admin panel for managing products, orders, and users.

### Props
None (standalone component)

### Features
- Dashboard overview with stats
- Product management (CRUD)
- Order management
- User management
- Mobile responsive
- Admin authentication check

### Usage
```jsx
import AdminDashboardEnhanced from "./pages/adminDashboard_enhanced";

<Route path="/admin" element={<AdminDashboardEnhanced />} />
```

### Tabs
1. **Dashboard**: Statistics overview
2. **Products**: Add, edit, delete products
3. **Orders**: View all orders
4. **Users**: View registered users

### Statistics Displayed
- Total Products
- Total Orders
- Total Users
- Total Revenue

### localStorage Keys Used
- `meditrack_currentUser`: Admin authentication
- `meditrack_products`: Products list
- `meditrack_orders`: Orders list
- `meditrack_users`: Users list

---

## 🎨 Styling & Theming

### Color Constants
```javascript
// Primary Gradient
background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"

// Individual Colors
#667eea - Primary Blue
#764ba2 - Secondary Purple
#4caf50 - Success Green
#e74c3c - Error Red
#f8f9fa - Background Light
#333333 - Text Primary
#666666 - Text Secondary
```

### Material-UI Integration
All components use Material-UI (MUI) components with custom styling via `sx` props.

### Framer Motion Animations
Components use Framer Motion for smooth animations:
- Fade in/out
- Slide up/down
- Scale transitions
- Stagger effects

---

## 🔄 State Management

### localStorage Structure
```
meditrack_users          → Array of user objects
meditrack_currentUser    → Current logged-in user
meditrack_products       → Array of products
meditrack_cart          → Array of cart items
meditrack_orders        → Array of orders
meditrack_favorites     → Array of favorite product IDs
```

### Component State Flow
```
Landing Page
    ↓
Login/Sign Up (localStorage: meditrack_users, meditrack_currentUser)
    ↓
User/Admin Dashboard
    ├── User Dashboard
    │   ├── Home (localStorage: meditrack_products, meditrack_favorites)
    │   ├── Cart (localStorage: meditrack_cart, meditrack_orders)
    │   ├── AI Assistance
    │   └── Prescription Analyzer
    └── Admin Dashboard
        ├── Dashboard (localStorage: all data)
        ├── Products (localStorage: meditrack_products)
        ├── Orders (localStorage: meditrack_orders)
        └── Users (localStorage: meditrack_users)
```

---

## 🚀 Performance Optimizations

1. **Lazy Loading**: Components load on demand
2. **Memoization**: Prevent unnecessary re-renders
3. **localStorage Caching**: Reduce data fetching
4. **Responsive Images**: Optimized for all devices
5. **Smooth Animations**: GPU-accelerated transitions

---

## 🔐 Security Considerations

⚠️ **Important Notes**:
- Passwords stored in localStorage (demo only)
- No encryption implemented (demo only)
- For production, use proper backend authentication
- Implement JWT tokens
- Use HTTPS
- Hash passwords securely

---

## 📝 Common Tasks

### Add New Product
```javascript
const newProduct = {
  id: Date.now(),
  productName: "Medicine Name",
  price: 100,
  category: "Category",
  description: "Description",
  rating: 4.5,
  inStock: true
};
const products = JSON.parse(localStorage.getItem("meditrack_products") || "[]");
products.push(newProduct);
localStorage.setItem("meditrack_products", JSON.stringify(products));
```

### Get Current User
```javascript
const currentUser = JSON.parse(localStorage.getItem("meditrack_currentUser"));
```

### Clear All Data
```javascript
localStorage.clear();
```

### Add to Cart
```javascript
const cart = JSON.parse(localStorage.getItem("meditrack_cart") || "[]");
cart.push({ ...product, quantity: 1, totalPrice: product.price });
localStorage.setItem("meditrack_cart", JSON.stringify(cart));
```

---

## 🎯 Best Practices

1. **Always validate user input**
2. **Check authentication before rendering protected components**
3. **Handle errors gracefully with toast notifications**
4. **Use responsive design patterns**
5. **Optimize images and assets**
6. **Test on multiple devices**
7. **Keep localStorage data minimal**
8. **Implement proper error boundaries**

---

## 📚 Dependencies

- **react**: ^19.1.0
- **@mui/material**: ^7.0.2
- **framer-motion**: ^12.23.12
- **react-icons**: ^5.5.0
- **react-toastify**: ^11.0.5
- **react-router-dom**: ^7.5.0

---

## 🆘 Troubleshooting

### Component Not Rendering
- Check if component is imported correctly
- Verify route is defined in App.js
- Check browser console for errors

### localStorage Not Working
- Check if localStorage is enabled in browser
- Verify key names are correct
- Use browser DevTools to inspect localStorage

### Styling Issues
- Check if Material-UI is installed
- Verify sx props syntax
- Check for CSS conflicts

### Authentication Issues
- Verify user exists in localStorage
- Check password validation
- Clear localStorage and try again

---

For more information, refer to REDESIGN_SUMMARY.md and QUICK_START.md
