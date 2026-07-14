import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage.jsx';
import StatisticsPage from '../pages/StatisticsPage.jsx';
import RecommendationsPage from '../pages/RecommendationsPage.jsx';
import SummaryPage from '../pages/SummaryPage.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
      <Route path="/recommendations" element={<RecommendationsPage />} />
      <Route path="/summary" element={<SummaryPage />} />
    </Routes>
  );
};

export default AppRoutes;
