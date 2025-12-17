# Place-Mate ☕

A modern placement tracking platform designed for students to monitor their daily progress during the placement season. Built with a warm coffee-themed interface featuring elegant brown hues.

## 📋 Project Overview

Place-Mate helps students stay organized during their placement journey by providing tools to track applications, prepare for interviews, manage resources, and visualize their progress through an intuitive dashboard.

## 🏗️ Architecture

- **Frontend Framework**: React.js with React Router for navigation
- **Styling**: Tailwind CSS with custom coffee-themed color palette
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **State Management**: React Context API
- **Build Tool**: Create React App

## 📁 Project Structure

```
place-mate-clean/
├── public/                  # Static files
├── src/
│   ├── assets/             # Images, icons, and static resources
│   ├── components/         # Reusable React components
│   │   ├── ChartCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── RecentActivityCard.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SkillProgress.jsx
│   │   ├── StatCard.jsx
│   │   └── UpcomingTestCard.jsx
│   ├── context/            # React Context for state management
│   │   └── AuthContext.js
│   ├── firebase/           # Firebase configuration and operations
│   │   ├── firebase.js
│   │   ├── firestore.js
│   │   ├── firestoreOps.js
│   │   └── dashboardOps.js
│   ├── layout/             # Layout components
│   │   └── MainLayout.jsx
│   ├── pages/              # Page components
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── Achievements.jsx
│   │   ├── Applications.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Preparation.jsx
│   │   ├── Resources.jsx
│   │   └── Timeline.jsx
│   ├── App.js              # Main application component
│   ├── index.js            # Application entry point
│   ├── index.css           # Global styles
│   └── theme.js            # Theme configuration
├── .gitignore
├── package.json
├── tailwind.config.js      # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Healer3504/Place-Mate.git
   cd place-mate-clean
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase configuration
   - Update `src/firebase/firebase.js` with your credentials

4. **Start the development server**
   ```bash
   npm start
   ```

## 🖥️ Running the Application

```bash
# Development mode
npm start

# Build for production
npm run build

# Run tests
npm test
```

The application will open at `http://localhost:3000`

## 💡 Usage

1. **Sign Up/Login**: Create an account or log in with existing credentials
2. **Dashboard**: View your placement statistics and recent activities
3. **Applications**: Track all your job applications in one place
4. **Preparation**: Access preparation materials and track your progress
5. **Timeline**: Visualize your placement journey chronologically
6. **Resources**: Browse and organize placement resources
7. **Achievements**: Celebrate your milestones and successes

## ✨ Key Features

- **📊 Dashboard Analytics**: Real-time visualization of your placement progress
- **📝 Application Tracking**: Manage job applications with status updates
- **📚 Resource Management**: Organize study materials and resources
- **⏱️ Timeline View**: Track your placement journey over time
- **🎯 Preparation Tools**: Monitor your preparation progress
- **🏆 Achievement System**: Track milestones and celebrate wins
- **🔐 Secure Authentication**: Firebase-powered user authentication
- **☕ Coffee Theme**: Warm, aesthetic brown color palette for comfortable viewing

## 🛠️ Technology Stack

- **React.js** - Frontend library
- **React Router DOM** - Navigation and routing
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase** - Authentication and database
- **PostCSS** - CSS processing

## 💻 System Requirements

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **Active internet connection** for Firebase services

## 🔧 Troubleshooting

### Common Issues

**Issue**: `npm start` fails
```bash
# Solution: Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Firebase connection errors
- Verify your Firebase configuration in `src/firebase/firebase.js`
- Check Firebase project settings and ensure all services are enabled
- Confirm API keys are correct

**Issue**: Styling not loading
```bash
# Rebuild Tailwind CSS
npm run build:css
```

**Issue**: Authentication not working
- Check Firebase Authentication is enabled in Firebase Console
- Verify email/password sign-in method is activated
- Clear browser cache and cookies

---

**Note**: This project is currently under development. Some features may be incomplete or subject to change.

**Maintained by**: [Healer3504](https://github.com/Healer3504)

**License**: MIT
