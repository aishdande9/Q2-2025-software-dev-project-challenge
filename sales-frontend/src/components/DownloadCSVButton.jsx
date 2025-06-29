import React from 'react';

const DownloadCSVButton = ({ type }) => {
  const handleDownload = () => {
    window.open(`http://localhost:8080/api/analytics/download-report?type=${type}`, '_blank');
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-green-600 text-white px-4 py-2 m-2 rounded hover:bg-green-700"
    >
      Download {type.replace(/-/g, ' ')} Report
    </button>
  );
};

export default DownloadCSVButton;
