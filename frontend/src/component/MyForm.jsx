// src/App.js
import React, { useEffect, useState } from 'react';
import PaginatedMyForm from './PaginatedMyForm';
const MyForm = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/people'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
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
    <>
        <div className='ml-80 p-4 bg-cyan-300'>
        <div className="mt-16"> {/* Add margin-top to create space below the header */}
  {/* <h1>Data Table</h1>
  <table className="min-w-full">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {data.map(item => (
        <tr key={item._id}>
          <td>{item.video_filename}</td>
        </tr>
      ))}
    </tbody>
  </table> */}

  <PaginatedMyForm data={data} rowsPerPage={3} />
</div>
        </div>
    </>
  );
};

export default MyForm;
