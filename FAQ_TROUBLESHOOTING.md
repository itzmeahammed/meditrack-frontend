# MediTrack Frontend - FAQ & Troubleshooting Guide

## ❓ Frequently Asked Questions

### General Questions

**Q: How do I start the application?**
A: Navigate to the project directory and run:
```bash
npm install
npm start
```
The app will open at `http://localhost:3000`

**Q: What is the admin secret code?**
A: The admin secret code is `ADMIN123`. You need this to create an admin account.

**Q: How do I create a test account?**
A: Click "Create Account" on the login page, fill in the details, and click "Create Account". For admin accounts, enter the secret code.

**Q: Where is my data stored?**
A: All data is stored in your browser's localStorage. It persists until you clear your browser data.

**Q: Can I use this app offline?**
A: Yes! Since all data is stored locally, the app works completely offline.

**Q: How do I clear all data?**
A: Open browser console (F12) and run:
```javascript
localStorage.clear()
```

**Q: Is my password secure?**
A: This is a demo app. Passwords are stored in plain text in localStorage. For production, use proper backend authentication with encrypted passwords.

**Q: Can I export my data?**
A: You can access your data through browser DevTools:
1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Copy the data as needed

---

## 🐛 Troubleshooting

### App Won't Start

**Problem**: `npm start` fails with errors

**Solutions**:
1. Clear node_modules and reinstall:
   ```bash
   rm -r node_modules package-lock.json
   npm install
   npm start
   ```

2. Check Node version:
   ```bash
   node --version
   ```
   Should be v14 or higher

3. Check for port conflicts:
   ```bash
   npm start -- --port 3001
   ```

---

### Components Not Loading

**Problem**: Pages show blank or components don't render

**Solutions**:
1. Check browser console for errors (F12)
2. Clear browser cache:
   - Press Ctrl+Shift+Delete
   - Select "All time"
   - Check "Cookies and other site data"
   - Click "Clear data"

3. Hard refresh the page:
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)

4. Check if all dependencies are installed:
   ```bash
   npm list react react-dom @mui/material
   ```

---

### Login Not Working

**Problem**: Can't login or sign up

**Solutions**:
1. Check if user exists in localStorage:
   - Open DevTools (F12)
   - Go to Application → Local Storage
   - Look for `meditrack_users` key

2. Verify email format:
   - Must contain @ and domain
   - Example: user@example.com

3. Check password requirements:
   - Minimum 6 characters
   - No special requirements

4. For admin signup:
   - Secret code must be exactly: `ADMIN123`
   - Phone must be 10 digits

5. Clear localStorage and try again:
   ```javascript
   localStorage.clear()
   ```

---

### Cart Not Saving

**Problem**: Items disappear from cart after refresh

**Solutions**:
1. Check if localStorage is enabled:
   - Open DevTools (F12)
   - Go to Application → Local Storage
   - Should see `meditrack_cart` key

2. Check browser storage limits:
   - localStorage has ~5-10MB limit
   - Clear old data if needed

3. Verify cart data:
   ```javascript
   JSON.parse(localStorage.getItem('meditrack_cart'))
   ```

---

### Products Not Showing

**Problem**: Home page shows no products

**Solutions**:
1. Check if products are loaded:
   ```javascript
   JSON.parse(localStorage.getItem('meditrack_products'))
   ```

2. If empty, refresh the page to load demo data

3. Check category filter:
   - Make sure "All" is selected
   - Try different categories

4. Check search field:
   - Clear search to see all products

---

### Styling Issues

**Problem**: Components look broken or styles not applied

**Solutions**:
1. Check if Material-UI is installed:
   ```bash
   npm list @mui/material
   ```

2. Hard refresh to clear CSS cache:
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)

3. Check browser console for CSS errors (F12)

