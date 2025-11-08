# Career Assistant - Your Personal Career Guide

A comprehensive career guidance platform that helps students and professionals explore careers, build resumes, practice interviews, and track their development journey.

## 🌟 Features

### 1. **Personalized Dashboard**
- Track your career development progress
- View recommended career paths based on your profile
- Access suggested courses and learning paths
- Manage your development tasks and goals
- Quick access to all features

### 2. **Career Exploration**
- Detailed information about various career paths
- Key responsibilities and required skills
- Salary ranges and market insights
- Career progression roadmaps
- Interactive skill assessment

### 3. **AI-Powered Resume Builder**
- Multiple professional templates
- Live resume preview as you type
- Export to PDF functionality
- Accordion-style form sections for easy navigation
- Save progress automatically to local storage

### 4. **Mock Interview Simulator**
- Practice behavioral, technical, and case interviews
- Configurable difficulty levels
- Real-time AI feedback on your answers
- Track interview progress
- Score breakdown with improvement suggestions
- STAR method guidance

### 5. **Development Planning**
- Set and track career goals
- Course recommendations
- Skill gap analysis
- Progress tracking

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Internet connection (for CDN resources)

### Installation

1. **Clone or download the project:**
   ```bash
   cd gdc
   ```

2. **Open the application:**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python 3
     python3 -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server -p 8000
     ```
   - Then navigate to `http://localhost:8000`

That's it! No build process or dependencies to install.

## 📁 Project Structure

```
gdc/
├── index.html              # Main HTML file with navigation
├── app.js                  # Core application logic and routing
├── styles.css              # Custom styles and animations
├── README.md              # This file
└── [original_folders]/    # Original landing page examples
    ├── ai-powered_resume_builder_tool/
    ├── career_exploration_page/
    ├── careerbot_ai_welcome_&_onboarding_screen/
    ├── mock_interview_simulator_with_ai_feedback/
    └── student's_personalized_career_dashboard/
```

## 🎨 Features & Functionality

### Navigation
- Click on navigation links to switch between different sections
- Responsive design for mobile and desktop
- Smooth page transitions
- Active link highlighting

### Dashboard
- **Profile Card**: Shows completion percentage and quick edit access
- **Quick Actions**: Fast access to main features with gradient cards
- **Career Recommendations**: AI-suggested career paths
- **Development Plan**: Track tasks with interactive checkboxes
- **Course Suggestions**: Personalized learning recommendations

### Career Exploration
- **Expandable Sections**: Click to expand/collapse information
- **Skill Pills**: Visual representation of owned vs. needed skills
- **Salary Visualization**: Interactive salary range display
- **Career Timeline**: Visual progression path

### Resume Builder
- **Left Panel**: Accordion-style form sections
  - Contact Information
  - Professional Summary
  - Work Experience
  - Education
  - Skills
- **Right Panel**: Live preview with template selection
- **Real-time Updates**: Changes reflect immediately in preview
- **PDF Export**: Download your resume (button ready for implementation)

### Mock Interview
- **Setup Modal**: Configure interview type, difficulty, and input method
- **Question Display**: Clear presentation of interview questions
- **Answer Input**: Type or record your responses
- **Live Feedback**: Receive scores and improvement suggestions
- **Progress Tracking**: Visual progress bar through interview questions

## 💾 Data Persistence

The application uses browser's `localStorage` to save:
- User profile information
- Development task progress
- Profile completion percentage
- Resume data

Data persists between sessions automatically.

## 🎯 Usage Tips

### For Students:
1. Start by exploring career paths in the "Explore Careers" section
2. Use the Resume Builder to create your first professional resume
3. Practice with Mock Interviews before real opportunities
4. Track your progress in the Dashboard

### For Professionals:
1. Update your profile with current goals
2. Take Mock Interviews to prepare for career transitions
3. Use Career Exploration to discover advancement opportunities
4. Build updated resumes for different roles

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Vanilla JS with class-based architecture
- **Tailwind CSS**: Via CDN for rapid styling
- **Material Symbols**: Icon library
- **Google Fonts**: Manrope font family

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Key Features
- **Single Page Application (SPA)**: Dynamic content loading without page refreshes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode**: Full dark mode support (default)
- **Smooth Animations**: CSS transitions and animations
- **Local Storage**: Client-side data persistence

## 🔧 Customization

### Changing Theme Colors
Edit the Tailwind configuration in `index.html`:
```javascript
colors: {
    "primary": "#2b8cee",  // Change this to your color
    "background-light": "#f6f7f8",
    "background-dark": "#101922",
}
```

### Adding New Career Paths
Modify the career data in `app.js` within the `getCareerCards()` method.

### Customizing User Data
Default user data is in the `loadUserData()` method in `app.js`.

## 🚧 Future Enhancements

Potential features to add:
- Backend API integration for real AI feedback
- User authentication and cloud storage
- More resume templates
- Video recording for mock interviews
- Networking features to connect with mentors
- Course enrollment integration
- Job board integration
- Calendar for scheduling goals

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your needs!

## 💬 Support

For questions or issues:
1. Check the code comments in `app.js`
2. Review the browser console for any errors
3. Ensure you're using a modern browser

## 🎓 Educational Purpose

This project demonstrates:
- Single Page Application architecture
- Component-based design patterns
- Responsive web design
- Interactive UI/UX
- Client-side routing
- State management with vanilla JavaScript
- Local storage usage

---

**Built with ❤️ for aspiring professionals and career seekers**

Enjoy exploring your career path! 🚀

