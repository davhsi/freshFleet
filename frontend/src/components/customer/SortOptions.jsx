import React from 'react';

const SortOptions = ({ sortOption, sortOrder, handleSortChange, handleSortOrderChange }) => {
  return (
    <div className="mb-4">
      {/* Container for Sort Options */}
      <div className="mb-4 p-4 border rounded-lg shadow-sm bg-white">
        <label htmlFor="sortOptions" className="block text-sm font-medium text-gray-700">
          Sort by:
        </label>
        <select
          id="sortOptions"
          value={sortOption}
          onChange={handleSortChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="price">Price per Kg</option>
          <option value="quantity">Quantity Weight</option>
          <option value="date">Date Added</option>
        </select>
      </div>

      {/* Container for Sort Order */}
      <div className="mb-4 p-4 border rounded-lg shadow-sm bg-white">
        <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">
          Order:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default SortOptions;
   
