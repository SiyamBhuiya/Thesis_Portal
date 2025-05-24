import React from 'react';
import '../styles/navbar.css';
import MenuItem from './MenuItem';

const studentMenu = [
  { name: 'Home', path: '/dashboard' },
  { name: 'Submit Thesis', path: '/submit' },
  { name: 'Edit Submission', path: '/edit' },
  { name: 'My Submissions', path: '/my-submissions' },
  { name: 'Profile', path: '/profile' },
  { name: 'Notifications', path: '/notifications' },
  { name: 'Help/FAQ', path: '/help' },
  { name: 'Contact Admin', path: '/contact' },
  { name: 'Logout', path: '/logout' }
];

const adminMenu = [
  { name: 'Home', path: '/dashboard' },
  { name: 'All Submissions', path: '/all-submissions' },
  { name: 'Student Management', path: '/students' },
  { name: 'Review Submissions', path: '/review' },
  { name: 'Reports/Export', path: '/reports' },
  { name: 'Settings', path: '/settings' },
  { name: 'Notifications', path: '/notifications' },
  { name: 'Help/FAQ', path: '/help' },
  { name: 'Contact Admin', path: '/contact' },
  { name: 'Logout', path: '/logout' }
];

const Navbar = ({ isAdmin }) => {
  const menu = isAdmin ? adminMenu : studentMenu;

  return (
    <nav className="navbar">
      <ul>
        {menu.map((item) => (
          <MenuItem key={item.name} path={item.path} name={item.name} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
