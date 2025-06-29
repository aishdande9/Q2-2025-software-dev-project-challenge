const { Parser } = require('json2csv');

/**
 * Converts an array of objects (JSON) into CSV format and sends it as a file response.
 * @param {Array} data - Array of objects to convert to CSV.
 * @param {Array} fields - Array of fields/columns to include in CSV.
 * @param {string} fileName - Name of the CSV file to download.
 * @param {Response} res - Express response object.
 */
function exportToCSV(data, fields, fileName, res) {
  try {
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    return res.send(csv);
  } catch (err) {
    console.error('CSV export error:', err);
    return res.status(500).send('Failed to export CSV');
  }
}

module.exports = { exportToCSV };
