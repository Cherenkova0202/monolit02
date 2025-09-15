# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Requirements

**ВАЖНО**: Все ответы, комментарии, сообщения об ошибках, диалоги и любое другое общение с пользователем должно быть на русском языке. Код и технические термины остаются на английском.

## Common Development Commands

```bash
# Development
npm install           # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run preview      # Preview production build

# Build & Quality
npm run build        # TypeScript check + Vite build (MUST pass before commit)
npm run lint         # ESLint check (MUST pass before commit)
npm run format       # Prettier formatting
npm run format:check # Check formatting without changes

# Testing
npm run test         # Run Playwright tests (base URL: http://localhost:5174)
npm run test:ui      # Run tests with UI mode
npm run test:report  # Open test results in browser
```

## Architecture Overview

### Tech Stack
- **Frontend**: React 18.3, TypeScript 5.8+ (strict mode), Vite 7.0
- **UI Library**: Ant Design 5.20+ for consistent corporate interface
- **State Management**: TanStack Query 5.59+ (server state), Zustand 5.0+ (auth state)
- **Backend**: Supabase 2.47+ (PostgreSQL, Auth, Storage, Realtime)
- **Authentication**: Supabase Auth with OAuth 2.0 (Google) support
- **Utilities**: Day.js 1.11+ for dates, xlsx 0.18+ for Excel processing
- **Routing**: React Router DOM 6.27+
- **Testing**: Playwright 1.55+ for end-to-end testing
- **Development**: ESLint 9.30+, Prettier 3.6+, dotenv for environment management

### Feature-Sliced Design (FSD) Structure
```
src/
├── app/          # App-level providers, routing
│   ├── providers/ # QueryProvider, ConfigProvider
│   └── routing/   # AppRouter
├── pages/        # Route pages (dashboard, documents, references, admin, reports)
├── widgets/      # Complex reusable UI blocks (to be populated)
├── features/     # User interactions, business features (auth)
├── entities/     # Business entities and their APIs (user, project, document)
├── shared/       # Shared utilities, UI components, types
├── layout/       # Layout components (MainLayout.tsx)
└── lib/          # External library configurations (supabase.ts)
```

### Key Patterns
- **Public API**: Each slice exposes through `index.ts`
- **Imports**: Use path aliases configured in `vite.config.ts` and `tsconfig.app.json`:
  - `@/` → `./src`
  - `@/app/` → `./src/app`
  - `@/pages/` → `./src/pages`
  - `@/widgets/` → `./src/widgets`
  - `@/features/` → `./src/features`
  - `@/entities/` → `./src/entities`
  - `@/shared/` → `./src/shared`
- **State**: TanStack Query for server state, Zustand for auth state only
- **Error Handling**: All Supabase queries must include error handling

## Core Features

### Authentication System
- Supabase Auth with email/password and Google OAuth
- Protected routes with automatic redirection
- Zustand store for auth state management
- JWT token handling and refresh

### Corporate Portal Layout
- Responsive sidebar navigation with collapsible menu
- Header with user profile and logout functionality
- Main content area with route-based pages
- Mobile-first design approach

### Page Structure
- **Dashboard**: Main overview page with quick access cards
- **Documents**: Document management section
- **References**: Reference data management
- **Reports**: Analytics and reporting
- **Admin**: Administrative functions

## Supabase Configuration

Environment variables required:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-fallback-key
VITE_STORAGE_BUCKET=your-storage-bucket
NODE_ENV=development
```

Configuration: `src/lib/supabase.ts`

### API Pattern
Standard Supabase query pattern:
```typescript
const { data, error } = await supabase
  .from('table')
  .select('*, relation:table(*)')
  .order('created_at', { ascending: false });

if (error) {
  console.error('Operation failed:', error);
  throw error;
}
```

## UI/UX Guidelines
- **Mobile-first** responsive design
- **Russian language** for all user-facing elements
- **Ant Design 5** components with consistent styling
- **Professional** corporate appearance
- **Accessibility** compliance (WCAG 2.1 AA)

## Code Standards
- Component names: `PascalCase`
- Variables and functions: `camelCase`
- Use functional React components with hooks
- Data fetching via TanStack Query
- Auth state via Zustand store
- Follow existing patterns in codebase

### Code Style Configuration
- **Print width**: 100 characters
- **Semicolons**: Disabled (semi: false)
- **Trailing commas**: All (es5, es2017, es2020)
- **Quotes**: Single quotes, double quotes for JSX
- **Indentation**: 2 spaces, no tabs
- **Line endings**: LF for cross-platform compatibility

## TypeScript Configuration
- Composite project with separate `tsconfig.app.json` and `tsconfig.node.json`
- Strict mode enabled with all strict checks
- Path aliases configured in both TypeScript and Vite
- Build info cached in `node_modules/.tmp/`
- Module resolution: bundler mode with ESNext modules

## Critical Guidelines

### MUST DO
- Run `npm run lint` before committing
- Run `npm run format` for consistent code style
- Handle all TypeScript strict mode requirements
- Use absolute imports with path aliases (@/)
- Export public APIs through index.ts files
- Include error handling in all Supabase queries
- Write **TypeScript only** with strict typing
- Use functional React components and hooks
- Data fetching via TanStack Query

### NEVER DO
- Create files unless absolutely necessary
- Add comments unless explicitly requested
- Use relative imports (../../../)
- Commit .env files or secrets
- Use `any` type in TypeScript
- Create documentation files proactively
- Store secrets in repository

## Testing Configuration

### Playwright E2E Testing
- **Base URL**: http://localhost:5174 (different from dev server port 5173)
- **Test directory**: `./tests`
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Auto-start dev server**: Configured in `playwright.config.ts`
- **Reporters**: HTML report with screenshots and videos on failure
- **Parallel execution**: Enabled for faster test runs

## Important Notes
- All temporary files must be placed in `temp/` directory
- Follow Russian language requirements for user communications
- Maintain corporate professional appearance
- Implement proper error handling and loading states
- Ensure mobile responsiveness across all components
- Use Ant Design components for consistency

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
ALL temporary files MUST be placed in the temp/ directory, NEVER in the root directory.