import React, { useState } from 'react';

const Table = ({ data, rowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Get the current rows to display
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
<div className='table-container flex justify-center items-center flex-col'>
  <table className='border-separate border-spacing-2 my-5'>
    <thead>
      <tr>
        <th>ID</th>
        <th>Frame Number</th>
        <th>Object Count</th>
      </tr>
    </thead>
    <tbody>
      {currentRows.map((row) => (
        <tr key={row.id}>
          <td>{row.id}</td>
          <td>{row.name}</td>
          <td>{row.age}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <div>
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        disabled={currentPage === index + 1}
        style={{ margin: '0 5px',backgroundColor: 'red', Color: 'black' }} // Add space between buttons
      >
        {index + 1}
      </button>
    ))}
  </div>
</div>

  );
};

export default Table;
