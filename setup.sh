#!/bin/bash

# Second Brain Gothic - Installation Script

echo "🖤 Setting up Second Brain - Gothic Edition..."

# Check Node version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ required. Current: $(node --version)"
    exit 1
fi

echo "✅ Node.js version OK: $(node --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

echo "✅ Dependencies installed"

# Create .env file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local..."
    cat > .env.local << EOF
VAULT_DIR=/home/azzaroth/vault
EOF
    echo "✅ .env.local created with default VAULT_DIR"
else
    echo "ℹ️  .env.local already exists (skip creation)"
fi

echo ""
echo "🎉 Installation complete!"
echo ""
echo "To start development server:"
echo "  npm run dev"
echo ""
echo "To build for production:"
echo "  npm run build"
echo "  npm run start"
echo ""
echo "Visit http://localhost:3000 to see your gothic sanctuary 🖤"
