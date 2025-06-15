import React from 'react';

const ProductSort = ({ sortBy, onSortChange }) => {
  return (
    <div className="hidden md:flex items-center gap-2 text-sm">
      <span className="mx-2">|</span>
      <span>Sort by:</span>
      <select 
        className="border-none bg-transparent font-medium focus:outline-none"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="default">Sắp xếp theo giá tiền </option>
        <option value="price-asc">Giá tiền: Từ thấp đến cao</option>
        <option value="price-desc">Giá tiền: Từ cao đến thấp</option>
      </select>
    </div>
  );
};

export default ProductSort;
