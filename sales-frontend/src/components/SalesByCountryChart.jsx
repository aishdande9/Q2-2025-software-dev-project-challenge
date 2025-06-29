import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c', '#d0ed57', '#8dd1e1', '#ff8042', '#bb99ff', '#66cccc'];

const SalesByCountryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/analytics/sales-by-country')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching sales by country:', err);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h3 className="text-xl font-semibold mb-4 text-center">Sales by Country</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total_sales"
            nameKey="country"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesByCountryChart;
