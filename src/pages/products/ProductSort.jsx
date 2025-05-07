import React from 'react';

const ProductSort = ({ sortBy, onSortChange }) => {
  return (
    <div className="hidden md:flex items-center gap-2 text-sm">
      <span>Showing 1-10 of 100 Products</span>
      <span className="mx-2">|</span>
      <span>Sort by:</span>
      <select 
        className="border-none bg-transparent font-medium focus:outline-none"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option>Phổ biến nhất </option>
        <option>Giá tiền: Từ Thấp đến cao </option>
        <option>Giá tiền: thứ cao đến thấp </option>
      </select>
    </div>
  );
};

export default ProductSort;