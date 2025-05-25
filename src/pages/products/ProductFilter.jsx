import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Slider from '@mui/material/Slider';
import PropTypes from 'prop-types';
import { CategoryService } from "../../service/CategoryService";
import { ProductFilter } from "../../service/ProductService";
import { BrandService } from "../../service/BrandService";
const ProductFilters = ({ onFilterChange, initialFilters }) => {
  // States
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandsError, setBrandsError] = useState(null);
  const [brandsLoading, setBrandsLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([
    initialFilters?.priceMin || 0,
    initialFilters?.priceMax || 9999
  ]);
  const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
  const [filters, setFilters] = useState(initialFilters || {
    categoryId: initialFilters?.categoryId || null,
    brandId: initialFilters?.brandId || null,
    pageNumber: initialFilters?.pageNumber || 1,
    pageSize: initialFilters?.pageSize || 8,
    priceMin: initialFilters?.priceMin || 0,
    priceMax: initialFilters?.priceMax || 9999
  });
  
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brand: true,
    price: true,
    size: false,
    dressStyle: false
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await CategoryService.getAllCategories();
        setCategories(data);
        setCategoriesError(null);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoriesError(error.message);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(()=>{
    const fetchBrands = async()=>{
      try{
        setBrandsLoading(true);
        const data = await BrandService.getBrands();
        console.log('Dữ liệu brands nhận được:', data);
        setBrands(data);
        setBrandsError(null);
      }
      catch(error){
        console.error("Error fetching brands:", error);
        setBrandsError(error.message);
      }
      finally{
        setBrandsLoading(false);
      }
    };
    fetchBrands();
    
  },[])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await ProductFilter(
          null,
          filters.categoryId,
          filters.brandId,
          priceRange[0],
          priceRange[1],
          filters.pageNumber,
          filters.pageSize
        );
        if (onFilterChange) {
          onFilterChange({
            ...filters,
            data: result.data,
            totalPages: result.totalPages,
            totalRecords: result.totalRecords
          });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [filters, priceRange, onFilterChange]);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      onFilterChange(filters);
    }, 5000);
    return () => clearTimeout(timer);
  },[filters, onFilterChange]);
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handleApplyCategory = (categoryId) => {
    console.log('Category selected:', categoryId);
    setSelectedCategory(categoryId);
    setFilters(prev => ({
      ...prev,
      categoryId: categoryId === selectedCategory ? null : categoryId,
      pageNumber: 1
    }));
  };

  const handleApplyBrand = (brandId)=>{
    console.log('Brand selected:', brandId);
    setSelectedBrand(brandId);
    setFilters(prev=>({
      ...prev,
      brandId: brandId === selectedBrand ? null : brandId,
      pageNumber: 1
    }))
  }

  const handlePriceChange = (event, newValue) => {
    setFilters(prev=>({
      ...prev, 
      priceMin: newValue[0],
      pricaMax: newValue[1],
      pageNumber: 1
    }))
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

  // Render
  return (
    <div className="px-15 py-6">
      {loading && <p className="text-center">Loading...</p>}
      <div className="pr-4 bg-white rounded-lg shadow-md p-4 mb-4 mr-6">
        <h2 className="text-xl font-bold mb-4">Bộ lọc</h2>

        {/* Categories */}
        {renderFilterSection("Danh mục", "categories", (
          <ul className="space-y-2">
            {categoriesLoading ? (
              <li className="text-center py-2">
                <span className="animate-spin mr-2">⌛</span>
                Đang tải danh mục...
              </li>
            ) : categoriesError ? (
              <li className="text-red-500 py-2">{categoriesError}</li>
            ) : (
              <>
                <li className="flex items-center gap-2">
                  <button
                    className={`flex items-center gap-2 hover:text-gray-600 ${
                      !filters.categoryId ? 'text-gray-600 font-medium' : ''
                    }`}
                    onClick={() => handleApplyCategory(null)}
                  >
                    <span>Tất cả danh mục</span>
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id || category.categoryId} className="flex items-center gap-2">
                    <button
                      className={`flex items-center gap-2 hover:text-gray-600 ${
                        filters.categoryId === (category.id || category.categoryId) 
                          ? 'text-gray-600 font-medium' 
                          : ''
                      }`}
                      onClick={() => handleApplyCategory(category.id || category.categoryId)}
                    >
                      <span>{category.name || category.categoryName}</span>
                    </button>
                  </li>
                ))}
              </>
            )}
          </ul>
        ))}
        
      
      {renderFilterSection("Thương hiệu", "brand", (
        <ul className="space-y-2">
          {brandsLoading ? (
            <li className="text-center py-2">
              <span className="animate-spin mr-2">⌛</span>
              Đang tải thương hiệu...
            </li>
          ) : brandsError ? (
            <li className="text-red-500 py-2">{brandsError}</li>
          ) : (
            <>
              <li className="flex items-center gap-2">
                <button
                  className={`flex items-center gap-2 hover:text-gray-600 ${
                    !filters.brandId ? 'text-gray-600 font-medium' : ''
                  }`}
                  onClick={() => handleApplyBrand(null)}
                >
                  <span>Tất cả thương hiệu</span>
                </button>
              </li>
              {brands.map((brand) => (
                <li key={brand.id || brand.branD_ID} className="flex items-center gap-2">
                  <button
                    className={`flex items-center gap-2 hover:text-gray-600 ${
                      filters.brandId === (brand.id || brand.brandId) 
                        ? 'text-gray-600 font-medium' 
                        : ''
                    }`}
                    onClick={() => handleApplyBrand(brand.id || brand.branD_ID)}
                  >
                    <span>{brand.name || brand.branD_NAME}</span>
                  </button>
                </li>
              ))}
            </>
          )}
        </ul>
      ))}

        {/* Price Range */}
        {renderFilterSection("Giá", "price", (
          <>
            <div className="mb-4 mt-6 px-2">
              <Slider
                value={[filters.priceMin, filters.pricaMax]}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={9999}
                step={100}
                sx={{ color: '#c034eb' }}
                valueLabelFormat={(value) => `${value.toLocaleString()}₫`}
              />
            </div>
            <div className="flex justify-between items-center text-sm px-2">
            <div className="flex justify-between items-center text-sm px-2">
            <span className="font-medium">{priceRange[0].toLocaleString()}₫</span>
            <span className="font-medium">{priceRange[1].toLocaleString()}₫</span>
          </div>
            </div>
          </>
        ))}

{renderFilterSection("", "actions", (
  <button 
    className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
    onClick={() => {
      setPriceRange([0, 9999]);
      setFilters({
        categoryId: null,
        brandId: null,
        priceMin: 0,
        priceMax: 9999,
        pageNumber: 1
      });
    }}
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
    priceMin: PropTypes.number,
    pricaMax: PropTypes.number,
    pageSize: PropTypes.number
  })
};

ProductFilters.defaultProps = {
  initialFilters: {
    categoryId: null,
    brandId: null,
    pageNumber: 1,
    pageSize: 10
  }
};

export default ProductFilters;