// // import React, { useEffect, useState, useCallback } from "react";
// // import { ChevronDown, ChevronUp } from "lucide-react";
// // import Slider from "@mui/material/Slider";
// // import PropTypes from "prop-types";
// // import { CategoryService } from "../../service/CategoryService";
// // import { BrandService } from "../../service/BrandService";
// // import debounce from "lodash/debounce";

// // const ProductFilters = ({ onFilterChange, initialFilters }) => {
// //   const [categories, setCategories] = useState([]);
// //   const [brands, setBrands] = useState([]);
// //   const [brandsError, setBrandsError] = useState(null);
// //   const [brandsLoading, setBrandsLoading] = useState(false);
// //   const [categoriesError, setCategoriesError] = useState(null);
// //   const [categoriesLoading, setCategoriesLoading] = useState(false);
// //   const [priceRange, setPriceRange] = useState([
// //     initialFilters?.priceMin || 0,
// //     initialFilters?.pricaMax || 9999,
// //   ]);
// //   const [selectedCategory, setSelectedCategory] = useState(initialFilters?.categoryId || null);
// //   const [selectedBrand, setSelectedBrand] = useState(initialFilters?.brandId || null);
// //   const [filters, setFilters] = useState({
// //     categoryId: initialFilters?.categoryId || null,
// //     brandId: initialFilters?.brandId || null,
// //     pageNumber: initialFilters?.pageNumber || 1,
// //     pageSize: initialFilters?.pageSize || 8,  
// //     priceMin: initialFilters?.priceMin || 0,
// //     pricaMax: initialFilters?.pricaMax || 9999,
// //   });
// //   const [expandedSections, setExpandedSections] = useState({
// //     categories: true,
// //     brand: true,
// //     price: true,
// //     size: false,
// //     dressStyle: false,
// //   });

// //   // Lấy danh mục
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         setCategoriesLoading(true);
// //         const data = await CategoryService.getAllCategories();
// //         setCategories(data);
// //         setCategoriesError(null);
// //       } catch (error) {
// //         console.error("Error fetching categories:", error);
// //         setCategoriesError(error.message);
// //       } finally {
// //         setCategoriesLoading(false);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   // Lấy thương hiệu
// //   useEffect(() => {
// //     const fetchBrands = async () => {
// //       try {
// //         setBrandsLoading(true);
// //         const data = await BrandService.getBrands();
// //         setBrands(data);
// //         setBrandsError(null);
// //       } catch (error) {
// //         console.error("Error fetching brands:", error);
// //         setBrandsError(error.message);
// //       } finally {
// //         setBrandsLoading(false);
// //       }
// //     };
// //     fetchBrands();
// //   }, []);

// //   // Đồng bộ initialFilters
// //   useEffect(() => {
// //     const newFilters = {
// //       categoryId: initialFilters?.categoryId || null,
// //       brandId: initialFilters?.brandId || null,
// //       pageNumber: initialFilters?.pageNumber || 1,
// //       pageSize: initialFilters?.pageSize || 8,
// //       priceMin: initialFilters?.priceMin || 0,
// //       pricaMax: initialFilters?.pricaMax || 9999,
// //     };
// //     setFilters(newFilters);
// //     setPriceRange([newFilters.priceMin, newFilters.pricaMax]);
// //     setSelectedCategory(newFilters.categoryId);
// //     setSelectedBrand(newFilters.brandId);
// //     onFilterChange(newFilters); 
// //   }, [initialFilters, onFilterChange]);

// //   const debouncedFilterChange = useCallback(
// //     debounce((newFilters) => {
// //       onFilterChange(newFilters);
// //     }, 300),
// //     [onFilterChange]
// //   );

// //   const toggleSection = (section) => {
// //     setExpandedSections((prev) => ({
// //       ...prev,
// //       [section]: !prev[section],
// //     }));
// //   };

// //   const handleApplyCategory = (categoryId) => {
// //     console.log("Category selected:", categoryId);
// //     setSelectedCategory(categoryId);
// //     const newFilters = {
// //       ...filters,
// //       categoryId: categoryId === selectedCategory ? null : categoryId,
// //       pageNumber: 1,
// //     };
// //     setFilters(newFilters);
// //     debouncedFilterChange(newFilters);
// //   };

