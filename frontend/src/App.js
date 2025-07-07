import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes';

function App() {
  // Force logged in for testing until backend is ready
  const loggedIn = true;
  const isAdmin = false;

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={loggedIn} isAdmin={isAdmin} />
      <AppRoutes isLoggedIn={loggedIn} isAdmin={isAdmin} />
    </BrowserRouter>
  );
}

export default App;
