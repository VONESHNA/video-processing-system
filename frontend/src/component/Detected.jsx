// src/App.js
import React, { useEffect, useState } from 'react';
import PaginatedDetectedData from './PaginatedDetectedData'; // Assuming you have this component for pagination
import { useParams } from 'react-router-dom';

const MyForm = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { video } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getdetectedatabyvideo/${video}`); // Use backticks for template literals
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
  }, [video]); // Add video as a dependency to re-fetch if it changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='ml-80 p-4 bg-cyan-300 rounded-3xl w-220'>
      <div className="mt-16">
     
        <PaginatedDetectedData data={data} rowsPerPage={3} />
      </div>
    </div>
  );
};

export default MyForm;
