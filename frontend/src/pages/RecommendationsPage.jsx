import { useState } from 'react';
import Navbar from '../components/NavBar.jsx';
import { getRecommendations } from '../services/recommendationService.jsx';

export default function RecommendationsPage() {
  const [category, setCategory] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!category.trim()) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const data = await getRecommendations(category.trim());
      setRecommendations(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener recomendaciones');
      setRecommendations(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '30px' }}>Recomendaciones de Libros</h2>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ingresa una categoría (ej: ficción, ciencia, historia)"
            style={{ flex: 1, padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
          />
          <button type="submit" disabled={loading} style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            Buscar
          </button>
        </form>

        {loading && <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>Buscando recomendaciones...</p>}
        {error && (
          <div style={{ textAlign: 'center', padding: '40px', background: '#fff5f5', borderRadius: '10px', border: '1px solid #feb2b2' }}>
            <p style={{ color: '#c53030' }}>{error}</p>
          </div>
        )}

        {!loading && !error && searched && recommendations && (
          <div>
            <h3 style={{ color: '#555', marginBottom: '10px' }}>Categoría: {recommendations.category}</h3>
            <p style={{ color: '#666', marginBottom: '20px' }}>{recommendations.count} libros encontrados</p>

            {recommendations.books.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '40px', background: '#f7fafc', borderRadius: '10px', color: '#718096' }}>
                No hay libros disponibles en la categoría "{category}"
              </p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {recommendations.books.map((book) => (
                  <div key={book._id} style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <h4 style={{ marginBottom: '8px' }}>{book.title}</h4>
                    <p style={{ color: '#666', marginBottom: '10px' }}>{book.author}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
