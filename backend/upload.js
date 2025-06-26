const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const mysql = require('mysql2/promise');
const path = require('path');

const router = express.Router();

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const upload = multer({ dest: uploadDir });

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce_data',
  waitForConnections: true,
  connectionLimit: 10,
});

router.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = req.file?.path;
  const results = [];


  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        results.push([
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
      })
      .on('end', async () => {
        try {
          const batchSize = 1000;
          const insertQuery = `
            INSERT INTO orders (
              order_id, order_date, user_id, product_id,
              quantity, price, total_amount, country, city
            ) VALUES ?`;

          for (let i = 0; i < results.length; i += batchSize) {
            const batch = results.slice(i, i + batchSize);
            await connection.query(insertQuery, [batch]);
          }

          await connection.commit();
          res.status(200).send('CSV uploaded and data inserted into MySQL successfully!');
        } catch (err) {
          await connection.rollback();
          console.error('Insert error:', err.message);
          res.status(500).send('Error inserting CSV data into database');
        } finally {
          connection.release();
          fs.unlinkSync(filePath);
        }
      });
  } catch (err) {
    console.error('Upload error:', err);
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    res.status(500).send('Upload failed');
  }
});

module.exports = router;
