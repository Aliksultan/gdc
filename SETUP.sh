#!/bin/bash

echo "🚀 Career Assistant - Next.js Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install additional package
echo "📦 Installing tailwindcss-animate..."
npm install tailwindcss-animate

echo ""
echo "✅ Installation complete!"
echo ""
echo "🎯 Next steps:"
echo "   1. Run: npm run dev"
echo "   2. Open: http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "   - README_NEXTJS.md  → Complete guide"
echo "   - INSTALLATION.md   → Quick setup"
echo ""