// //   const handleApplyBrand = (brandId) => {
// //     console.log("Brand selected:", brandId);
// //     setSelectedBrand(brandId);
// //     const newFilters = {
// //       ...filters,
// //       brandId: brandId === selectedBrand ? null : brandId,
// //       pageNumber: 1,
// //     };
// //     setFilters(newFilters);
// //     debouncedFilterChange(newFilters);
// //   };

// //   const handlePriceChange = useCallback(
// //     (event, newValue) => {
// //       setPriceRange(newValue);
// //       const newFilters = {
// //         ...filters,
// //         priceMin: newValue[0],
// //         pricaMax: newValue[1],
// //         pageNumber: 1,
// //       };
// //       setFilters(newFilters);
// //       debouncedFilterChange(newFilters);
// //     },
// //     [filters, debouncedFilterChange]
// //   );

// //   const renderFilterSection = (title, section, content) => (
// //     <div className="border-b border-gray-200 py-4">
// //       <div
// //         className="flex justify-between items-center cursor-pointer mb-2"
// //         onClick={() => toggleSection(section)}
// //       >
// //         <h3 className="font-medium">{title}</h3>
// //         {expandedSections[section] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
// //       </div>
// //       {expandedSections[section] && content}
// //     </div>
// //   );

// //   return (
// //     <div className="px-15 py-6">
// //       <div className="pr-4 bg-white rounded-lg shadow-md p-4 mb-4 mr-6">
// //         <h2 className="text-xl font-bold mb-4">Bộ lọc</h2>
// //         {renderFilterSection("Danh mục", "categories", (
// //           <ul className="space-y-2">
// //             {categoriesLoading ? (
// //               <li className="text-center py-2">
// //                 <span className="animate-spin mr-2">⌛</span>
// //                 Đang tải danh mục...
// //               </li>
// //             ) : categoriesError ? (
// //               <li className="text-red-500 py-2">Lỗi: {categoriesError}</li>
// //             ) : (
// //               <>
// //                 <li className="flex items-center gap-2">
// //                   <button
// //                     className={`flex items-center gap-2 hover:text-gray-600 ${
// //                       !filters.categoryId ? "text-gray-600 font-medium" : ""
// //                     }`}
// //                     onClick={() => handleApplyCategory(null)}
// //                   >
// //                     <span>Tất cả danh mục</span>
// //                   </button>
// //                 </li>
// //                 {categories.map((category) => (
// //                   <li key={category.id || category.categoryId} className="flex items-center gap-2">
// //                     <button
// //                       className={`flex items-center gap-2 hover:text-gray-600 ${
// //                         filters.categoryId === (category.id || category.categoryId)
// //                           ? "text-gray-600 font-medium"
// //                           : ""
// //                       }`}
// //                       onClick={() => handleApplyCategory(category.id || category.categoryId)}
// //                     >
// //                       <span>{category.name || category.categoryName}</span>
// //                     </button>
// //                   </li>
// //                 ))}
// //               </>
// //             )}
// //           </ul>
// //         ))}
// //         {renderFilterSection("Thương hiệu", "brand", (
// //           <ul className="space-y-2">
// //             {brandsLoading ? (
// //               <li className="text-center py-2">
// //                 <span className="animate-spin mr-2">⌛</span>
// //                 Đang tải thương hiệu...
// //               </li>
// //             ) : brandsError ? (
// //               <li className="text-red-500 py-2">Lỗi: {brandsError}</li>
// //             ) : (
// //               <>
// //                 <li className="flex items-center gap-2">
// //                   <button
// //                     className={`flex items-center gap-2 hover:text-gray-600 ${
// //                       filters.brandId ? "text-gray-600 font-medium" : ""
// //                     }`}
// //                     onClick={() => handleApplyBrand(null)}
// //                   >
// //                     <span>Tất cả thương hiệu</span>
// //                   </button>
// //                 </li>
// //                 {brands.map((brand) => (
// //                   <li key={brand.id || brand.branD_ID} className="flex items-center gap-2">
// //                     <button
// //                       className={`flex items-center gap-2 hover:text-gray-600 ${
// //                         filters.brandId === (brand.id || brand.branD_ID)
// //                           ? "text-gray-600 font-medium"
// //                           : ""
// //                       }`}
// //                       onClick={() => handleApplyBrand(brand.id || brand.branD_ID)}
// //                     >
// //                       <span>{brand.name || brand.branD_NAME}</span>
// //                     </button>
// //                   </li>
// //                 ))}
// //               </>
// //             )}
// //           </ul>
// //         ))}
// //         {renderFilterSection("Giá", "price", (
// //           <>
// //             <div className="mb-4 mt-6 px-2">
// //               <Slider
// //                 value={priceRange}
// //                 onChange={handlePriceChange}
// //                 valueLabelDisplay="auto"
// //                 min={0}
// //                 max={9999}
// //                 step={100}
// //                 sx={{ color: "#c034eb" }}
// //                 valueLabelFormat={(value) => `${value.toLocaleString()}₫`}
// //               />
// //             </div>
// //             <div className="flex justify-between items-center text-sm px-2">
// //               <span className="font-medium">{priceRange[0].toLocaleString()}₫</span>
// //               <span className="font-medium">{priceRange[1].toLocaleString()}₫</span>
// //             </div>
// //           </>
// //         ))}
// //         {renderFilterSection("", "actions", (
// //           <button
// //             className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
// //             onClick={() => {
// //               const resetFilters = {
// //                 categoryId: null,
// //                 brandId: null,
// //                 priceMin: 0,
// //                 pricaMax: 9999,
// //                 pageNumber: 1,
// //                 pageSize: filters.pageSize,
// //               };
// //               setFilters(resetFilters);
// //               setPriceRange([0, 9999]);
// //               setSelectedCategory(null);
// //               setSelectedBrand(null);
// //               debouncedFilterChange(resetFilters);
// //             }}
// //           >
// //             Xóa tất cả bộ lọc
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // ProductFilters.propTypes = {
// //   onFilterChange: PropTypes.func.isRequired,
// //   initialFilters: PropTypes.shape({
// //     brandId: PropTypes.number,
// //     categoryId: PropTypes.number,
// //     pageNumber: PropTypes.number,
// //     pageSize: PropTypes.number,
// //     priceMin: PropTypes.number,
// //     pricaMax: PropTypes.number,
// //   }),
// // };

