# Contributing to ORBIT-Mobile

Thank you for your interest in contributing to ORBIT-Mobile! This document provides guidelines and instructions for developing and submitting changes.

## 📋 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/ORBIT-Mobile.git
   cd ORBIT-Mobile
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Set up your environment**:
   ```bash
   cp .env.example .env.local
   # Add your Supabase credentials
   ```

## 🔄 Development Workflow

### Before You Start

1. **Check existing issues** - Avoid duplicate work
2. **Create an issue** for significant features or bugs
3. **Discuss changes** with maintainers first

### While Developing

1. **Create a feature branch** from `main`
2. **Follow the code style** (ESLint and Prettier will help)
3. **Write tests** for new functionality
4. **Test your changes** thoroughly
5. **Keep commits atomic** and well-described

### Code Quality

All code must pass:
```bash
npm run lint        # ESLint check
npm run format      # Prettier formatting
npm test            # Unit tests
```

Auto-fix issues:
```bash
npm run lint:fix    # Fix ESLint issues
npm run format      # Auto-format code
```

## 📝 Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation changes
- `style` - Code style changes (no logic changes)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Build process, dependencies, etc.
- `ci` - CI/CD configuration
- `security` - Security improvements

### Examples

```bash
git commit -m "feat(auth): add login screen with Supabase"
git commit -m "fix(nav): resolve navigation state issue"
git commit -m "docs(readme): update setup instructions"
git commit -m "test(api): add tests for user service"
```

## 🧪 Testing Guidelines

### Write Tests For

- ✅ New features
- ✅ Bug fixes (regression tests)
- ✅ Utility functions
- ✅ Custom hooks
- ✅ API integration points

### Test Location

Place tests alongside the code they test:
- `components/MyComponent.tsx` → `components/__tests__/MyComponent.test.tsx`
- `lib/utils.ts` → `lib/__tests__/utils.test.ts`

### Running Tests

```bash
npm test              # Run all tests once
npm test:watch       # Run in watch mode
npm test:coverage    # Generate coverage report
```

## 📤 Submitting Changes

### Pull Request Process

1. **Update your branch** with latest main:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Description of what and why (not just how)
   - Reference to related issues: `Fixes #123`
   - Screenshots/videos for UI changes

4. **Address feedback**:
   - Make requested changes
   - Push updates
   - Request re-review when ready

5. **Wait for approval** from maintainers

### PR Title Format

Same as commit messages:
```
feat(auth): add two-factor authentication
fix(nav): resolve animation lag on route change
docs(contributing): update testing guidelines
```

## 🎨 Code Style

### TypeScript

```typescript
// ✅ Do
import { supabase } from '@/lib/supabase';

interface UserProps {
  id: string;
  name: string;
}

export const UserCard: React.FC<UserProps> = ({ id, name }) => (
  <View>
    <Text>{name}</Text>
  </View>
);

// ❌ Don't
import { supabase } from '../../../../lib/supabase';

export const UserCard = ({ id, name }: any) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};
```

### React Native Components

```typescript
// ✅ Do
- Use functional components
- Use hooks for state and effects
- Keep components focused and single-responsibility
- Extract complex logic to custom hooks
- Use TypeScript for prop types

// ❌ Don't
- Use class components
- Inline complex logic
- Skip type annotations
- Create massive monolithic components
```

## 🔐 Security Guidelines

- Never commit `.env` files or secrets
- Always use `EXPO_PUBLIC_` prefix for client-exposed variables
- Validate all user input
- Use Supabase RLS policies
- Follow OWASP mobile security guidelines
- Report security issues privately to maintainers

## 📚 Documentation

Update documentation when:
- Adding new features
- Changing API or behavior
- Updating setup instructions
- Adding new dependencies

Documentation includes:
- [README.md](README.md) - Project overview
- [SECURITY_SETUP.md](SECURITY_SETUP.md) - Security configuration
- Code comments for complex logic
- JSDoc for exported functions

## 🐛 Bug Reports

Include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Expo version, etc.)
- Screenshots or error logs
- SDK version from `expo --version`

## 💡 Feature Requests

Include:
- Use case and motivation
- Proposed solution
- Alternative approaches considered
- Potential impact and considerations

## 📋 Review Checklist

Before submitting a PR, ensure:

- [ ] Code follows style guide (run `npm run lint` and `npm run format`)
- [ ] Tests pass (`npm test`)
- [ ] New features have tests
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] No console errors or warnings
- [ ] Changes are atomic and focused
- [ ] No sensitive data in commits

## 🚢 Release Process

Maintainers will:
1. Review and merge changes
2. Update version in `package.json`
3. Create release note
4. Tag release on GitHub
5. Deploy to app stores

## ❓ Questions?

- Check [README.md](README.md) for setup help
- Review [SECURITY_SETUP.md](SECURITY_SETUP.md) for security questions
- Open a discussion on GitHub
- Contact maintainers directly

---

Thank you for contributing to ORBIT-Mobile! 🎉

**Last Updated:** April 15, 2026
