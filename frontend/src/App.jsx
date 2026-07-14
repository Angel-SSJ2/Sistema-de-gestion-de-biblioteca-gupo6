import Login from '../../Login';
import Register from '../../Register';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>📚 Sistema de Biblioteca - Frontend Inicial</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <Register />
        <Login />
      </div>
    </div>
  );
}

export default App;