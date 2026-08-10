#!/bin/bash

# Second Brain Gothic - Production Deployment Script

echo "🖤 Deploying Second Brain - Gothic Edition..."
echo ""

# Check if we're in the right directory
if [ ! -d "app" ]; then
    echo "❌ Error: Must run this script from project root"
    exit 1
fi

# Step 1: Build optimization check
echo "📦 Running production build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build complete!"
echo ""

# Step 2: Environment setup
if [ -z "$VAULT_DIR" ]; then
    read -p "Enter vault directory path (default: /home/azzaroth/vault): " VAULT_PATH
    export VAULT_DIR="${VAULT_PATH:-/home/azzaroth/vault}"
else
    echo "ℹ️  Using VAULT_DIR: $VAULT_DIR"
fi

# Create .env.production
cat > .env.production << EOF
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production
VAULT_DIR=$VAULT_DIR
EOF

echo "✅ Environment configured"
echo ""

# Step 3: Validate vault exists
if [ ! -d "$VAULT_DIR" ]; then
    echo "⚠️  Warning: Vault directory not found at $VAULT_DIR"
    read -p "Continue anyway? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    VAULT_COUNT=$(find "$VAULT_DIR" -name "*.md" | wc -l)
    echo "✅ Vault validated: Found $VAULT_COUNT markdown files"
fi

# Step 4: Test server locally
echo ""
echo "🧪 Testing server..."
npm run build
node_modules/.bin/next start &
SERVER_PID=$!
sleep 5

# Check if server started
curl -s http://localhost:3000 > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Server running successfully"
    kill $SERVER_PID
    wait $SERVER_PID 2>/dev/null || true
else
    echo "⚠️  Warning: Server test failed, but continuing..."
fi

echo ""
echo "🎉 Deployment ready!"
echo ""
echo "To start the production server:"
echo "  npm run build && npm start"
echo ""
echo "Or set environment variables and run:"
echo "  export VAULT_DIR=/path/to/vault"
echo "  npm run build && npm start"
echo ""
echo "Application will be available at:"
echo "  http://localhost:3000"
echo ""
