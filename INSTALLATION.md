# Quick Installation Guide

## 🚀 Get Started in 2 Minutes

### Step 1: Install Dependencies

```bash
cd /Users/nolanch/Desktop/gdc
npm install
```

This will install all required dependencies including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Redux Toolkit
- Lucide React icons

### Step 2: Install Additional Package

```bash
npm install tailwindcss-animate
```

### Step 3: Start Development Server

```bash
npm run dev
```

### Step 4: Open in Browser

Navigate to: **http://localhost:3000**

## ✅ What You'll See

- **Dashboard** at `/` - Fully functional with Redux state
- **Career Exploration** at `/explore` - Complete with accordion sections
- **Navigation** - Working header with links

## 🎯 Current Status

### ✅ Completed
- [x] Next.js project structure
- [x] TypeScript configuration
- [x] Tailwind CSS setup
- [x] shadcn/ui components integrated
- [x] Redux Toolkit configured
- [x] Dashboard page (fully functional)
- [x] Career Exploration page (fully functional)
- [x] Navigation component
- [x] Redux slices (user, navigation, resume, interview)

### 🚧 To Create (Easy to add)
- [ ] Resume Builder page (`src/app/resume/page.tsx`)
- [ ] Mock Interview page (`src/app/interview/page.tsx`)
- [ ] Onboarding page (`src/app/onboarding/page.tsx`)

## 📦 What's Included

### Pages
1. **Dashboard** (`src/app/page.tsx`)
   - Profile card with progress
   - Quick action cards
   - Development tasks (Redux integrated)
   - Course suggestions

2. **Career Exploration** (`src/app/explore/page.tsx`)
   - Career details
   - Skills assessment
   - Salary information
   - Career progression

### Redux State
- User profile & preferences
- Resume data
- Interview state
- Navigation state

### UI Components (shadcn/ui)
- Button
- Card
- Checkbox
- Input
- Label
- Progress
- Accordion

### Styling
- Dark mode (default)
- Fully responsive
- Custom scrollbars
- Smooth animations

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Lint code
npm run lint
```

## 🎨 Architecture

```
Modern Stack:
├─ Next.js 14 (App Router)
├─ TypeScript (Type safety)
├─ Tailwind CSS (Styling)
├─ shadcn/ui (Components)
├─ Redux Toolkit (State)
└─ Lucide React (Icons)
```

## 🔥 Features

- **Type-Safe**: Full TypeScript support
- **Modern UI**: Beautiful shadcn/ui components
- **State Management**: Redux Toolkit with typed hooks
- **Responsive**: Mobile-first design
- **Dark Mode**: Built-in support
- **Fast**: Next.js App Router performance
- **Scalable**: Professional architecture

## 📝 Adding More Pages

Template for new pages:

```tsx
// src/app/your-page/page.tsx
'use client'

import { useAppSelector, useAppDispatch } from '@/lib/hooks'

export default function YourPage() {
  const user = useAppSelector((state) => state.user)
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Your Page</h1>
      {/* Your content */}
    </div>
  )
}
```

## 🚨 Common Issues

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Module Not Found

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
npm run type-check
```

## 🎊 You're Ready!

Your Next.js application is configured and ready to use!

**Next steps:**
1. Run `npm run dev`
2. Open http://localhost:3000
3. Start coding!

See `README_NEXTJS.md` for complete documentation.

