import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';  
import CsvUploader from './components/CsvUploader';
import Dashboard from './Dashboard';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="flex justify-center gap-6 mb-8">
        <Link to="/" className="text-blue-600 hover:underline">Upload CSV</Link>
        <Link to="/dashboard" className="text-blue-600 hover:underline">View Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CsvUploader />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;

