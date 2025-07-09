import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileAlt,
  faEdit,
  faFolderOpen,
  faUser,
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
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ isAdmin, isLoggedIn }) => {
  const [search, setSearch] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, read: false, text: "1 new guest account(s) created." },
    { id: 2, read: false, text: "3 new lead(s) in the system." },
    { id: 3, read: true, text: "5 new task(s)." },
  ]);

  const notifRef = useRef(null);
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read: true,
      }))
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menu = (isAdmin
    ? [
        { name: "Home", path: "/", icon: faHome },
        { name: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
        { name: "All Submissions", path: "/all-submissions", icon: faListAlt },
        { name: "Student Management", path: "/students", icon: faUsers },
        { name: "Review Submissions", path: "/review", icon: faCheckCircle },
        { name: "Reports/Export", path: "/reports", icon: faChartBar },
        { name: "Settings", path: "/settings", icon: faCogs },
        { name: "Help/FAQ", path: "/help", icon: faQuestionCircle },
        { name: "Contact Admin", path: "/contact", icon: faEnvelope },
        { name: "Logout", path: "/logout", icon: faSignOutAlt },
      ]
    : [
        { name: "Home", path: "/", icon: faHome },
        isLoggedIn && { name: "Dashboard", path: "/dashboard", icon: faTachometerAlt },
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
        { name: "Help/FAQ", path: "/help", icon: faQuestionCircle },
        { name: "Contact Admin", path: "/contact", icon: faEnvelope },
        !isLoggedIn && { name: "Login/Signup", path: "/login", icon: faSignInAlt },
        isLoggedIn && { name: "Logout", path: "/logout", icon: faSignOutAlt },
      ]
  ).filter(Boolean);

  return (
    <nav className="navbar">
      <ul className="nav-menu">
        {menu.map(({ name, path, icon, subMenu }) => (
          <li key={name} className={subMenu ? "nav-item has-dropdown" : "nav-item"}>
            {subMenu ? (
              <>
                <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}> 
                  <FontAwesomeIcon icon={icon} className="nav-icon" /> {name}
                </NavLink>
                <ul className="dropdown-menu">
                  {subMenu.map(({ name: subName, path: subPath, icon: subIcon }) => (
                    <li key={subName}>
                      <NavLink to={subPath} className={({ isActive }) => (isActive ? "active" : "")}> 
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
              <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}> 
                <FontAwesomeIcon icon={icon} className="nav-icon" /> {name}
              </NavLink>
            )}
          </li>
        ))}

        <li className="nav-item notification-item" ref={notifRef}>
          <div className="notification-wrapper" onClick={() => setShowNotif(!showNotif)}>
            <FontAwesomeIcon icon={faBell} className="nav-icon" />
            <span className="notif-label">Notifications</span>
            {unreadCount > 0 && <span className="notif-dot" />} 
          </div>

          {showNotif && (
            <div className="notification-panel">
              <div className="notif-header">
                <h4>Notifications</h4>
                <button className="mark-read-btn" onClick={markAllAsRead}>
                  Mark all as read
                </button>
              </div>
              <ul>
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className={n.read ? "notification-read" : "notification-unread"}
                    onClick={() => {
                      setShowNotif(false);
                      setNotifications((prev) =>
                        prev.map((notif) =>
                          notif.id === n.id ? { ...notif, read: true } : notif
                        )
                      );
                      navigate(`/notifications/${n.id}`);
                    }}
                  >
                    {n.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>

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
