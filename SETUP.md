# 🚀 ORBIT-Mobile Developer Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- Xcode (for iOS) or Android Studio (for Android)

### Setup Steps

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd ORBIT-Mobile
   npm install
   ```

2. **Configure Environment**
   ```bash
   # Copy the example file
   cp .env.example .env.local
   
   # Ask project lead for actual Supabase credentials
   # Edit .env.local with your credentials
   nano .env.local
   ```

3. **Start Development**
   ```bash
   # Web
   npm run web
   
   # iOS
   npm run ios
   
   # Android
   npm run android
   ```

## 📁 Project Structure

```
app/                      # Expo Router screens
├── (tabs)/               # Tab-based screens
├── _layout.tsx           # Root layout
└── modal.tsx

components/               # Reusable UI components
constants/                # App configuration (colors, etc.)
lib/                      # Utilities (Supabase client, etc.)
assets/                   # Images, fonts, icons
```

## 🔑 Environment Variables

See [SECURITY_SETUP.md](SECURITY_SETUP.md) for detailed information.

### Required Variables

```bash
EXPO_PUBLIC_SUPABASE_URL          # Your Supabase project URL
EXPO_PUBLIC_SUPABASE_ANON_KEY     # Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY         # (Server-side only, never expose)
SUPABASE_DB_PASSWORD              # (Server-side only, never expose)
```

## 📝 Available Scripts

```bash
npm start       # Start Expo dev server
npm run android # Build for Android
npm run ios     # Build for iOS
npm run web     # Build for web
```

## 🛠️ Development Tools

### Code Quality
- **TypeScript** - Type checking
- **Strict Mode** - Enabled for better type safety
- **Path Aliases** - Use `@/` for imports

Example:
```typescript
import { supabase } from '@/lib/supabase';
import { Text, View } from '@/components/Themed';
```

### Recommended VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- TypeScript Vue Plugin
- Prettier - Code formatter
- ESLint
- Thunder Client or REST Client

## 🔐 Security

**Important:** Read [SECURITY_SETUP.md](SECURITY_SETUP.md) before your first commit!

Key points:
- Never commit `.env` or credentials
- Always use `.env.local` (Git-ignored)
- Share `.env.example` with team
- Credentials go in Supabase Dashboard, not code

## 🚢 Building for Production

### Web
```bash
npm run build-web
```

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

Requires account on [Expo Application Services (EAS)](https://eas.dev)

## 📚 Documentation

- [Expo Documentation](https://docs.expo.dev)
- [Expo Router Guide](https://expo.github.io/router)
- [React Native Docs](https://reactnative.dev)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🐛 Troubleshooting

### App won't start
```bash
# Clear cache and restart
expo start --clear
```

### Environment variables not loading
```bash
# Verify .env.local exists in project root
ls -la .env.local

# Check Expo is reading it
expo start --verbose
```

### Port already in use
```bash
# Expo will ask to use another port, press 'yes'
# Or manually specify: expo start --port 8081
```

## 💡 Tips

- Use `@/` import alias instead of relative paths
- Expo HMR (Hot Module Reloading) works with most changes
- For native code changes, rebuild with `expo start --clear`
- Check Supabase logs in Dashboard for API issues
- Use `console.log` safely - works in Expo CLI

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test
3. Commit with clear messages
4. Push and create a pull request

## ❓ Need Help?

- Check [common errors](#troubleshooting)
- Search [Expo Discord](https://discord.gg/expo)
- Review [Supabase documentation](https://supabase.com/docs)
- Check existing GitHub issues

---

**Last Updated:** April 15, 2026
