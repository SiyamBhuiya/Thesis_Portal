import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// Public
import Home from './pages/Home';
import Help from './pages/Help';
import ContactAdmin from './pages/ContactAdmin';
import LoginSignup from './pages/LoginSignup';

// Student
import Dashboard from './pages/Dashboard';
import MySubmissions from './pages/MySubmissions';
import SubmitThesis from './pages/SubmitThesis';
import EditSubmission from './pages/EditSubmission';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';

// Admin
import AllSubmissions from './pages/AdminPages/AllSubmissions';
import StudentManagement from './pages/AdminPages/StudentManagement';
import ReviewSubmissions from './pages/AdminPages/ReviewSubmissions';
import Reports from './pages/AdminPages/Reports';
import Settings from './pages/AdminPages/Settings';

const AppRoutes = ({ isLoggedIn, isAdmin }) => {
  const routes = [
    // Public routes
    { path: '/', element: <Home /> },
    { path: '/help', element: <Help /> },
    { path: '/contact', element: <ContactAdmin /> },
    { path: '/login', element: isLoggedIn ? <Navigate to="/dashboard" /> : <LoginSignup /> },

    // Protected Student/Admin Routes
    ...(isLoggedIn
      ? [
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/my-submissions', element: <MySubmissions /> },
          { path: '/submit', element: <SubmitThesis /> },
          { path: '/edit', element: <EditSubmission /> },
          { path: '/profile', element: <Profile /> },
          { path: '/notifications', element: <Notifications /> }
        ]
      : []),

    // Admin-only routes
    ...(isLoggedIn && isAdmin
      ? [
          { path: '/all-submissions', element: <AllSubmissions /> },
          { path: '/students', element: <StudentManagement /> },
          { path: '/review', element: <ReviewSubmissions /> },
          { path: '/reports', element: <Reports /> },
          { path: '/settings', element: <Settings /> }
        ]
      : []),

    // Catch-all
    { path: '*', element: <Navigate to="/" /> }
  ];

  return useRoutes(routes);
};

export default AppRoutes;