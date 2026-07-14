import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', backgroundColor: '#ffffff', borderBottom: '1px solid #eee' }}>
      <div style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '18px' }}>📚 Biblioteca central</div>
      <div style={{ display: 'flex', gap: '24px' }}>
        <Link to="/books" style={{ textDecoration: 'none', color: '#444', fontSize: '15px' }}>Libros</Link>
        <Link to="/loans" style={{ textDecoration: 'none', color: '#444', fontSize: '15px' }}>Préstamos</Link>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#444', fontSize: '15px' }}>Estadísticas</Link>
        <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#e00', cursor: 'pointer', fontSize: '15px' }}>Salir</button>
      </div>
    </nav>
  );
}