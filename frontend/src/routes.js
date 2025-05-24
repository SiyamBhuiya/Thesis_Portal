import React from 'react';
import { useRoutes } from 'react-router-dom';
// Placeholder components – replace with actual components
const Dashboard = () => <div><h2>Dashboard</h2></div>;
const SubmitThesis = () => <div><h2>Submit Thesis</h2></div>;
const EditSubmission = () => <div><h2>Edit Submission</h2></div>;
const MySubmissions = () => <div><h2>My Submissions</h2></div>;
const Profile = () => <div><h2>Profile</h2></div>;
const AllSubmissions = () => <div><h2>All Submissions</h2></div>;
const StudentManagement = () => <div><h2>Student Management</h2></div>;
const ReviewSubmissions = () => <div><h2>Review Submissions</h2></div>;
const Reports = () => <div><h2>Reports/Export</h2></div>;
const Settings = () => <div><h2>Settings</h2></div>;
const Notifications = () => <div><h2>Notifications</h2></div>;
const Help = () => <div><h2>Help/FAQ</h2></div>;
const ContactAdmin = () => <div><h2>Contact Admin</h2></div>;
const Logout = () => <div><h2>Logout</h2></div>;

// Exporting route definitions for easier import in App.js or Router setup
const routes = [
  // Shared Routes
  { path: '/dashboard', component: <Dashboard /> },
  { path: '/notifications', component: <Notifications /> },
  { path: '/help', component: <Help /> },
  { path: '/contact', component: <ContactAdmin /> },
  { path: '/logout', component: <Logout /> },

  // Student Routes
  { path: '/submit', component: <SubmitThesis /> },
  { path: '/edit', component: <EditSubmission /> },
  { path: '/my-submissions', component: <MySubmissions /> },
  { path: '/profile', component: <Profile /> },

  // Admin Routes
  { path: '/all-submissions', component: <AllSubmissions /> },
  { path: '/students', component: <StudentManagement /> },
  { path: '/review', component: <ReviewSubmissions /> },
  { path: '/reports', component: <Reports /> },
  { path: '/settings', component: <Settings /> }
];

export default function AppRoutes(){
return useRoutes(routes);
}
