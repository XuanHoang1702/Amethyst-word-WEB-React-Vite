import React from 'react';
import CategoryItem from './CategoryItem';
import { CategoryData } from '../../service/CategoryData';
const CategoryList = () => {
  return (
    
    <div className="bg-gradient-to-br p-4 rounded-lg m-5 border border-[#6666e5] shadow-xl h-[600px]">
      <h2 className="text-3xl font-bold text-center text-purple-800 mb-10">
        Danh mục sản phẩm
      </h2>
      <div className="flex flex-col gap-2">
        {CategoryData.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
    
  );
};

export default CategoryList;
