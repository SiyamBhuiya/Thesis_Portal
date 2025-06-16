// Save user data after login/signup
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get current user from localStorage
export const getUser = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};

// Log out the user
export const logoutUser = () => {
  localStorage.removeItem("user");
};

// Get user's role
export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};
