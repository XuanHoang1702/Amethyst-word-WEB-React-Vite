import React, { useEffect, useState } from 'react';
import { CategoryService } from '../../service/CategoryService';
import { FaTshirt, FaShoppingBag, FaShoePrints, FaHatCowboy, FaGlasses } from 'react-icons/fa';
import { MdOutlineDiamond, MdOutlineRingVolume, MdOutlineWatch } from 'react-icons/md';
import { GiEarrings, GiNecklace } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';


const iconMap = {
  MdOutlineRingVolume: MdOutlineRingVolume,
  GiEarrings: GiEarrings,
  FaShoePrints: FaShoePrints,
  GiNecklace: GiNecklace,
  MdOutlineWatch: MdOutlineWatch,
  FaGlasses: FaGlasses,
  FaTshirt: FaTshirt,
  FaShoppingBag: FaShoppingBag,
  FaHatCowboy: FaHatCowboy,
  MdOutlineDiamond: MdOutlineDiamond,
};

const ProductCategory = ({ name, icon, color, onClick }) => {
  const IconComponent = iconMap[icon] || FaShoppingBag;

  return (
    <div 
      className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 rounded-lg"
      onClick={onClick}
    >
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 hover:bg-gray-200 transition-colors">
        <IconComponent className="text-2xl" style={{ color: color || "#6666e5" }} />
      </div>
      <span className="text-sm text-gray-800 font-medium text-center">
        {name}
      </span>
    </div>
  );
};

const ProductCategoryMobile = ({ categories, onCategoryClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
      {categories.map((category) => (
        <ProductCategory
          key={category.id}
          name={category.name}
          icon={category.icon}
          color={category.color}
          onClick={() => onCategoryClick(category.id)}
        />
      ))}
    </div>
  );
};

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await CategoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message || 'Lỗi khi tải danh mục');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/shop?categoryId=${categoryId}`);
  };

  if (loading) return <div className="text-center p-4">Đang tải...</div>;
  if (error) return <div className="text-center text-red-500 p-4">Lỗi: {error}</div>;

  return (
    <div className="min-h-screen bg-purple-100">
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-16">
          <h1 className="text-xl sm:text-3xl font-bold text-purple-300 text-center">
            Danh Mục Sản Phẩm
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-20">
        <ProductCategoryMobile 
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />
      </div>
    </div>
  );
};

export default CategoryList;
