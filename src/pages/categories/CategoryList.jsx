import React, { useEffect, useState } from 'react';
import CategoryItem from './CategoryItem';
import { CategoryService } from '../../service/CategoryService';
import { getCategoryIcon } from '../../utils/getCategoryIcon';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await CategoryService.getAllCategories();
            const dataWithicons = data.map(category=>({
              ...category,
              icon: getCategoryIcon(category.name)
            }));
            setCategories(data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    fetchCategories();
}, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="bg-gradient-to-br p-4 rounded-lg m-5 border border-[#6666e5] shadow-xl h-[600px]">
      <h2 className="text-3xl font-bold text-center text-purple-800 mb-10">
        Danh mục sản phẩm
      </h2>
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <CategoryItem key={category.icon} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;