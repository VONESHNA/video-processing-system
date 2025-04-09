import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import GetVideo from './GetVideo';
const Table = ({ data, rowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
   const { video } = useParams();

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

  
  return (<>
  <div ><GetVideo/></div> 
    <div className='table-container flex justify-center items-center flex-col'>
      <table className='border-separate border-spacing-2 my-5'>
        <thead>
        
          <tr>
            <th>S. No.</th> {/* New Index Column */}
            <th>Frame</th>
            <th>Object Count</th>
            <th>Confidence</th>
            <th>Time Stamp</th>
            
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={row._id}>
              <td>{indexOfFirstRow + index + 1}</td> {/* Calculate the index */}
              <td>
                {row.frame_number}
        


              </td>
              <td>{row.object_count}</td> 
            

        
                <td> {row.confidence} </td>
              <td>{row.timestamp}</td> 
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
    </>
  );
};

export default Table;
