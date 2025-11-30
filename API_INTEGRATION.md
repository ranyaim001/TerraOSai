# API Integration Guide

This guide explains how to integrate real APIs into TerraOS to replace the simulated data.

## 🌍 Planetary HUD - Real Data Sources

### 1. OpenWeather API (Air Quality & Weather)

```typescript
// src/app/api/planetary/route.ts
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

async function getAirQuality() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=0&lon=0&appid=${OPENWEATHER_API_KEY}`
  );
  return response.json();
}
```

**Get API Key**: https://openweathermap.org/api

### 2. NASA Earth Observation

```typescript
const NASA_API_KEY = process.env.NASA_API_KEY;

async function getEarthData() {
  const response = await fetch(
    `https://api.nasa.gov/planetary/earth/assets?lon=100.75&lat=1.5&date=2024-01-01&api_key=${NASA_API_KEY}`
  );
  return response.json();
}
```

**Get API Key**: https://api.nasa.gov/

### 3. World Air Quality Index

```typescript
const WAQI_API_KEY = process.env.WAQI_API_KEY;

async function getGlobalAQI() {
  const response = await fetch(
    `https://api.waqi.info/feed/here/?token=${WAQI_API_KEY}`
  );
  return response.json();
}
```

**Get API Key**: https://aqicn.org/api/

---

## 💰 My Dividend - Stock Market APIs

### 1. Alpha Vantage (Stock Prices)

```typescript
const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_API_KEY;

async function getStockPrice(symbol: string) {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}`
  );
  return response.json();
}
```

**Get API Key**: https://www.alphavantage.co/support/#api-key

### 2. Finnhub (Real-time Stock Data)

```typescript
const FINNHUB_KEY = process.env.FINNHUB_API_KEY;

async function getRealTimeQuote(symbol: string) {
  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`
  );
  return response.json();
}
```

**Get API Key**: https://finnhub.io/register

### 3. Polygon.io (Market Data)

```typescript
const POLYGON_KEY = process.env.POLYGON_API_KEY;

async function getMarketData(symbol: string) {
  const response = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?apiKey=${POLYGON_KEY}`
  );
  return response.json();
}
```

**Get API Key**: https://polygon.io/

---

## 🧬 Bio-Twin - Health APIs

### 1. Fitbit API

```typescript
const FITBIT_CLIENT_ID = process.env.FITBIT_CLIENT_ID;
const FITBIT_CLIENT_SECRET = process.env.FITBIT_CLIENT_SECRET;

async function getFitbitData(accessToken: string) {
  const response = await fetch(
    'https://api.fitbit.com/1/user/-/activities/date/today.json',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );
  return response.json();
}
```

**Setup**: https://dev.fitbit.com/getting-started/

### 2. Google Fit API

```typescript
const GOOGLE_FIT_CLIENT_ID = process.env.GOOGLE_FIT_CLIENT_ID;

async function getGoogleFitData(accessToken: string) {
  const response = await fetch(
    'https://www.googleapis.com/fitness/v1/users/me/dataSources',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );
  return response.json();
}
```

**Setup**: https://developers.google.com/fit

---

## 🤖 AI Chat - AI Service APIs

### 1. OpenAI (GPT-4)

```typescript
const OPENAI_KEY = process.env.OPENAI_API_KEY;

async function getChatResponse(message: string) {
  const response = await fetch(
    'https://api.openai.com/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: message }]
      })
    }
  );
  return response.json();
}
```

**Get API Key**: https://platform.openai.com/api-keys

### 2. Anthropic (Claude)

```typescript
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

async function getClaudeResponse(message: string) {
  const response = await fetch(
    'https://api.anthropic.com/v1/messages',
    {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: [{ role: 'user', content: message }]
      })
    }
  );
  return response.json();
}
```

**Get API Key**: https://console.anthropic.com/

### 3. Google AI (Gemini)

```typescript
const GOOGLE_AI_KEY = process.env.GOOGLE_AI_API_KEY;

async function getGeminiResponse(message: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GOOGLE_AI_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    }
  );
  return response.json();
}
```

**Get API Key**: https://makersuite.google.com/app/apikey

---

## 🔄 Implementation Steps

### 1. Get API Keys
- Sign up for each service
- Generate API keys
- Add to `.env.local`

### 2. Update API Routes
- Replace simulated data with real API calls
- Add error handling
- Implement rate limiting
- Add caching for performance

### 3. Test Integration
```bash
# Test API endpoints
curl http://localhost:3000/api/planetary
curl http://localhost:3000/api/stocks
curl http://localhost:3000/api/health
curl -X POST http://localhost:3000/api/chat -d '{"message":"Hello"}'
```

### 4. Deploy
- Add environment variables to Vercel
- Deploy and test in production

---

## 🛡️ Best Practices

### Rate Limiting
```typescript
// Implement rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

### Caching
```typescript
// Cache API responses
const cache = new Map();

async function getCachedData(key: string, fetcher: () => Promise<any>) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  const data = await fetcher();
  cache.set(key, data);
  setTimeout(() => cache.delete(key), 5 * 60 * 1000); // 5 min cache
  return data;
}
```

### Error Handling
```typescript
async function safeAPICall(apiCall: () => Promise<any>) {
  try {
    return await apiCall();
  } catch (error) {
    console.error('API Error:', error);
    return { error: 'Service temporarily unavailable' };
  }
}
```

---

## 📚 Additional Resources

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Environment Variables in Next.js](https://nextjs.org/docs/basic-features/environment-variables)
- [API Security Best Practices](https://owasp.org/www-project-api-security/)
