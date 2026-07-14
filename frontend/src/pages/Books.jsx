import Navbar from '/src/components/Navbar';

export default function Books() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h2>📚 Gestión de Catálogo de Libros</h2>
        <p style={{ color: '#666' }}>Aquí irá el CRUD para registrar, editar y eliminar libros.</p>
      </div>
    </div>
  );
}