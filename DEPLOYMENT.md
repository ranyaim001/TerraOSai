# TerraOS Deployment Guide

## 🚀 Quick Deploy to Vercel

### Option 1: One-Click Deploy

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your TerraOS repository
5. Vercel will auto-detect Next.js
6. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 🔐 Environment Variables Setup

### In Vercel Dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following:

```
GITHUB_TOKEN=your_github_token_here
```

### For Future API Integrations:

```
# Financial APIs
ALPHA_VANTAGE_API_KEY=your_key
FINNHUB_API_KEY=your_key

# AI Services
OPENAI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key

# Health APIs
FITBIT_CLIENT_ID=your_id
FITBIT_CLIENT_SECRET=your_secret

# Weather/Climate APIs
OPENWEATHER_API_KEY=your_key
NASA_API_KEY=your_key
```

## 🌐 Custom Domain Setup

### In Vercel:

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### DNS Configuration Example:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 📊 Performance Optimization

### Already Configured:

- ✅ Next.js 16 with Turbopack
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ CSS modules for optimal loading

### Additional Optimizations:

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

## 🔄 CI/CD Pipeline

Vercel automatically:
- Builds on every push
- Deploys preview for PRs
- Deploys production on main branch
- Runs build checks

## 📱 Testing Deployment

### Local Production Build:

```bash
# Build for production
npm run build

# Test production build locally
npm start
```

### Check Deployment:

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs
```

## 🛡️ Security Checklist

- [ ] Environment variables set in Vercel (not in code)
- [ ] `.env.local` in `.gitignore`
- [ ] API keys rotated and secured
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] CORS configured if needed
- [ ] Rate limiting on API routes (future)

## 📈 Monitoring

### Vercel Analytics (Free):

1. Go to Project → Analytics
2. Enable Web Analytics
3. View real-time metrics

### Custom Monitoring:

```typescript
// Add to layout.tsx for error tracking
if (process.env.NODE_ENV === 'production') {
  // Add error tracking service
  // e.g., Sentry, LogRocket, etc.
}
```

## 🔧 Troubleshooting

### Build Fails:

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Environment Variables Not Working:

- Redeploy after adding env vars
- Check variable names (case-sensitive)
- Restart development server

### Performance Issues:

- Check bundle size
- Optimize images
- Enable caching headers
- Use CDN for static assets

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- TerraOS Issues: [Your GitHub Issues URL]

---

## 🎉 Post-Deployment

After successful deployment:

1. ✅ Test all features
2. ✅ Verify API endpoints
3. ✅ Check mobile responsiveness
4. ✅ Monitor performance
5. ✅ Share your live URL!

**Your TerraOS is now live! 🌍**
