# MediTrack Frontend - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory**
   ```bash
   cd meditrack-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to that URL

## 📋 Application Flow

### 1. Landing Page (/)
- Welcome screen with features overview
- "Get Started" button leads to login
- Beautiful gradient design

### 2. Login/Sign Up (/login)
- **Login Tab**: Enter email and password
- **Sign Up Tab**: Create new account
  - Choose role (User or Admin)
  - For Admin: Enter secret code `ADMIN123`
  - Fill in all required fields

### 3. User Dashboard (/user)
- **Home**: Browse and search medicines
  - Search by name or description
  - Filter by category
  - Add to favorites
  - Add to cart
  
- **Shopping Cart**: 
  - View cart items
  - Adjust quantities
  - View order summary
  - Proceed to checkout
  
- **AI Assistance**: Chat with AI assistant
- **Prescription Analyzer**: Upload and analyze prescriptions

### 4. Admin Dashboard (/admin)
- **Dashboard**: View statistics
  - Total products
  - Total orders
  - Total users
  - Revenue
  
- **Products**: Manage medicines
  - Add new products
  - Edit existing products
  - Delete products
  
- **Orders**: View all customer orders
- **Users**: View registered users

## 🔑 Test Credentials

### Admin Account
```
Email: admin@meditrack.com
Password: admin123
Secret Code: ADMIN123
```

### User Account
```
Email: user@meditrack.com
Password: user123
```

### Create New Account
1. Click "Create Account" on login page
2. Choose role (User or Admin)
3. Fill in details
4. For Admin, enter secret code: `ADMIN123`
5. Click "Create Account"

## 💾 Data Storage

All data is stored in browser's localStorage:
- **meditrack_users**: Registered users
- **meditrack_currentUser**: Currently logged-in user
- **meditrack_products**: Available medicines
- **meditrack_cart**: Shopping cart items
- **meditrack_orders**: Order history
- **meditrack_favorites**: Favorite medicines

### Clear All Data
Open browser console and run:
```javascript
localStorage.clear()
```

## 🎨 Color Scheme

- **Primary**: Purple/Blue Gradient (#667eea → #764ba2)
- **Success**: Green (#4caf50)
- **Error**: Red (#e74c3c)
- **Background**: Light Gray (#f8f9fa)

## 📱 Responsive Design

The app is fully responsive:
- **Mobile**: Drawer navigation, optimized layouts
- **Tablet**: Adjusted spacing
- **Desktop**: Full sidebar navigation

## 🔄 Available Routes

| Route | Component | Access |
|-------|-----------|--------|
| / | Landing Page | Public |
| /login | Login/Sign Up | Public |
| /user | User Dashboard | Logged-in Users |
| /admin | Admin Dashboard | Logged-in Admins |

## 🛠️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📦 Demo Products

The app includes 8 pre-loaded medicines:
1. Aspirin 500mg - ₹150
2. Vitamin C 1000mg - ₹200
3. Cough Syrup - ₹120
4. Antibiotic Cream - ₹180
5. Multivitamin Tablets - ₹250
6. Antacid Tablets - ₹100
7. Sleep Aid Capsules - ₹220
8. Allergy Relief - ₹140

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
npm start -- --port 3001
```

### Clear node_modules and reinstall
```bash
rm -r node_modules
npm install
npm start
```

### Clear browser cache
- Press `Ctrl+Shift+Delete` (Windows/Linux) or `Cmd+Shift+Delete` (Mac)
- Select "All time"
- Check "Cookies and other site data"
- Click "Clear data"

## 📚 Project Structure

```
meditrack-frontend/
├── public/
├── src/
│   ├── pages/
│   │   ├── landing.js
│   │   ├── login_enhanced.js
│   │   ├── home_enhanced.js
│   │   ├── cart_enhanced.js
│   │   ├── userSidebar_enhanced.js
│   │   ├── userHeader_enhanced.js
│   │   ├── userDashboard_enhanced.js
│   │   ├── adminDashboard_enhanced.js
│   │   ├── aiAssistant.js
│   │   └── prescription.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎯 Key Features

✅ Beautiful modern UI with gradient design
✅ Fully responsive design
✅ localStorage-based data persistence
✅ User authentication and authorization
✅ Product browsing and search
✅ Shopping cart functionality
✅ Order management
✅ Admin dashboard
✅ Smooth animations
✅ Toast notifications

## 🔐 Security Notes

⚠️ **Important**: This is a demo application using localStorage. For production:
- Implement proper backend authentication
- Use JWT tokens
- Hash passwords securely
- Use HTTPS
- Implement proper authorization
- Never store sensitive data in localStorage

## 📞 Support

For issues or questions, please refer to the REDESIGN_SUMMARY.md file for more details about the implementation.

## 🎉 Enjoy!

The application is ready to use. Start exploring MediTrack!
