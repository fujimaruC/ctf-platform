#!/bin/bash

# CTF Platform - Quick Start Script
# Run this to start a local development server

echo "🚀 Starting CTF Platform..."
echo ""
echo "Starting local server on http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    cd "$(dirname "$0")"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    cd "$(dirname "$0")"
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python not found. Please install Python or use your preferred web server."
    echo ""
    echo "Alternative methods to serve the files:"
    echo "1. Using Node.js: npx http-server"
    echo "2. Using PHP: php -S localhost:8000"
    echo "3. Open index.html directly in your browser (limited functionality)"
    exit 1
fi
