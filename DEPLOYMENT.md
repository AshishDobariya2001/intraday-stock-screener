# 🚀 Deployment Guide

## Quick Deploy to Vercel (5 Minutes)

### Step 1: Connect GitHub to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Import `AshishDobariya2001/intraday-stock-screener`

### Step 2: Configure Project

Vercel will auto-detect Next.js settings:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 3: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Your app will be live at: `https://intraday-stock-screener.vercel.app`

### Step 4: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `tradescreener.com`)
3. Follow DNS configuration instructions

---

## Alternative: Deploy to Render

### Step 1: Create Web Service

1. Go to [https://render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository

### Step 2: Configure

- **Name**: intraday-stock-screener
- **Environment**: Node
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: Free

### Step 3: Deploy

Click "Create Web Service" and wait for deployment.

---

## Environment Variables (Optional)

If you integrate real market data APIs, add these in Vercel/Render:

```
NEXT_PUBLIC_API_KEY=your_market_data_api_key
NEXT_PUBLIC_API_URL=https://api.marketdata.com
```

---

## Post-Deployment Checklist

✅ Test the live URL
✅ Verify all features work
✅ Check mobile responsiveness
✅ Set up custom domain (optional)
✅ Enable analytics (Vercel Analytics)
✅ Configure error monitoring

---

## Updating Your App

### Method 1: Push to GitHub
```bash
git add .
git commit -m "Update features"
git push origin main
```
Vercel will auto-deploy on every push!

### Method 2: Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

---

## Troubleshooting

### Build Fails
- Check Node.js version (use 18.x or higher)
- Verify all dependencies in package.json
- Check build logs in Vercel dashboard

### API Not Working
- Ensure API routes are in `app/api/` directory
- Check CORS settings if calling external APIs
- Verify environment variables are set

### Slow Performance
- Enable Vercel Edge Functions
- Add caching headers
- Optimize images with Next.js Image component

---

## Support

- **GitHub Issues**: [Report bugs](https://github.com/AshishDobariya2001/intraday-stock-screener/issues)
- **Vercel Docs**: [https://vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)