import React from 'react';
import SalesByDateChart from './components/SalesByDateChart';
import TopProductsChart from './components/TopProductsChart';
import SalesByCountryChart from './components/SalesByCountryChart';
import DownloadCSVButton from './components/DownloadCSVButton';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Sales Analytics Dashboard</h2>

      <div className="mb-10">
        <SalesByDateChart />
      </div>

      <div className="mb-10">
        <TopProductsChart />
      </div>

      <div className="mb-10">
        <SalesByCountryChart />
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        <DownloadCSVButton type="top-products" />
        <DownloadCSVButton type="total-sales-per-day" />
      </div>
    </div>
  );
};

export default Dashboard;
