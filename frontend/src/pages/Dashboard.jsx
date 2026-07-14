import Navbar from '/src/components/Navbar';

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h2>📊 Estadísticas y Recomendaciones</h2>
        <p style={{ color: '#666' }}>Aquí se mostrarán los resúmenes y gráficos del sistema.</p>
      </div>
    </div>
  );
}