# Hestia Production Environment Variables

To use this backend in your frontend applications (ShopMaster, VibeCheck, EliteAid), use the following configuration:

## Backend API URL
**URL:** `https://hestia-lpxn.onrender.com`
**Swagger Documentation:** `https://hestia-lpxn.onrender.com/api`

## Frontend Setup (.env)
Create or update your `.env` file in your React Native or Next.js projects:

```env
# Production
EXPO_PUBLIC_API_URL="https://hestia-lpxn.onrender.com"

# Local Development (usually)
# EXPO_PUBLIC_API_URL="http://localhost:3000"
```

## Quick Reference
| Service | Production Endpoint |
| :--- | :--- |
| **API Root** | `https://hestia-lpxn.onrender.com` |
| **Auth** | `https://hestia-lpxn.onrender.com/auth` |
| **Inventory** | `https://hestia-lpxn.onrender.com/inventory` |
| **Sales** | `https://hestia-lpxn.onrender.com/sales` |