// // ProductFilters.defaultProps = {
// //   initialFilters: {
// //     categoryId: null,
// //     brandId: null,
// //     pageNumber: 1,
// //     pageSize: 8,
// //     priceMin: 0,
// //     pricaMax: 9999,
// //   },
// // };

// // export default ProductFilters;


import React, { useEffect, useState, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Slider from "@mui/material/Slider";
import PropTypes from "prop-types";
import { CategoryService } from "../../service/CategoryService";
import { BrandService } from "../../service/BrandService";
import debounce from "lodash/debounce";

const ProductFilters = ({ onFilterChange, initialFilters }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandsError, setBrandsError] = useState(null);
  const [brandsLoading, setBrandsLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([
    initialFilters?.priceMin || 0,
    initialFilters?.pricaMax || 9999,
  ]);
  const [selectedCategory, setSelectedCategory] = useState(initialFilters?.categoryId?.[0] || null);
  const [selectedBrand, setSelectedBrand] = useState(initialFilters?.brandId?.[0] || null);
  const [applyCategoryFilter, setApplyCategoryFilter] = useState(false); 
  const [applyBrandFilter, setApplyBrandFilter] = useState(false); 
  const [filters, setFilters] = useState({
    categoryId: initialFilters?.categoryId?.[0] || null,
    brandId: initialFilters?.brandId?.[0] || null,
    pageNumber: initialFilters?.pageNumber || 1,
    pageSize: initialFilters?.pageSize || 8,
    priceMin: initialFilters?.priceMin || 0,
    pricaMax: initialFilters?.pricaMax || 9999,
  });
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brand: true,
    price: true,
    // size: false,
    // dressStyle: false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await CategoryService.getAllCategories();
        setCategories(data);
        setCategoriesError(null);
      } catch (error) {
        setCategoriesError(error.message);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setBrandsLoading(true);
        const data = await BrandService.getBrands();
        setBrands(data);
        setBrandsError(null);
      } catch (error) {
        setBrandsError(error.message);
      } finally {
        setBrandsLoading(false);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const newFilters = {
      categoryId: initialFilters?.categoryId?.[0] || null,
      brandId: initialFilters?.brandId?.[0] || null,
      pageNumber: initialFilters?.pageNumber || 1,
      pageSize: initialFilters?.pageSize || 8,
      priceMin: initialFilters?.priceMin || 0,
      pricaMax: initialFilters?.pricaMax || 9999,
    };
    setFilters(newFilters);
    setPriceRange([newFilters.priceMin, newFilters.pricaMax]);
    setSelectedCategory(newFilters.categoryId);
    setSelectedBrand(newFilters.brandId);
    setApplyCategoryFilter(!!newFilters.categoryId);
    setApplyBrandFilter(!!newFilters.brandId); 
    onFilterChange(newFilters);
  }, [initialFilters, onFilterChange]);

  const debouncedPriceChange = useCallback(
    debounce((newFilters) => {
      onFilterChange(newFilters);
    }, 300),
    [onFilterChange]
  );

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleApplyCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    const newFilters = {
      ...filters,
      categoryId: applyCategoryFilter ? (categoryId === selectedCategory ? null : categoryId) : null,
      pageNumber: 1,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleApplyBrand = (brandId) => {
    setSelectedBrand(brandId);
    const newFilters = {
      ...filters,
      brandId: applyBrandFilter ? (brandId === selectedBrand ? null : brandId) : null,
      pageNumber: 1,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = useCallback(
    (event, newValue) => {
      setPriceRange(newValue);
      const newFilters = {
        ...filters,
        priceMin: newValue[0],
        pricaMax: newValue[1],
        pageNumber: 1,
      };
      setFilters(newFilters);
      debouncedPriceChange(newFilters);
    },
    [filters, debouncedPriceChange]
  );

  const handleCategoryCheckbox = (e) => {
    const checked = e.target.checked;
    setApplyCategoryFilter(checked);
    const newFilters = {
      ...filters,
      categoryId: checked ? selectedCategory : null,
      pageNumber: 1,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBrandCheckbox = (e) => {
    const checked = e.target.checked;
    setApplyBrandFilter(checked);
    const newFilters = {
      ...filters,
      brandId: checked ? selectedBrand : null,
      pageNumber: 1,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      categoryId: null,
      brandId: null,
      priceMin: 0,
      pricaMax: 9999,
      pageNumber: 1,
      pageSize: filters.pageSize,
    };
    setFilters(resetFilters);
    setPriceRange([0, 9999]);
    setSelectedCategory(null);
    setSelectedBrand(null);
    setApplyCategoryFilter(false);
    setApplyBrandFilter(false);
    onFilterChange(resetFilters);
  };

  const renderFilterSection = (title, section, content) => (
    <div className="border-b border-gray-200 py-4">
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

  return (
    <div className="px-15 py-6">
      <div className="pr-4 bg-white rounded-lg shadow-md p-4 mb-4 mr-6">
        <h2 className="text-xl font-bold mb-4">Bộ lọc</h2>
        {renderFilterSection("Danh mục", "categories", (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={applyCategoryFilter}
                onChange={handleCategoryCheckbox}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="text-sm font-medium">Áp dụng bộ lọc danh mục</label>
            </div>
            {categoriesLoading ? (
              <div className="text-center py-2">
                <span className="animate-spin mr-2">⌛</span>
                Đang tải danh mục...
              </div>
            ) : categoriesError ? (
              <div className="text-red-500 py-2">Lỗi: {categoriesError}</div>
            ) : (
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <button
                    className={`flex items-center gap-2 hover:text-gray-600 ${
                      !filters.categoryId && applyCategoryFilter ? "text-gray-600 font-medium" : ""
                    } ${!applyCategoryFilter ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => applyCategoryFilter && handleApplyCategory(null)}
                  >
                    <span>Tất cả danh mục</span>
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id || category.categoryId} className="flex items-center gap-2">
                    <button
                      className={`flex items-center gap-2 hover:text-gray-600 ${
                        filters.categoryId === (category.id || category.categoryId)
                          ? "text-gray-600 font-medium"
                          : ""
                      } ${!applyCategoryFilter ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => applyCategoryFilter && handleApplyCategory(category.id || category.categoryId)}
                    >
                      <span>{category.name || category.categoryName}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {renderFilterSection("Thương hiệu", "brand", (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={applyBrandFilter}
                onChange={handleBrandCheckbox}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="text-sm font-medium">Áp dụng bộ lọc thương hiệu</label>
            </div>
            {brandsLoading ? (
              <div className="text-center py-2">
                <span className="animate-spin mr-2">⌛</span>
                Đang tải thương hiệu...
              </div>
            ) : brandsError ? (
              <div className="text-red-500 py-2">Lỗi: {brandsError}</div>
            ) : (
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <button
                    className={`flex items-center gap-2 hover:text-gray-600 ${
                      !filters.brandId && applyBrandFilter ? "text-gray-600 font-medium" : ""
                    } ${!applyBrandFilter ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => applyBrandFilter && handleApplyBrand(null)}
                  >
                    <span>Tất cả thương hiệu</span>
                  </button>
                </li>
                {brands.map((brand) => (
                  <li key={brand.id || brand.branD_ID} className="flex items-center gap-2">
                    <button
                      className={`flex items-center gap-2 hover:text-gray-600 ${
                        filters.brandId === (brand.id || brand.branD_ID)
                          ? "text-gray-600 font-medium"
                          : ""
                      } ${!applyBrandFilter ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => applyBrandFilter && handleApplyBrand(brand.id || brand.branD_ID)}
                    >
                      <span>{brand.name || brand.branD_NAME}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {renderFilterSection("Giá", "price", (
          <>
            <div className="mb-4 mt-6 px-2">
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={9999}
                step={100}
                sx={{ color: "#c034eb" }}
                valueLabelFormat={(value) => `${value.toLocaleString()}₫`}
              />
            </div>
            <div className="flex justify-between items-center text-sm px-2">
              <span className="font-medium">{priceRange[0].toLocaleString()}₫</span>
              <span className="font-medium">{priceRange[1].toLocaleString()}₫</span>
            </div>
          </>
        ))}
        {renderFilterSection("", "actions", (
          <button
            className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
            onClick={handleResetFilters}
          >
            Xóa tất cả bộ lọc
          </button>
        ))}
      </div>
    </div>
  );
};

ProductFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  initialFilters: PropTypes.shape({
    brandId: PropTypes.number,
    categoryId: PropTypes.number,
    pageNumber: PropTypes.number,
    pageSize: PropTypes.number,
    priceMin: PropTypes.number,
    pricaMax: PropTypes.number,
  }),
};

ProductFilters.defaultProps = {
  initialFilters: {
    categoryId: null,
    brandId: null,
    pageNumber: 1,
    pageSize: 8,
    priceMin: 0,
    pricaMax: 9999,
  },
};

export default ProductFilters;


// import { Filter, Grid, List, X } from 'lucide-react';
// import { useEffect, useState, useCallback } from "react";
// import Breadcrumb from '../../components/BreadCrumb';
// import FashionPagination from "../../components/panigation/Panigation";
// import ProductFilters from '../../pages/products/ProductFilter';
// import ProductSort from '../../pages/products/ProductSort';
// import ProductCard from '../products/new/ProductCard';
// import ProductListCard from '../products/new/ProductListCard';
// import { ProductFilter } from '../../service/ProductService';
// import bg1 from '../../assets/image/pngtree-sustainable-fashion-featuring-clothes-made-from-organic-and-recycled-fabrics-on-picture-image_15873419.jpg';
// import { useLocation, useNavigate } from 'react-router-dom';

// const ViewModeToggle = ({ viewMode, onViewModeChange }) => {
//   return (
//     <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
//       <button
//         className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
//         onClick={() => onViewModeChange('grid')}
//         aria-label="Chế độ xem lưới"
//       >
//         <Grid size={18} />
//       </button>
//       <button
//         className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`}
//         onClick={() => onViewModeChange('list')}
//         aria-label="Chế độ xem danh sách"
//       >
//         <List size={18} />
//       </button>
//     </div>
//   );
// };

// const Shop = () => {
//   const [sortBy, setSortBy] = useState("Most Popular");
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [viewMode, setViewMode] = useState('grid');
//   const [filters, setFilters] = useState({
//     categoryId: [],
//     brandId: [],
//     pageNumber: 1,
//     pageSize: 8,
//     priceMin: 0,
//     pricaMax: 9999,
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [cache, setCache] = useState({});

//   const fetchProducts = useCallback(async () => {
//     const cacheKey = JSON.stringify(filters);
//     if (cache[cacheKey]) {
//       setProducts(cache[cacheKey].data);
//       setTotalPages(cache[cacheKey].totalPages);
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await ProductFilter(
//         filters.brandId,
//         filters.categoryId,
//         filters.priceMin,
//         filters.pricaMax,
//         filters.pageNumber,
//         filters.pageSize
//       );
//       setProducts(response.data || []);
//       setTotalPages(response.totalPages || 1);
//       setCache(prev => ({
//         ...prev,
//         [cacheKey]: { data: response.data || [], totalPages: response.totalPages || 1 }
//       }));
//     } catch (error) {
//       setProducts([]);
//       setTotalPages(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters, cache]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const handleFilterChange = useCallback((newFilters) => {
//     setFilters(prev => {
//       const updatedFilters = {
//         ...prev,
//         ...newFilters,
//         priceMin: newFilters.priceMin !== undefined ? newFilters.priceMin : prev.priceMin,
//         pricaMax: newFilters.pricaMax !== undefined ? newFilters.pricaMax : prev.pricaMax,
//         pageNumber: newFilters.pageNumber || 1,
//       };
//       return updatedFilters;
//     });
//     setCurrentPage(1);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   const handlePageChange = useCallback(async (pageNumber) => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     setLoading(true);
//     setCurrentPage(pageNumber);
//     setFilters(prev => ({
//       ...prev,
//       pageNumber
//     }));
//   }, []);

//   const handleViewModeChange = useCallback((mode) => {
//     setViewMode(mode);
//     setFilters(prev => ({
//       ...prev,
//       pageSize: mode === 'grid' ? 8 : 5,
//       pageNumber: 1
//     }));
//     setCurrentPage(1);
//   }, []);

//   return (
//     <div className="pt-[60px]">
//       <div className="flex flex-col min-h-screen bg-white">
//         <div className="relative">
//           <div className="bg-gradient-to-r from-purple-600 to-blue-400 h-64 md:h-96 w-full">
//             <img 
//               src={bg1}
//               alt="Fashion Blog Hero" 
//               className="w-full h-full object-cover object-center opacity-50"
//             />
//             <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
//               <h1 className="text-3xl md:text-5xl font-bold text-white text-center">Tất cả sản phẩm</h1>
//               <Breadcrumb items={[{ label: 'Tất cả sản phẩm' }]} />
//             </div>
//           </div>
//         </div>

//         {showMobileFilters && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
//             <div className="absolute right-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Filters</h2>
//                 <button 
//                   className="p-1 rounded-full hover:bg-gray-100"
//                   onClick={() => setShowMobileFilters(false)}
//                 >
//                   <X size={24} />
//                 </button>
//               </div>
//               <ProductFilters onFilterChange={handleFilterChange} />
//             </div>
//           </div>
//         )}
//         <div className="container mx-auto px-4 pb-16">
//           <div className="flex flex-col md:flex-row gap-8">
//             <div className="md:hidden w-full flex justify-between items-center py-2">
//               <button 
//                 onClick={() => setShowMobileFilters(true)}
//                 className="flex gap-2 items-center px-4 py-2 border border-gray-300 rounded-md"
//               >
//                 <Filter size={16} />
//                 <span>Filters</span>
//               </button>
//               <div className="flex items-center gap-2">
//                 <ViewModeToggle viewMode={viewMode} onViewModeChange={handleViewModeChange} />
//                 <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
//               </div>
//             </div>
//             <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
//               <ProductFilters onFilterChange={handleFilterChange} />
//             </div>
//             <div className="w-full md:w-3/4 lg:w-4/5 p-2">
//               <div className="flex justify-between items-center mb-6">
//                 <div className="text-sm text-gray-500">
//                   Hiển thị {products.length} sản phẩm
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <ViewModeToggle viewMode={viewMode} onViewModeChange={handleViewModeChange} />
//                   <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
//                 </div>
//               </div>
//               {loading ? (
//                 <div className="text-center py-8">
//                   <span className="animate-pulse">Đang tải sản phẩm...</span>
//                 </div>
//               ) : products.length === 0 ? (
//                 <div className="text-center py-8">Không tìm thấy sản phẩm nào</div>
//               ) : (
//                 <>
//                   {viewMode === 'grid' && (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                       {products.map(product => (
//                         <ProductCard 
//                           key={product.producT_ID} 
//                           product={product} 
//                         />
//                       ))}
//                     </div>
//                   )}
//                   {viewMode === 'list' && (
//                     <div className="flex flex-col gap-4">
//                       {products.map(product => (
//                         <ProductListCard 
//                           key={product.producT_ID} 
//                           product={product} 
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </>
//               )}
//               {!loading && totalPages > 0 && (
//                 <div className="mt-8">
//                   <FashionPagination 
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={handlePageChange}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;
