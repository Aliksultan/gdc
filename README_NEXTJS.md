# Career Assistant - Next.js + TypeScript + Tailwind CSS + shadcn/ui + Redux Toolkit

Modern, production-ready career guidance platform built with the latest React technologies.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **State Management**: Redux Toolkit
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📦 Installation

### 1. Install Dependencies

```bash
cd /Users/nolanch/Desktop/gdc
npm install
```

### 2. Add Missing Dependency

```bash
npm install tailwindcss-animate
```

## 🎯 Development

### Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
gdc/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout with Redux Provider
│   │   ├── page.tsx           # Dashboard (homepage)
│   │   ├── explore/           # Career exploration page
│   │   ├── resume/            # Resume builder (to create)
│   │   ├── interview/         # Mock interview (to create)
│   │   └── onboarding/        # Onboarding flow (to create)
│   │
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── progress.tsx
│   │   │   └── accordion.tsx
│   │   ├── layout/            # Layout components
│   │   │   └── navigation.tsx
│   │   └── providers/         # Context providers
│   │       └── redux-provider.tsx
│   │
│   └── lib/
│       ├── store.ts           # Redux store configuration
│       ├── hooks.ts           # Typed Redux hooks
│       ├── utils.ts           # Utility functions
│       └── features/          # Redux slices
│           ├── userSlice.ts
│           ├── navigationSlice.ts
│           ├── resumeSlice.ts
│           └── interviewSlice.ts
│
├── package.json               # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind config
├── next.config.js            # Next.js config
└── components.json           # shadcn/ui config
```

## ✨ Features Implemented

### ✅ Dashboard Page (`/`)
- User profile with completion progress
- Suggested courses list
- Quick action cards (gradient styled)
- Development plan with checkboxes
- Redux state integration
- Responsive grid layout

### ✅ Career Exploration (`/explore`)
- Detailed career information (Product Manager)
- Expandable accordion sections
- Skill badges (owned vs needed)
- Salary range visualization
- Career progression timeline
- Breadcrumb navigation

### 🚧 To Be Created

1. **Resume Builder** (`/app/resume/page.tsx`)
2. **Mock Interview** (`/app/interview/page.tsx`)
3. **Onboarding Flow** (`/app/onboarding/page.tsx`)

## 🛠️ Creating Remaining Pages

### Resume Builder Template

```tsx
// src/app/resume/page.tsx
'use client'

import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { updateContactInfo } from '@/lib/features/resumeSlice'
// ... implement resume builder
```

### Mock Interview Template

```tsx
// src/app/interview/page.tsx
'use client'

import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { startInterview } from '@/lib/features/interviewSlice'
// ... implement interview simulator
```

## 🎨 Styling

### Theme Colors

Defined in `src/app/globals.css`:

- **Primary**: Blue (#2b8cee) - Main brand color
- **Background**: Dark mode default
- **Foreground**: Text color
- All colors support light/dark mode

### Adding Custom Styles

```tsx
import { cn } from '@/lib/utils'

<div className={cn("base-classes", "conditional-classes")} />
```

## 🔄 State Management

### Using Redux

```tsx
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { toggleTask } from '@/lib/features/userSlice'

// Get state
const user = useAppSelector((state) => state.user)

// Dispatch actions
const dispatch = useAppDispatch()
dispatch(toggleTask(0))
```

### Adding New State

1. Create slice in `src/lib/features/yourSlice.ts`
2. Add reducer to `src/lib/store.ts`
3. Use typed hooks in components

## 🧩 Adding shadcn/ui Components

```bash
# Example: Add Dialog component
npx shadcn-ui@latest add dialog
```

Available components:
- button, card, checkbox, input, label
- accordion, progress, select, tabs
- dialog, dropdown-menu, and more...

## 📱 Responsive Design

All components are responsive by default:
- Mobile: Single column layout
- Tablet: Adaptive grid
- Desktop: Full multi-column layout

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

```bash
# Build static export
npm run build

# Deploy the .next folder
```

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

### TypeScript

Modify `tsconfig.json` for stricter type checking:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

## 🎯 Next Steps

1. **Install dependencies**: `npm install`
2. **Start dev server**: `npm run dev`
3. **Create remaining pages**: Resume, Interview, Onboarding
4. **Add API integration**: Use RTK Query for backend calls
5. **Add authentication**: NextAuth.js integration
6. **Deploy**: Vercel or your preferred platform

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Tailwind CSS](https://tailwindcss.com)

## 🆘 Troubleshooting

### Module Not Found

```bash
npm install
```

### TypeScript Errors

```bash
npm run type-check
```

### Style Issues

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## 🎊 Success!

You now have a modern Next.js application with:
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ shadcn/ui for beautiful components
- ✅ Redux Toolkit for state management
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Production-ready structure

**Start developing**: `npm run dev`

Happy coding! 🚀

