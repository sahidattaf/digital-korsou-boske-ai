#!/bin/bash
# Digital Kòrsou – Setup Script

echo "======================================"
echo "Digital Kòrsou – Boske di AI"
echo "Setup Script"
echo "======================================"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "Error: Node.js 18+ required (found v$NODE_VERSION)"
    exit 1
fi

echo "Node.js version: $(node -v)"

# Install API dependencies
echo ""
echo "Installing API dependencies..."
cd api && npm install

# Check for .env file
if [ ! -f .env ]; then
    echo ""
    echo "Creating .env file from template..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "Please edit api/.env with your API keys"
    else
        echo "OPENAI_API_KEY=your-key-here" > .env
        echo "Created api/.env - please add your API keys"
    fi
fi

echo ""
echo "======================================"
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your API keys to api/.env"
echo "2. Run 'npm run dev' in the api/ folder"
echo "3. Visit http://localhost:8787"
echo "======================================"
