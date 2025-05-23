import logo from './logo.svg';
import './App.css';
import Nav from './nav.js';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';

function App() {
  const isAdmin = false; // Replace this with logic from auth context or user session

  return (
<Routes>
  {routes.map(({ path, component }) => (
    <Route key={path} path={path} element={component} />
  ))}
</Routes>
  );
}


export default App;