4. Verify viewport meta tag in index.html:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```

---

### Mobile Navigation Not Working

**Problem**: Sidebar doesn't open on mobile

**Solutions**:
1. Check viewport settings
2. Clear browser cache
3. Try different browser
4. Check if screen width is < 768px

---

### Performance Issues

**Problem**: App is slow or laggy

**Solutions**:
1. Check browser DevTools Performance tab
2. Clear localStorage if too much data:
   ```javascript
   localStorage.clear()
   ```

3. Close other browser tabs
4. Disable browser extensions
5. Try different browser

---

### localStorage Errors

**Problem**: "QuotaExceededError" or storage full

**Solutions**:
1. Check storage usage:
   ```javascript
   Object.keys(localStorage).reduce((total, key) => {
     return total + localStorage[key].length;
   }, 0) / 1024 / 1024 + ' MB'
   ```

2. Clear old data:
   ```javascript
   localStorage.clear()
   ```

3. Remove specific keys:
   ```javascript
   localStorage.removeItem('meditrack_orders')
   ```

---

### Animation Lag

**Problem**: Animations are stuttering or slow

**Solutions**:
1. Disable browser extensions
2. Close other applications
3. Update browser to latest version
4. Check GPU acceleration is enabled
5. Try different browser

---

### Authentication Issues

**Problem**: Can't stay logged in or session expires

**Solutions**:
1. Check if currentUser is stored:
   ```javascript
   localStorage.getItem('meditrack_currentUser')
   ```

2. Verify user role:
   ```javascript
   JSON.parse(localStorage.getItem('meditrack_currentUser')).role
   ```

3. Check if localStorage is cleared on page refresh:
   - Some browsers clear localStorage in private mode
   - Try regular browsing mode

---

## 🔧 Advanced Troubleshooting

### Check All localStorage Data
```javascript
console.table(Object.keys(localStorage).map(key => ({
  key,
  size: localStorage[key].length + ' bytes',
  value: localStorage[key].substring(0, 100)
})))
```

### Export All Data
```javascript
const data = {};
Object.keys(localStorage).forEach(key => {
  data[key] = JSON.parse(localStorage[key]);
});
console.log(JSON.stringify(data, null, 2));
```

### Reset to Demo State
```javascript
localStorage.clear();
location.reload();
```

### View User Sessions
```javascript
const users = JSON.parse(localStorage.getItem('meditrack_users') || '[]');
const current = JSON.parse(localStorage.getItem('meditrack_currentUser'));
console.log('All Users:', users);
console.log('Current User:', current);
```

### Check Cart Status
```javascript
const cart = JSON.parse(localStorage.getItem('meditrack_cart') || '[]');
const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
console.log('Cart Items:', cart.length);
console.log('Cart Total:', total);
```

---

## 📞 Getting Help

### Check These First
1. Read the QUICK_START.md guide
2. Check COMPONENT_GUIDE.md for component details
3. Review REDESIGN_SUMMARY.md for overview
4. Check browser console for error messages

### Common Error Messages

**"Cannot read property 'map' of undefined"**
- Data not loaded from localStorage
- Refresh the page

**"localStorage is not defined"**
- Browser doesn't support localStorage
- Try different browser or enable storage

**"Route not found"**
- Check App.js for correct route definitions
- Verify component imports

**"Material-UI component not found"**
- Check if @mui/material is installed
- Verify import statements

---

## ✅ Verification Checklist

Before reporting an issue, verify:
- [ ] Node.js is v14 or higher
- [ ] All dependencies are installed (`npm install`)
- [ ] No errors in browser console (F12)
- [ ] localStorage is enabled
- [ ] Using latest browser version
- [ ] Tried hard refresh (Ctrl+Shift+R)
- [ ] Tried clearing cache
- [ ] Tried in different browser
- [ ] Tried in incognito/private mode

---

## 🆘 Still Having Issues?

1. **Check the documentation**:
   - QUICK_START.md
   - COMPONENT_GUIDE.md
   - REDESIGN_SUMMARY.md

2. **Inspect the code**:
   - Check component files in `src/pages/`
   - Review App.js for routing
   - Check browser console for errors

3. **Reset the app**:
   ```javascript
   localStorage.clear();
   location.reload();
   ```

4. **Check browser compatibility**:
   - Chrome (recommended)
   - Firefox
   - Safari
   - Edge

---

## 📝 Reporting Issues

When reporting issues, include:
1. Browser and version
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Browser console errors
6. localStorage data (if applicable)

---

## 🎯 Performance Tips

1. **Clear old orders periodically**:
   ```javascript
   const orders = JSON.parse(localStorage.getItem('meditrack_orders') || '[]');
   const recent = orders.slice(-10); // Keep last 10
   localStorage.setItem('meditrack_orders', JSON.stringify(recent));
   ```

2. **Optimize images**:
   - Use compressed images
   - Use appropriate formats

3. **Minimize localStorage usage**:
   - Don't store unnecessary data
   - Archive old orders

4. **Use browser DevTools**:
   - Monitor performance
   - Check memory usage
   - Profile CPU usage

---

## 🔐 Security Tips

1. **Never share your password**
2. **Clear localStorage on shared computers**:
   ```javascript
   localStorage.clear()
   ```

3. **Use strong passwords** (min 6 characters)
4. **Log out when done**
5. **Don't store sensitive data** in localStorage
6. **Use HTTPS** in production

---

**Last Updated**: 2025-11-15
**Version**: 1.0.0
