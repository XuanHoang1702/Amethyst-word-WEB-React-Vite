import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Slider from '@mui/material/Slider';

const CATEGORIES = ["Áo thun", "Quần short", "Áo sơ mi", "Áo hoodie", "Quần jeans"];
const COLORS = [
  { name: "Xanh lá", hex: "#22c55e" },
  { name: "Đỏ", hex: "#ef4444" },
  { name: "Vàng", hex: "#eab308" },
  { name: "Cam", hex: "#f97316" },
  { name: "Xanh dương", hex: "#3b82f6" },
  { name: "Xanh đậm", hex: "#1e40af" },
  { name: "Tím", hex: "#9333ea" },
  { name: "Hồng", hex: "#ec4899" },
  { name: "Trắng", hex: "#ffffff" },
  { name: "Đen", hex: "#000000" },
];
const SIZES = ["XX-Nhỏ", "X-Nhỏ", "Nhỏ", "Trung bình", "Lớn", "X-Lớn", "XX-Lớn", "3X-Lớn"];
const DRESS_STYLES = ["Giản dị", "Lịch sự", "Dự tiệc", "Thể thao"];

const ProductFilters = () => {
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    colors: true,
    size: true,
    dressStyle: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderFilterSection = (title, section, content) => {
    return (
      
      <div className="border-b border-gray-200 py-4 ">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection(section)}
        >
          <h3 className="font-medium">{title}</h3>
          {expandedSections[section] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {expandedSections[section] && content}
      </div>
    );
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <div className="px-15 py-6 ">
      <div className="pr-4 bg-white rounded-lg shadow-md p-4 mb-4 mr-6 ">
        <h2 className="text-xl font-bold mb-4">Bộ lọc</h2>

        {/* Danh mục */}
        {renderFilterSection("Danh mục", "categories", (
          <ul className="space-y-2">
            {CATEGORIES.map((category) => (
              <li key={category} className="flex items-center gap-2">
                <button className="flex items-center gap-2 hover:text-gray-600">
                  <span>{category}</span>
                  <ChevronDown size={14} />
                </button>
              </li>
            ))}
          </ul>
        ))}

        {/* Giá */}
        {renderFilterSection("Giá", "price", (
          <>
            <div className="mb-4 mt-6 px-2">
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={500}
                step={10}
                sx={{ color: '#000000' }}
              />
            </div>
            <div className="flex justify-between items-center text-sm px-2">
              <span className="font-medium">{priceRange[0].toLocaleString()}₫</span>
              <span className="font-medium">{priceRange[1].toLocaleString()}₫</span>
            </div>
          </>
        ))}

        {/* Màu sắc */}
        {renderFilterSection("Màu sắc", "colors", (
          <div className="grid grid-cols-5 gap-2 mt-2">
            {COLORS.map((color) => (
              <button
                key={color.name}
                className="w-8 h-8 rounded-full border border-gray-200"
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Chọn màu ${color.name}`}
              />
            ))}
          </div>
        ))}

        {/* Kích thước */}
        {renderFilterSection("Kích thước", "size", (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {SIZES.map((size) => (
              <button
                key={size}
                className="px-2 py-1 rounded text-sm border border-gray-200 hover:border-gray-800 transition-colors"
              >
                {size}
              </button>
            ))}
          </div>
        ))}

        {/* Phong cách */}
        {renderFilterSection("Phong cách", "dressStyle", (
          <ul className="space-y-2">
            {DRESS_STYLES.map((style) => (
              <li key={style} className="flex items-center gap-2">
                <button className="flex items-center gap-2 hover:text-gray-600">
                  <span>{style}</span>
                  <ChevronDown size={14} />
                </button>
              </li>
            ))}
          </ul>
        ))}

        {/* Nút áp dụng */}
        <button className="w-full mt-6 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded">
          Áp dụng bộ lọc
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
