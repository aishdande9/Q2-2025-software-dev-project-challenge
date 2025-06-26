import React from 'react';
import CsvUploader from './components/CsvUploader';
import './index.css'; 

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">E-Commerce Sales Dashboard</h1>
      <CsvUploader />
    </div>
  );
}

export default App;
