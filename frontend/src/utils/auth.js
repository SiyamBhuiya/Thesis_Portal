// Get the token from localStorage (or cookie)
export function getToken() {
  return localStorage.getItem('token');
}

// Check if user is logged in
export function isLoggedIn() {
  return !!getToken();
}

// Get the user role from the token payload
export function getUserRole() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null; // "admin" or "student"
  } catch (err) {
    console.error('Error decoding token', err);
    return null;
  }
}