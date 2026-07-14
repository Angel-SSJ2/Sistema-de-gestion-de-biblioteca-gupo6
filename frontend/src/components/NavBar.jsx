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
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#444', fontSize: '15px' }}>Dashboard</Link>
        <Link to="/statistics" style={{ textDecoration: 'none', color: '#444', fontSize: '15px' }}>Estadísticas</Link>
        <Link to="/recommendations" style={{ textDecoration: 'none', color: '#444', fontSize: '15px' }}>Recomendaciones</Link>
        <Link to="/summary" style={{ textDecoration: 'none', color: '#444', fontSize: '15px' }}>Resumen</Link>
        <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#e00', cursor: 'pointer', fontSize: '15px' }}>Salir</button>
      </div>
    </nav>
  );
}
