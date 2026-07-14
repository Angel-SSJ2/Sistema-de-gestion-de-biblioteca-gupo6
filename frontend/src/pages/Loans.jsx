import Navbar from '/src/components/Navbar';

export default function Loans() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h2>🤝 Préstamos y Devoluciones</h2>
        <p style={{ color: '#666' }}>Aquí se gestionará la disponibilidad y el registro de salidas de libros.</p>
      </div>
    </div>
  );
}