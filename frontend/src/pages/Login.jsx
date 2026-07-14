import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginMock } from '../services/authService.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const data = await loginMock(email, password);
      localStorage.setItem('token', data.token);
      setSuccess(`¡Bienvenido, ${data.user.name}! Redireccionando...`);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', width: '100%', maxWidth: '380px' }}>
        <h2 style={{ textAlign: 'center', color: '#1a1a1a', marginBottom: '8px', fontWeight: '600' }}>Iniciar Sesión</h2>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '24px' }}>Gestiona tu catálogo de biblioteca</p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#444' }}>Correo Electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box', fontSize: '14px' }} />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#444' }}>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box', fontSize: '14px' }} />
          </div>
          
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s' }}>
            Ingresar
          </button>
        </form>
        
        {error && <p style={{ marginTop: '16px', color: '#e00', fontSize: '14px', textAlign: 'center' }}>{error}</p>}
        {success && <p style={{ marginTop: '16px', color: '#0070f3', fontSize: '14px', textAlign: 'center' }}>{success}</p>}
        
        <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
          ¿No tienes cuenta? <Link to="/register" style={{ color: '#0070f3', textDecoration: 'none' }}>Regístrate</Link>
        </p>
      </div>
    </div>
  );
}