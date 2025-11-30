# TerraOS - Global Dashboard

A comprehensive global dashboard for visualizing planetary health, economic solutions, governance, and personal wellness.

## 🌟 Features

- **🌍 Planetary HUD**: Real-time global health monitoring and disaster alerts
- **💰 My Dividend**: AI-driven stock market investment dashboard with UBI tracking
- **🎮 The Simulation**: Gamified governance platform for collaborative decision-making
- **🧬 Bio-Twin**: Digital health twin with personalized wellness tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to the app directory
cd app

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your API keys to .env.local
# GITHUB_TOKEN=your_token_here

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Styling**: CSS Modules with Glassmorphism
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## 📦 Project Structure

```
app/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx      # Main dashboard
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   └── components/       # React components
│       ├── Navigation.tsx
│       ├── PlanetaryHUD.tsx
│       ├── MyDividend.tsx
│       ├── TheSimulation.tsx
│       ├── BioTwin.tsx
│       └── AIChat.tsx
├── public/               # Static assets
└── package.json
```

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
GITHUB_TOKEN=your_github_token_here
# Add other API keys as needed
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design Philosophy

TerraOS uses a premium glassmorphism aesthetic with:
- Vibrant gradient color palettes
- Smooth micro-animations
- Responsive layouts
- Modern typography (Inter font)
- Dark mode optimized

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🌐 Live Demo

[Add your deployed URL here]

---

Built with ❤️ for a better world
