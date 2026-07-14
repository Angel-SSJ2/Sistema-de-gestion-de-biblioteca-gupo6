import  { useState } from 'react';
import { loginMock } from '.../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      // Llamamos a la función de mentira. Recuerda usar: admin@biblioteca.com y 123456
      const data = await loginMock(email, password);
      
      // Guardamos el token en el navegador para usarlo en el Sprint 2
      localStorage.setItem('token', data.token);
      
      setSuccess(`¡Bienvenido, ${data.user.name}! Token guardado.`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Correo Electrónico:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Ingresar
        </button>
      </form>
      
      {error && <p style={{ marginTop: '15px', color: 'red' }}>{error}</p>}
      {success && <p style={{ marginTop: '15px', color: 'green' }}>{success}</p>}
    </div>
  );
}