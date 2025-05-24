import logo from './logo.svg';
import './App.css';
import Nav from './nav.js';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';

function App() {
  const isAdmin = false; // Replace this with logic from auth context or user session

 return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
