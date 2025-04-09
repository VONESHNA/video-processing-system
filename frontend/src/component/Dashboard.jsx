// src/App.js
import React, { useEffect, useState } from 'react';
import PaginatedDetectedVideos from './PaginatedDetectedVideos'; // Assuming you have this component for pagination

const MyForm = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/detectedvideos'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Fetch error:', error); // Log the error to the console
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='ml-80 p-4 bg-cyan-300 rounded-3xl'>
      <div className="mt-16">
  <PaginatedDetectedVideos data={data} rowsPerPage={1} />

      </div>
    </div>
  );
};

export default MyForm;
