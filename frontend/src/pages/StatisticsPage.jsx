import { useState, useEffect } from 'react';
import Navbar from '../components/NavBar.jsx';
import { getMostLoanedBooks, getLoansByCategory } from '../services/statisticsService.jsx';

export default function StatisticsPage() {
  const [mostLoaned, setMostLoaned] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [loanedData, categoryData] = await Promise.all([
        getMostLoanedBooks(),
        getLoansByCategory()
      ]);
      setMostLoaned(loanedData);
      setByCategory(categoryData);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar las estadísticas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '30px' }}>Estadísticas de la Biblioteca</h2>

        {loading && <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>Cargando estadísticas...</p>}
        {error && (
          <div style={{ textAlign: 'center', padding: '40px', background: '#fff5f5', borderRadius: '10px', border: '1px solid #feb2b2' }}>
            <p style={{ color: '#c53030', marginBottom: '15px' }}>{error}</p>
            <button onClick={fetchData} style={{ padding: '10px 20px', background: '#c53030', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reintentar</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#555', marginBottom: '20px' }}>Libros Más Prestados</h3>
              {mostLoaned.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '40px', background: '#f7fafc', borderRadius: '10px', color: '#718096' }}>No hay datos de préstamos disponibles</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                  {mostLoaned.map((book, index) => (
                    <div key={book._id || index} style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'relative', paddingLeft: '50px' }}>
                      <span style={{ position: 'absolute', left: '15px', top: '20px', fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>#{index + 1}</span>
                      <h4 style={{ marginBottom: '5px' }}>{book.title}</h4>
                      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '8px' }}>{book.author}</p>
                      <p style={{ color: '#667eea', fontWeight: 600 }}>{book.loanCount} préstamos</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h3 style={{ color: '#555', marginBottom: '20px' }}>Préstamos por Categoría</h3>
              {byCategory.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '40px', background: '#f7fafc', borderRadius: '10px', color: '#718096' }}>No hay categorías con préstamos</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {byCategory.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                      <span style={{ fontWeight: 500 }}>{item.category}</span>
                      <span style={{ color: '#667eea', fontWeight: 600 }}>{item.count} préstamos</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
