import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileAlt,
  faEdit,
  faFolderOpen,
  faUser,
  faBell,
  faQuestionCircle,
  faEnvelope,
  faSignOutAlt,
  faListAlt,
  faUsers,
  faCheckCircle,
  faChartBar,
  faCogs,
  faSignInAlt,
  faTachometerAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ isAdmin, isLoggedIn }) => {
  const [search, setSearch] = useState("");

  const studentMenu = [
    { name: "Home", path: "/", icon: faHome },
    isLoggedIn && {
      name: "Dashboard",
      path: "/dashboard",
      icon: faTachometerAlt,
    },
    isLoggedIn && {
      name: "My Submissions",
      path: "/my-submissions",
      icon: faFolderOpen,
      subMenu: [
        { name: "Submit Thesis", path: "/submit", icon: faFileAlt },
        { name: "Edit Submission", path: "/edit", icon: faEdit },
      ],
    },
    isLoggedIn && { name: "Profile", path: "/profile", icon: faUser },
    { name: "Notifications", path: "/notifications", icon: faBell },
    { name: "Help/FAQ", path: "/help", icon: faQuestionCircle },
    { name: "Contact Admin", path: "/contact", icon: faEnvelope },
    !isLoggedIn && { name: "Login/Signup", path: "/login", icon: faSignInAlt },
    isLoggedIn && { name: "Logout", path: "/logout", icon: faSignOutAlt },
  ].filter(Boolean);

  const adminMenu = [
    { name: "Home", path: "/", icon: faHome },
    { name: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
    { name: "All Submissions", path: "/all-submissions", icon: faListAlt },
    { name: "Student Management", path: "/students", icon: faUsers },
    { name: "Review Submissions", path: "/review", icon: faCheckCircle },
    { name: "Reports/Export", path: "/reports", icon: faChartBar },
    { name: "Settings", path: "/settings", icon: faCogs },
    { name: "Notifications", path: "/notifications", icon: faBell },
    { name: "Help/FAQ", path: "/help", icon: faQuestionCircle },
    { name: "Contact Admin", path: "/contact", icon: faEnvelope },
    { name: "Logout", path: "/logout", icon: faSignOutAlt },
  ];
  const navigate = useNavigate();

const handleLogout = () => {
  logoutUser();        // clear localStorage or session
  navigate("/login");       // redirect to login page
};

  const menu = isAdmin ? adminMenu : studentMenu;

  return (
    <nav className="navbar">
      <ul className="nav-menu">
        {menu.map(({ name, path, icon, subMenu }) => (
          <li
            key={name}
            className={subMenu ? "nav-item has-dropdown" : "nav-item"}
          >
{subMenu ? (
  <>
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? "active" : "")}
    >
      <FontAwesomeIcon icon={icon} className="nav-icon" /> {name}
    </NavLink>
    <ul className="dropdown-menu">
      {subMenu.map(({ name: subName, path: subPath, icon: subIcon }) => (
        <li key={subName}>
          <NavLink
            to={subPath}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FontAwesomeIcon icon={subIcon} className="nav-icon" /> {subName}
          </NavLink>
        </li>
      ))}
    </ul>
  </>
) : name === "Logout" ? (
  <span onClick={handleLogout} className="nav-link clickable">
    <FontAwesomeIcon icon={icon} className="nav-icon" /> {name}
  </span>
) : (
  <NavLink
    to={path}
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    <FontAwesomeIcon icon={icon} className="nav-icon" /> {name}
  </NavLink>
)}

            {subMenu && (
              <ul className="dropdown-menu">
                {subMenu.map(
                  ({ name: subName, path: subPath, icon: subIcon }) => (
                    <li key={subName}>
                      <NavLink
                        to={subPath}
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <FontAwesomeIcon icon={subIcon} className="nav-icon" />{" "}
                        {subName}
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            )}
          </li>
        ))}
        <li className="search-box">
          <div className="search-container">
            {search.length === 0 && (
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            )}
            <input
              type="text"
              placeholder="Search..."
              value={search}
              className="animated-search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
