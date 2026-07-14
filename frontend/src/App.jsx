import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StatisticsPage from './pages/StatisticsPage.jsx';
import RecommendationsPage from './pages/RecommendationsPage.jsx';
import SummaryPage from './pages/SummaryPage.jsx';
import './App.css'

export default function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', margin: 0, fontFamily: 'Segoe UI, Roboto, sans-serif' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </div>
    </Router>
  );
}
