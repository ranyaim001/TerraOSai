#!/bin/bash

# TerraOS Quick Start Script
# This script helps you get started with TerraOS quickly

echo "🌍 TerraOS Quick Start"
echo "====================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the /app directory"
    exit 1
fi

echo "✅ Checking environment..."
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating from template..."
    cp .env.example .env.local
    echo "✅ Created .env.local"
    echo "⏳ Please add your API keys to .env.local before continuing"
    echo ""
else
    echo "✅ .env.local exists"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🚀 Starting TerraOS..."
echo ""
echo "Available at:"
echo "  Local:   http://localhost:3000"
echo "  Network: http://$(ipconfig getifaddr en0):3000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Start the development server
npm run dev
