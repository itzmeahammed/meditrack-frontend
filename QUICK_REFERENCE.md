# MediTrack - Quick Reference Guide

## 🚀 Quick Start

```bash
npm install
npm start
# Opens at http://localhost:3000
```

---

## 🎨 Color Palette Quick Reference

| Color | Hex | Usage |
|-------|-----|-------|
| White | #FFFFFF | Primary background |
| Light Green | #E8F5E9 | Secondary background |
| Green | #4CAF50 | Buttons, accents |
| Dark Green | #2E7D32 | Hover states, footer |
| Dark Green Text | #1B5E20 | Headlines |
| Medium Green Text | #558B2F | Body text |
| Light Green Border | #C8E6C9 | Borders, dividers |

---

## 📄 Pages & Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| / | LandingEnhanced | Welcome page |
| /login | EnhancedLoginPageV2 | Authentication |
| /user | UserDashboardV2 | User dashboard |
| /admin | AdminDashboardV2 | Admin panel |

---

## 👤 Test Credentials

### Admin
- Email: admin@meditrack.com
- Password: admin123
- Secret Code: ADMIN123

### User
- Email: user@meditrack.com
- Password: user123

---

## 💾 localStorage Keys

```javascript
// Authentication
meditrack_users          // All users
meditrack_currentUser    // Current user

// Products
meditrack_products       // All medicines
meditrack_favorites      // Favorite IDs

// Shopping
meditrack_cart          // Cart items
meditrack_orders        // Order history
```

---

## 🎯 Component Files

### Landing Page
- File: `src/pages/landing_enhanced.js`
- Features: Hero, benefits, features, CTA, footer

### Login/Signup
- File: `src/pages/login_enhanced_v2.js`
- Features: Forms, validation, localStorage auth

### Home (Products)
- File: `src/pages/home_v2.js`
- Features: Grid, search, filter, favorites, cart

### Cart
- File: `src/pages/cart_v2.js`
- Features: Items, summary, checkout, orders

### User Sidebar
- File: `src/pages/userSidebar_v2.js`
- Features: Profile, menu, logout

### User Header
- File: `src/pages/userHeader_v2.js`
- Features: Welcome, notifications, profile

### User Dashboard
- File: `src/pages/userDashboard_v2.js`
- Features: Integrates all user components

### Admin Dashboard
- File: `src/pages/adminDashboard_v2.js`
- Features: Stats, products, orders, users

---

## 🔧 Key Features

### User Features
✅ Browse medicines
✅ Search & filter
✅ Add to favorites
✅ Shopping cart
✅ Checkout
✅ Order history
✅ AI assistant
✅ Prescription analyzer

### Admin Features
✅ Dashboard stats
✅ Add products
✅ Edit products
✅ Delete products
✅ View orders
✅ Manage users

---

## 📱 Responsive Design

### Mobile (320px - 768px)
- Drawer navigation
- Full-width layout
- Touch-friendly buttons

### Tablet (768px - 1024px)
- Adjusted spacing
- 2-column grids
- Flexible layouts

### Desktop (1024px+)
- Full sidebar
- Multi-column grids
- Hover effects

---

## 🎯 Demo Products

1. Aspirin 500mg - ₹150
2. Vitamin C 1000mg - ₹200
3. Cough Syrup - ₹120
4. Antibiotic Cream - ₹180
5. Multivitamin Tablets - ₹250
6. Antacid Tablets - ₹100
7. Sleep Aid Capsules - ₹220
8. Allergy Relief - ₹140

---

## 🎨 UI Elements

### Buttons
- Primary: Green background, white text
- Secondary: White background, green border
- Hover: Dark green background

### Cards
- White background
- Light green border (2px)
- Soft green shadow
- Rounded corners (16px)

### Inputs
- Light green border (2px)
- Green focus state
- Dark green text
- Rounded corners (12px)

### Chips
- Green background for selected
- Light green background for unselected
- Green text for selected
- Dark green text for unselected

---

## ✨ Animations

- Fade in: 0.6s
- Slide up: 0.6s
- Scale: 0.3s
- Stagger: 0.1s between items

---

## 🔐 Security

- Email validation
- Password strength (min 6 chars)
- Phone validation (10 digits)
- Admin code validation (ADMIN123)
- Session management
- Role-based access

---

## 📊 Calculations

### Cart
- Subtotal: Sum of all item totals
- Tax: Subtotal × 18%
- Shipping: ₹50 flat
- Total: Subtotal + Tax + Shipping

---

## 🐛 Troubleshooting

### App won't start
```bash
rm -r node_modules package-lock.json
npm install
npm start
```

### Clear all data
```javascript
localStorage.clear()
location.reload()
```

### Check current user
```javascript
JSON.parse(localStorage.getItem('meditrack_currentUser'))
```

### View all products
```javascript
JSON.parse(localStorage.getItem('meditrack_products'))
```

---

## 📚 Documentation Files

- `QUICK_START.md` - Getting started
- `PROJECT_SUMMARY.md` - Project overview
- `COMPONENT_GUIDE.md` - Component details
- `COLOR_PALETTE_GUIDE.md` - Color reference
- `UI_ENHANCEMENT_SUMMARY.md` - UI changes
- `COMPLETE_UI_ENHANCEMENT.md` - Full enhancement details
- `QUICK_REFERENCE.md` - This file

---

## 🎯 Common Tasks

### Create Account
1. Click "Create Account" on login page
2. Fill in all fields
3. For admin, enter secret code: ADMIN123
4. Click "Create Account"

### Login
1. Enter email and password
2. Click "Sign In"
3. Redirected to user/admin dashboard

### Add to Cart
1. Browse products on home page
2. Click "Add to Cart" on product card
3. View cart to see items

### Checkout
1. Go to cart
2. Click "Proceed to Checkout"
3. Fill in delivery details
4. Click "Place Order"

### Add Product (Admin)
1. Go to Admin Dashboard
2. Click "Products" tab
3. Click "Add Product"
4. Fill in product details
5. Click "Save"

---

## 🎉 Features Summary

✅ Beautiful landing page
✅ Modern login/signup
✅ Product browsing
✅ Search & filtering
✅ Shopping cart
✅ Checkout process
✅ Order history
✅ Admin dashboard
✅ Product management
✅ User management
✅ Responsive design
✅ Smooth animations
✅ localStorage persistence
✅ Form validation
✅ Error handling
✅ Toast notifications

---

## 📞 Support

Refer to documentation files for:
- Getting started: `QUICK_START.md`
- Troubleshooting: `FAQ_TROUBLESHOOTING.md`
- Components: `COMPONENT_GUIDE.md`
- Colors: `COLOR_PALETTE_GUIDE.md`

---

**Version**: 3.0.0
**Last Updated**: 2025-11-15
**Status**: ✅ Complete
