# ORBIT-Mobile

A modern React Native mobile application built with Expo, TypeScript, and Supabase for real-time backend functionality.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- Xcode (for iOS) or Android Studio (for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ORBIT-Mobile.git
   cd ORBIT-Mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Start development**
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
app/                      # Expo Router screens (file-based routing)
├── (tabs)/               # Tab-based navigation
│   ├── _layout.tsx       # Tab layout configuration
│   ├── index.tsx         # Tab One screen
│   └── two.tsx           # Tab Two screen
├── _layout.tsx           # Root layout
└── modal.tsx             # Modal example

components/               # Reusable UI components
├── EditScreenInfo.tsx
├── ExternalLink.tsx
├── StyledText.tsx
└── Themed.tsx            # Theme-aware components

constants/                # App configuration
└── Colors.ts            # Theme colors

lib/                      # Utilities and services
└── supabase.ts          # Supabase client initialization

assets/                   # Static resources
├── fonts/               
└── images/              

types/                    # TypeScript type definitions
```

## 🔑 Environment Variables

Create a `.env.local` file in the project root (see `.env.example` for template):

```
EXPO_PUBLIC_SUPABASE_URL=<your-supabase-url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>  # Server-side only
SUPABASE_DB_PASSWORD=<your-db-password>            # Server-side only
```

**Important:** Never commit `.env.local` or `.env.*.local` files. See [SECURITY_SETUP.md](SECURITY_SETUP.md) for details.

## 📦 Available Scripts

```bash
npm start                # Start Expo dev server
npm run android          # Build for Android
npm run ios              # Build for iOS
npm run web              # Build for web
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm test                 # Run Jest tests
npm test:watch           # Run tests in watch mode
npm test:coverage        # Generate coverage report
```

## 🛠️ Development Tools

### Code Quality

- **TypeScript** - Static type checking with strict mode enabled
- **ESLint** - Code linting and quality rules
- **Prettier** - Automatic code formatting
- **Husky & Lint-staged** - Git hooks for pre-commit checks
- **Jest** - Unit testing framework
- **Commitlint** - Conventional commit enforcement

### Best Practices

- Use path alias `@/` for imports: `import { supabase } from '@/lib/supabase'`
- Follow Expo Router file-based routing conventions
- Keep components focused and reusable
- Write tests for critical functionality
- Follow the [CONTRIBUTING.md](CONTRIBUTING.md) guidelines

## 🔐 Security

**Important:** Read [SECURITY_SETUP.md](SECURITY_SETUP.md) before your first commit!

Key security practices:
- ✅ Use `.env.local` for credentials (Git-ignored)
- ✅ Only expose `EXPO_PUBLIC_*` variables on the client
- ✅ Never commit `.env` files with real credentials
- ✅ Rotate credentials if accidentally exposed

## 📚 Dependencies

### Production Dependencies
- **Expo** (~55.0.6) - Development framework for React Native
- **React Native** (0.83.2) - Mobile development framework
- **React** (19.2.0) - JavaScript library for UI
- **Supabase** (^2.99.2) - Backend as a Service
- **Expo Router** (~55.0.5) - File-based routing

### Development Dependencies
- **TypeScript** (~5.9.2) - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Husky** - Git hooks
- **Commitlint** - Commit validation

See `package.json` for the complete dependency list.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:coverage
```

Tests should be placed in:
- `components/__tests__/`
- `lib/__tests__/`
- Or alongside the code as `*.test.tsx` or `*.spec.tsx`

## 🤝 Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Code style and conventions
- Commit message format
- Pull request process
- Testing requirements

## 📄 License

[Add your license here]

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Last Updated:** April 15, 2026
