

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import * as AiIcons from "react-icons/ai";  
import * as BsIcons from "react-icons/bs"; 
import * as BiIcons from "react-icons/bi"; 
import * as CgIcons from "react-icons/cg";  
import * as CiIcons from "react-icons/ci";  
import * as DiIcons from "react-icons/di";  
import * as FaIcons from "react-icons/fa";  
import * as FcIcons from "react-icons/fc"; 
import * as FiIcons from "react-icons/fi";  
import * as GiIcons from "react-icons/gi";  
import * as GoIcons from "react-icons/go"; 
import * as GrIcons from "react-icons/gr";  
import * as HiIcons from "react-icons/hi";  
import * as ImIcons from "react-icons/im"; 
import * as IoIcons from "react-icons/io";  
import * as Io5Icons from "react-icons/io5"; 
import * as MdIcons from "react-icons/md";  
import * as RiIcons from "react-icons/ri";  
import * as SiIcons from "react-icons/si";  

import { CategoryService } from "../../service/Category.Service";
import { useNavigate } from "react-router-dom";

const iconMap = {
  ...AiIcons,
  ...BsIcons,
  ...BiIcons,
  ...CgIcons,
  ...CiIcons,
  ...DiIcons,
  ...FaIcons,
  ...FcIcons,
  ...FiIcons,
  ...GiIcons,
  ...GoIcons,
  ...GrIcons,
  ...HiIcons,
  ...ImIcons,
  ...IoIcons,
  ...Io5Icons,
  ...MdIcons,
  ...RiIcons,
  ...SiIcons,
};


const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const logosPerPage = 10;
  const navigate = useNavigate();

  const totalPages = Math.ceil(categories.length / logosPerPage);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await CategoryService.getAllCategories(); // gọi API
        setCategories(data); // data chứa mảng categories
      } catch (err) {
        setError(err.message || "Lỗi khi tải danh mục");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/shop?categoryId=${categoryId}`);
  };

  const startIndex = currentPage * logosPerPage;
  const endIndex = startIndex + logosPerPage;
  const categoriesToShow = categories.slice(startIndex, endIndex);

  if (loading) return <div className="text-center py-6 text-gray-600">Đang tải danh mục...</div>;
  if (error) return <div className="text-center text-red-500 py-6">Lỗi: {error}</div>;

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <h2 className="px-4 py-3 text-3xl font-semibold text-purple-400 ">Danh mục</h2>
      </div>

      <div className="relative">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`absolute left-6 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-shadow duration-200 border
          ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"}`}
        >
          <ChevronLeft className="h-6 w-6 text-gray-500" />
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          className={`absolute right-6 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-shadow duration-200 border
          ${currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"}`}
        >
          <ChevronRight className="h-6 w-6 text-gray-500" />
        </button>

        <div className="grid grid-cols-5 md:grid-cols-10 border-b">
          {categoriesToShow.map((category) => {
            const IconComponent = iconMap[category.icon] || FaIcons.FaShoppingBag;

            return (
              <div
                key={category.id}
                color={category.color}
                onClick={() => handleCategoryClick(category.id)}
                className="flex flex-col items-center p-4 text-center border-r border-b hover:bg-gray-50 transition-colors cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                <div className="w-16 h-16 mb-2 rounded-full overflow-hidden flex items-center justify-center bg-purple-100">
                  <IconComponent className="text-2xl text-gray-700"
                  color={category.color || "#444"} />
                </div>
                <span className="text-xs text-gray-700 line-clamp-2">{category.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
