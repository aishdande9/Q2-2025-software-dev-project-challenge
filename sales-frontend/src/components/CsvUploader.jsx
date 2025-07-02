import React, { useState } from 'react';
import axios from 'axios';
import './CsvUploader.css'; 

const CsvUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadCSV = async () => {
    if (!file) return alert("Please select a CSV file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage('');
      const res = await axios.post('http://localhost:8080/api/upload', formData, {

        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(res.data.message || 'File uploaded successfully');
    } catch (err) {
      setMessage('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={uploadCSV}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
};

export default CsvUploader;
