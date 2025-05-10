/** @file src/components/ui/CategoryItem.jsx */
import React, { useState } from 'react';

/**
 
 * @param {Object} props
 * @param {Object} props.category -
 * @param {string} props.category.name 
 * @param {React.ReactNode} props.category.icon 
 */
const CategoryItem = ({ category }) => {
  const [activeSubId, setActiveSubId] = useState(null);

  
  const handleSubCategoryMouseEnter = (subId) => {
    setActiveSubId(subId);
  };


  const handleSubCategoryMouseLeave = () => {
    setActiveSubId(null);
  };

  return (
<div className="relative group z-10 flex items-center gap-2 bg-[#6666e5] text-white py-5 px-6 rounded-lg shadow-lg transition-all duration-300 cursor-pointer transform scale-100 hover:scale-105 hover:brightness-110">
      <div className="text-2xl text-white">{category.icon}</div>
      <div className="text-lg font-semibold">{category.name}</div>

    
      {category.subcategories && (
<div className="absolute left-full top-0 mt-2 ml-2 bg-[#6666e5] border-purple-200 shadow-lg rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-60 w-48">
          {category.subcategories.map((sub) => (
            <div 
              key={sub.id} 
              className="relative px-4 py-2 hover:bg-purple-400 cursor-pointer"
              onMouseEnter={() => handleSubCategoryMouseEnter(sub.id)}  
              onMouseLeave={handleSubCategoryMouseLeave}
            >
              {sub.name}
              {sub.subsubcategories && activeSubId === sub.id && (
<div className="absolute left-full top-0 mt-0 ml-2 bg-[#6666e5] border-purple-200 shadow-lg rounded-lg opacity-100 visible transition-all duration-300 z-60 w-48 max-h-96 overflow-y-auto">
                  {sub.subsubcategories.map((subsub) => (
                    <div key={subsub.id} className="px-4 py-2 hover:bg-purple-400 cursor-pointer">
                      {subsub.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;