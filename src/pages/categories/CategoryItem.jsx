import React from 'react';

const CategoryItem = ({ category }) => {
  return (
    <div className="relative group z-10 flex items-center gap-2 bg-[#6666e5] text-white py-5 px-6 rounded-lg shadow-lg transition-all duration-300 cursor-pointer transform scale-100 hover:scale-105 hover:brightness-110">
     {category.icon && <div className="text-2xl">{category.icon}</div>}

      <div className="text-lg font-semibold">{category.name}</div>
      {category.status && (
        <div className="ml-2 text-sm">
       
        </div>
      )}
    </div>
  );
};

export default CategoryItem;