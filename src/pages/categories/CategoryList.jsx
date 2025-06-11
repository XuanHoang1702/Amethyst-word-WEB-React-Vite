import { useEffect, useState } from 'react';
import { FaGlasses, FaHatCowboy, FaShoePrints, FaShoppingBag, FaTshirt } from 'react-icons/fa';
import { GiEarrings, GiNecklace } from 'react-icons/gi';
import { MdOutlineDiamond, MdOutlineRingVolume, MdOutlineWatch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { CategoryService } from '../../service/CategoryService';

const iconMap = {
  MdOutlineRingVolume,
  GiEarrings,
  FaShoePrints,
  GiNecklace,
  MdOutlineWatch,
  FaGlasses,
  FaTshirt,
  FaShoppingBag,
  FaHatCowboy,
  MdOutlineDiamond,
};

const ProductCategory = ({ name, icon, color, onClick }) => {
  const IconComponent = iconMap[icon] || FaShoppingBag;

  return (
    <div
      className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-full mb-3">
        <IconComponent className="text-2xl text-gray-700" style={{ color: color || '#444' }} />
      </div>
      <span className="text-sm text-gray-700 font-medium text-center leading-tight">
        {name}
      </span>
    </div>
  );
};

const ProductCategoryGrid = ({ categories, onCategoryClick }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
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

  if (loading) return <div className="text-center py-6 text-gray-600">Đang tải danh mục...</div>;
  if (error) return <div className="text-center text-red-500 py-6">Lỗi: {error}</div>;

  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          Danh Mục Sản Phẩm
        </h2>

        <ProductCategoryGrid
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />
      </div>
    </div>
  );
};

export default CategoryList;
