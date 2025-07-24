#!/bin/bash

# AI Task Follow-Up Platform Deployment Script
echo "🚀 Starting deployment of AI Task Follow-Up Platform..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building production version..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Start the server
    echo "🌐 Starting production server..."
    echo "📱 Application will be available at: http://localhost:3000"
    echo "🎯 Use Ctrl+C to stop the server"
    
    # Install serve if not already installed
    if ! command -v serve &> /dev/null; then
        echo "📥 Installing serve..."
        npm install -g serve
    fi
    
    # Start serving the application
    serve -s build -l 3000
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi