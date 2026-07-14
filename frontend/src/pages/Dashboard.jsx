import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar.jsx';
import Loading from '../components/Loading.jsx';
import { getMostLoanedBooks, getLoansByCategory } from '../services/statisticsService.jsx';
import { getLibrarySummary } from '../services/summaryService.jsx';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [mostLoaned, setMostLoaned] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [summaryData, loanedData, categoryData] = await Promise.all([
        getLibrarySummary(),
        getMostLoanedBooks(),
        getLoansByCategory()
      ]);
      setSummary(summaryData);
      setMostLoaned(loanedData);
      setByCategory(categoryData);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar el dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '30px' }}>📊 Dashboard de Biblioteca</h2>

        {loading && <Loading message="Cargando dashboard..." />}
        {error && (
          <div style={{ textAlign: 'center', padding: '40px', background: '#fff5f5', borderRadius: '10px', border: '1px solid #feb2b2' }}>
            <p style={{ color: '#c53030', marginBottom: '15px' }}>{error}</p>
            <button onClick={fetchData} style={{ padding: '10px 20px', background: '#c53030', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reintentar</button>
          </div>
        )}

        {!loading && !error && (
          <>
            {summary && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <p style={{ fontSize: '0.9rem', color: '#667eea', textTransform: 'uppercase', marginBottom: '8px' }}>Total Libros</p>
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
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', marginBottom: '30px' }}>
              <div style={{ background: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.1rem' }}>Libros Más Prestados</h3>
                  <Link to="/statistics" style={{ color: '#667eea', textDecoration: 'none', fontSize: '0.9rem' }}>Ver todos</Link>
                </div>
                {mostLoaned.length === 0 ? (
                  <p style={{ textAlign: 'center', padding: '40px', background: '#f7fafc', borderRadius: '10px', color: '#718096' }}>No hay datos de préstamos</p>
                ) : (
                  mostLoaned.slice(0, 3).map((book, index) => (
                    <div key={book._id || index} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '10px' }}>
                      <span style={{ fontWeight: 'bold', color: '#667eea', fontSize: '1.1rem', minWidth: '30px' }}>#{index + 1}</span>
                      <div>
                        <h4 style={{ color: '#333', marginBottom: '3px' }}>{book.title}</h4>
                        <p style={{ color: '#666', fontSize: '0.85rem' }}>{book.loanCount} préstamos</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div style={{ background: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.1rem' }}>Préstamos por Categoría</h3>
                  <Link to="/statistics" style={{ color: '#667eea', textDecoration: 'none', fontSize: '0.9rem' }}>Ver todos</Link>
                </div>
                {byCategory.length === 0 ? (
                  <p style={{ textAlign: 'center', padding: '40px', background: '#f7fafc', borderRadius: '10px', color: '#718096' }}>No hay categorías con préstamos</p>
                ) : (
                  byCategory.slice(0, 5).map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 500 }}>{item.category}</span>
                      <span style={{ color: '#667eea', fontWeight: 600 }}>{item.count}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <Link to="/recommendations" style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textDecoration: 'none', borderRadius: '8px' }}>Ver Recomendaciones</Link>
              <Link to="/summary" style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textDecoration: 'none', borderRadius: '8px' }}>Ver Resumen Completo</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
