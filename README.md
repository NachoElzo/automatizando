# Automatizando - Test Automation App

This Next.js application is designed for testing automation scenarios with Playwright, featuring complex user interactions, form validations, and media content.

## Features

### 🎯 API Testing Page (`/api`)
- GET, POST, PUT, DELETE request testing
- Response validation and error handling
- Dynamic data manipulation
- Status code verification

### 🎬 Media Lab Page (`/media`)
- Multi-step captcha system (Math, Image Recognition, Drag & Drop)
- Interactive advertisements with timers
- YouTube-style video player with custom controls
- Video quality settings (Auto, 1080p, 720p, 480p, 360p, 240p)
- Playback speed controls (0.25x to 2x)
- Volume and mute controls
- Fullscreen functionality
- Settings menu with responsive design

## Getting Started

### Development Mode
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Production Mode Testing
```bash
# Create production build
npm run build

# Run production server
npm run start
```

### Or in one command:
```bash
npm run build && npm run start
```

### Clean Cache and Rebuild
```bash
# Remove cache and rebuild
rm -rf .next
npm run build
npm run start
```

### Debug Build
```bash
# Build with debug information
npm run build -- --debug
npm run start
```
