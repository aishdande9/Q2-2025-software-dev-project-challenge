const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const mysql = require('mysql2/promise');
const path = require('path');

const router = express.Router();

// Multer setup – stores uploaded CSVs in /uploads/
const upload = multer({ dest: path.join(__dirname, 'uploads/') });

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'ecommerce_data',
  waitForConnections: true,
  connectionLimit: 10,
});

// Upload route: /upload
router.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;
  const results = [];

  try {
    const connection = await pool.getConnection();

    const stream = fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', async () => {
        // Use batch insert
        const insertQuery = `
          INSERT INTO orders (
            order_id, order_date, user_id, product_id,
            quantity, price, total_amount, country, city
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        for (const row of results) {
          try {
            await connection.execute(insertQuery, [
              row.order_id,
              row.order_date,
              parseInt(row.user_id),
              parseInt(row.product_id),
              parseInt(row.quantity),
              parseFloat(row.price),
              parseFloat(row.total_amount),
              row.country,
              row.city,
            ]);
          } catch (err) {
            console.error('Error inserting row:', err.message);
          }
        }

        connection.release();
        fs.unlinkSync(filePath); // Clean up uploaded file
        res.send('CSV data uploaded and inserted into MySQL!');
      });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).send('Upload failed');
  }
});

module.exports = router;
