import { Filter, Grid, List, X } from 'lucide-react';
import { useEffect, useState, useCallback } from "react";
import Breadcrumb from '../../components/BreadCrumb';
import FashionPagination from "../../components/panigation/Panigation";
import ProductFilters from '../../pages/products/ProductFilter';
import ProductSort from '../../pages/products/ProductSort';
import ProductCard from '../products/new/ProductCard';
import ProductListCard from '../products/new/ProductListCard';
import {  ProductFilter } from '../../service/ProductService';
import bg1 from '../../assets/image/pngtree-sustainable-fashion-featuring-clothes-made-from-organic-and-recycled-fabrics-on-picture-image_15873419.jpg'

const ViewModeToggle = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
      <button
        className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
        onClick={() => onViewModeChange('grid')}
        aria-label="Chế độ xem lưới"
      >
        <Grid size={18} />
      </button>
      <button
        className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`}
        onClick={() => onViewModeChange('list')}
        aria-label="Chế độ xem danh sách"
      >
        <List size={18} />
      </button>
    </div>
  );
};

const Shop = () => {
  const [sortBy, setSortBy] = useState("Most Popular");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); 
  const [filters, setFilters] = useState({
    categoryId: null,
    brandId: null,
    pageNumber: 1,
    pageSize: 8,
    priceMin: 0,
    pricaMax: 9999,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  //   try {
  //     setLoading(true);
  //     console.log('Fetching with filters:', filters);
      
  //     // Sử dụng ProductFilter thay vì ProductPaging
  //     const response = await ProductFilter(
  //       null, // brandId
  //       filters.categoryId,
  //       0, // priceMin
  //       0, // priceMax  
  //       filters.pageNumber,
  //       filters.pageSize
  //     );
      
  //     console.log('API response:', response);
      
  //     setProducts(response.data || []);
  //     setTotalPages(response.totalPages || 1);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setProducts([]);
  //     setTotalPages(1);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [filters]);

  // Thêm fetchProducts function và sửa các dependencies
const fetchProducts = useCallback(async () => {
  try {
    setLoading(true);
    console.log('Fetching with filters:', filters);
    
    const response = await ProductFilter(
      filters.brandId,
      filters.categoryId,
      filters.priceMin,
      filters.pricaMax,  
      filters.pageNumber,
      filters.pageSize
    );
    
    console.log('API response:', response);
    
    setProducts(response.data || []);
    setTotalPages(response.totalPages || 1);
  } catch (error) {
    console.error('Error:', error);
    setProducts([]);
    setTotalPages(0);
  } finally {
    setLoading(false);
  }
}, [filters]);

useEffect(() => {
  fetchProducts();
}, [fetchProducts, filters]);

const handleFilterChange = useCallback((newFilters) => {
  console.log('Applying filters:', newFilters);
  setFilters(prev => ({
    ...prev,
    ...newFilters,
    priceMin: newFilters.priceMin !== undefined ? newFilters.priceMin : prev.priceMin,
    priceMax: newFilters.priceMax !== undefined ? newFilters.priceMax : prev.priceMax,
    pageNumber: 1
  }));
  setCurrentPage(1);
}, []);

const handlePageChange = useCallback(async (pageNumber) => {
  try {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    setLoading(true);
    setCurrentPage(pageNumber);
    
    setFilters(prev => ({
      ...prev,
      pageNumber
    }));
    
  } catch (error) {
    console.error('Error changing page:', error);
  }
}, []);
  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
    setFilters(prev => ({
      ...prev,
      pageSize: mode === 'grid' ? 8 : 5,
      pageNumber: 1
    }));
    setCurrentPage(1);
  }, []);

  // Xử lý thay đổi trang

  return (
    <div className="pt-[60px]">
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header */}
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-600 to-blue-400 h-64 md:h-96 w-full">
            <img 
            src={bg1}
              alt="Fashion Blog Hero" 
              className="w-full h-full object-cover object-center opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white text-center">Tất cả sản phẩm</h1>
              <Breadcrumb items={[{ label: 'Tất cả sản phẩm' }]} />
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                <button 
                  className="p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <ProductFilters onFilterChange={handleFilterChange} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile Controls */}
            <div className="md:hidden w-full flex justify-between items-center py-2">
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="flex gap-2 items-center px-4 py-2 border border-gray-300 rounded-md"
              >
                <Filter size={16} />
                <span>Filters</span>
              </button>
              <div className="flex items-center gap-2">
                <ViewModeToggle viewMode={viewMode} onViewModeChange={handleViewModeChange} />
                <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
              </div>
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
              <ProductFilters onFilterChange={handleFilterChange} />
            </div>
            
            {/* Product List */}
            <div className="w-full md:w-3/4 lg:w-4/5 p-2">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">
                  Hiển thị {products.length} sản phẩm
                </div>
                <div className="flex items-center gap-4">
                  <ViewModeToggle viewMode={viewMode} onViewModeChange={handleViewModeChange} />
                  <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8">Đang tải sản phẩm...</div>
              ) : products.length === 0 ? (
                <div className="text-center py-8">Không tìm thấy sản phẩm nào</div>
              ) : (
                <>
                  {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {products.map(product => (
                        <ProductCard 
                          key={product.producT_ID} 
                          product={product} 
                        />
                      ))}
                    </div>
                  )}

                  {viewMode === 'list' && (
                    <div className="flex flex-col gap-4">
                      {products.map(product => (
                        <ProductListCard 
                          key={product.producT_ID} 
                          product={product} 
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              {!loading && totalPages > 0 && (
                <div className="mt-8">
                  <FashionPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;