import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Table = ({ data, rowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleClick = () => {
      navigate('/target-page'); // Replace with your target route
  };

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

  // Determine the range of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Maximum number of page numbers to show
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if endPage is less than maxVisiblePages
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - (maxVisiblePages - 1));
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  
  return (
    <div className='table-container flex justify-center items-center flex-col'>
      <table className='border-separate border-spacing-2 my-5'>
        <thead>
          <tr>
            <th>S. No.</th> {/* New Index Column */}
            <th>Video</th>
            <th>Detection Data</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={row._id}>
              <td className='pl-10 pr-10'>{indexOfFirstRow + index + 1}</td> {/* Calculate the index */}
              <td className='pl-10 pr-10'>

              { (
                <video   className="w-100 h-50 rounded-lg shadow-lg" controls>
                    <source src={`http://127.0.0.1:8000/api/getvideo/${row.video_filename}`}  type="video/mp4"   />
                    <source src={`http://127.0.0.1:8000/api/getvideo/${row.video_filename}`}   type="video/mkv"  />
                    Your browser does not support the video tag.
                </video>
            )}


              </td>
              <td className='pl-10 pt-3 pr-10'>
              <a href={`/detected/${row._id}`}  className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-amber-400 transition duration-300">
    Detection Data 

</a>

        
                </td> {/* Assuming you have this field */}
              <td>{row.object_count}</td> {/* Assuming you have this field */}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ backgroundColor: 'red', color: 'white' }} // Salmon color
          className="m-1"
        >
          Previous
        </button>

        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={currentPage === pageNumber}
            style={{ backgroundColor: 'red', color: 'white' }} // Salmon color
            className="m-1"
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ backgroundColor: 'red', color: 'white' }} // Salmon color
          className="m-1"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
