import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Books from './pages/Books';
import Loans from './pages/Loans';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', margin: 0, fontFamily: 'Segoe UI, Roboto, sans-serif' }}>
        <Routes>
          {/* Redirección por defecto al Login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Rutas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas Privadas / Funcionales */}
          <Route path="/books" element={<Books />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}