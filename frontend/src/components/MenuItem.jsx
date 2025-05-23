import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * MenuItem component renders a single navigation item.
 *
 * Props:
 * - path: string (route path)
 * - name: string (display name for the link)
 */
const MenuItem = ({ path, name }) => (
  <li>
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? 'active' : '')}
    >
      {name}
    </NavLink>
  </li>
);

export default MenuItem;
