import React from 'react';
import PropTypes from 'prop-types';

function Pagination({
  totalItems, itemsPerPage, currentPage, onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <nav>
      <ul className="pagination flex space-x-2 mt-2 flex-end">
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`page-item ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-blue-500'
            } hover:bg-blue-200 hover:text-white transition-all duration-300 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer`}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
