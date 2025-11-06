# Quick Start Guide

Get up and running with Career Assistant in under 2 minutes!

## 🚀 Fastest Way to Start

### Option 1: Open Directly in Browser
1. Double-click on `onboarding.html` to start the first-time setup
   - OR double-click on `index.html` to go straight to the dashboard

That's it! The application runs entirely in your browser.

### Option 2: Use a Local Server (Recommended)

**Using Python (Built into Mac/Linux):**
```bash
cd /Users/nolanch/Desktop/gdc
python3 -m http.server 8000
```
Then open: http://localhost:8000/onboarding.html

**Using Node.js:**
```bash
cd /Users/nolanch/Desktop/gdc
npx http-server -p 8000
```
Then open: http://localhost:8000/onboarding.html

## 📋 First Time Setup

1. **Onboarding Flow** (Optional, can skip):
   - Step 1: Enter your academic background
   - Step 2: Select career interests
   - Step 3: Add skills and experience
   - Click "Get Started"

2. **Main Application**:
   - Explore the Dashboard
   - Try the Resume Builder
   - Practice with Mock Interviews
   - Browse Career Paths

## 🎯 Key Features to Try

### 1. Dashboard (Homepage)
- View your profile completion
- See recommended career paths
- Track development tasks (check/uncheck items)
- Click quick action cards to navigate

### 2. Resume Builder
- Click "Resume Builder" in navigation
- Expand "Contact Information" section
- Type in the form fields
- Watch the preview update in real-time
- Try different templates at the top

### 3. Mock Interview
- Click "Mock Interview" in navigation
- Configure interview settings in the modal
- Click "Start Interview"
- Type your answer and click "Submit"
- Review AI feedback
- Click "Next Question"

### 4. Career Exploration
- Click "Explore Careers" in navigation
- Expand different sections to learn about roles
- Click skill pills to see what you have/need
- View salary ranges and career progression

## 💾 Data Storage

All your data is saved automatically to your browser's local storage:
- Profile information
- Resume content
- Development task progress
- Onboarding preferences

**To reset everything:**
```javascript
// Open browser console (F12) and run:
localStorage.clear();
// Then refresh the page
```

## 🎨 Switching Themes

The app defaults to dark mode. To toggle:
1. Open browser developer tools (F12)
2. In the console, run:
```javascript
document.documentElement.classList.toggle('dark');
```

Or manually edit `index.html` line 3:
- Dark mode: `<html class="dark" lang="en">`
- Light mode: `<html lang="en">`

## 🔧 Troubleshooting

**Problem: Styles look broken**
- Solution: Make sure you have internet connection (Tailwind CSS loads from CDN)

**Problem: Data not saving**
- Solution: Check if cookies/local storage are enabled in your browser

**Problem: Icons not showing**
- Solution: Verify internet connection (Material Symbols load from Google Fonts)

**Problem: Onboarding keeps showing**
- Solution: Open console and run `localStorage.setItem('onboardingCompleted', 'true')`

## 📱 Mobile & Responsive

The app is fully responsive! Try it on:
- Desktop (best experience)
- Tablet (optimized layout)
- Mobile (simplified navigation)

## ⌨️ Keyboard Shortcuts

While no built-in shortcuts exist, you can:
- Use Tab to navigate forms
- Press Enter to submit forms
- Use Escape to close modals (coming soon)

## 🎓 Demo Flow

Want to see everything quickly?

1. **Start**: Open `index.html` (skip onboarding)
2. **Dashboard**: See overview, check off a task
3. **Career Exploration**: Click "Product Manager" card
4. **Resume Builder**: Click nav link, edit contact info
5. **Mock Interview**: Click nav link, start interview, submit answer

Takes about 3 minutes to see all features!

## 📞 Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review code comments in `app.js` for technical details
- Open browser console (F12) to see any error messages

## 🌟 Pro Tips

1. **Customize your profile**: Update user data in Dashboard
2. **Track progress**: Use development tasks as a to-do list
3. **Practice interviews**: Do multiple mock interviews to improve
4. **Build your resume**: Complete all sections for a professional resume
5. **Explore careers**: Learn about multiple paths before committing

---

**Ready to start your career journey? Open `onboarding.html` now! 🚀**

