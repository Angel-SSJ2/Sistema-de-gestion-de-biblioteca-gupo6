import { useState, useEffect } from 'react';
import Navbar from '../components/NavBar.jsx';
import { getLibrarySummary } from '../services/summaryService.jsx';

export default function SummaryPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLibrarySummary();
      setSummary(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar el resumen');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '30px' }}>Resumen de la Biblioteca</h2>

        {loading && <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>Cargando resumen...</p>}
        {error && (
          <div style={{ textAlign: 'center', padding: '40px', background: '#fff5f5', borderRadius: '10px', border: '1px solid #feb2b2' }}>
            <p style={{ color: '#c53030', marginBottom: '15px' }}>{error}</p>
            <button onClick={fetchData} style={{ padding: '10px 20px', background: '#c53030', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reintentar</button>
          </div>
        )}

        {!loading && !error && summary && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <p style={{ fontSize: '0.9rem', color: '#667eea', textTransform: 'uppercase', marginBottom: '8px' }}>Total de Libros</p>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{summary.totalBooks}</p>
              </div>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #28a745' }}>
                <p style={{ fontSize: '0.9rem', color: '#28a745', textTransform: 'uppercase', marginBottom: '8px' }}>Disponibles</p>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{summary.availableBooks}</p>
              </div>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #dc3545' }}>
                <p style={{ fontSize: '0.9rem', color: '#dc3545', textTransform: 'uppercase', marginBottom: '8px' }}>Prestados</p>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{summary.loanedBooks}</p>
              </div>
            </div>

            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#555', marginBottom: '20px' }}>Categorías Existentes</h3>
              {summary.categories.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '40px', background: '#f7fafc', borderRadius: '10px', color: '#718096' }}>No hay categorías registradas</p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {summary.categories.map((cat, index) => (
                    <span key={index} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem' }}>{cat}</span>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h3 style={{ color: '#555', marginBottom: '20px' }}>Libro Más Prestado</h3>
              {summary.mostLoanedBook ? (
                <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center', borderLeft: '4px solid #667eea' }}>
                  <h4 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{summary.mostLoanedBook.title}</h4>
                  <p style={{ color: '#666', marginBottom: '8px' }}>{summary.mostLoanedBook.author}</p>
                  <p style={{ color: '#667eea', fontWeight: 600, fontSize: '1.1rem' }}>{summary.mostLoanedBook.loanCount} préstamos</p>
                </div>
              ) : (
                <p style={{ textAlign: 'center', padding: '40px', background: '#f7fafc', borderRadius: '10px', color: '#718096' }}>No hay datos de préstamos disponibles</p>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
