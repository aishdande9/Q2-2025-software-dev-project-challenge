const express = require('express');
const router = express.Router();
const pool = require('../db');
const { exportToCSV } = require('../utils/csvExport');

// Total sales per day
router.get('/total-sales-per-day', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT order_date, SUM(total_amount) AS total_sales
      FROM orders
      GROUP BY order_date
      ORDER BY order_date
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Top selling products
router.get('/top-products', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT product_id, SUM(quantity) AS units_sold
      FROM orders
      GROUP BY product_id
      ORDER BY units_sold DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Sales by country
router.get('/sales-by-country', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT country, SUM(total_amount) AS total_sales
      FROM orders
      GROUP BY country
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/download-report', async (req, res) => {
  const { type } = req.query;

  try {
    let query = '';
    let fields = [];
    let filename = '';

    if (type === 'top-products') {
      query = `
        SELECT product_id, SUM(quantity) AS total_quantity, SUM(total_amount) AS total_sales
        FROM orders
        GROUP BY product_id
        ORDER BY total_sales DESC
        LIMIT 10
      `;
      fields = ['product_id', 'total_quantity', 'total_sales'];
      filename = 'top_products.csv';
    } else if (type === 'total-sales-per-day') {
      query = `
        SELECT order_date, SUM(total_amount) AS total_sales
        FROM orders
        GROUP BY order_date
        ORDER BY order_date
      `;
      fields = ['order_date', 'total_sales'];
      filename = 'sales_by_date.csv';
    } else {
      return res.status(400).send('Invalid report type');
    }

    const [rows] = await pool.query(query);
    exportToCSV(rows, fields, filename, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error generating report');
  }
});

module.exports = router;
