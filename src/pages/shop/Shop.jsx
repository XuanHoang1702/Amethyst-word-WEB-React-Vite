import { Filter, Grid, List, X } from 'lucide-react';
import { useEffect, useState } from "react";
import Breadcrumb from '../../components/BreadCrumb';
import FashionPagination from "../../components/panigation/Panigation";
import ProductFilters from '../../components/ui/ProductFilter';
import ProductSort from '../../pages/products/ProductSort';
import { ProductPaging } from '../../service/ProductService';
import ProductCard from '../products/new/ProductCard';
import ProductListCard from '../products/new/ProductListCard';

// Component ViewModeToggle
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
  
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(viewMode === 'grid' ? 8 : 5); 
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await ProductPaging(currentPage, productsPerPage);
      setProducts(response.data);
      setTotalPages(response.totalPages);
      setTotalProducts(response.totalRecords);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const itemsPerPage = viewMode === 'grid' ? 8 : 5;

    
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    
    fetchProducts();
  }, [currentPage, viewMode]);
  const handlePageChange = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setCurrentPage(pageNumber);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setCurrentPage(1); 
  };

  return (
    <div className="pt-[60px]">
      <div className="flex flex-col min-h-screen bg-white">
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-64 md:h-96 w-full">
            <img 
              alt="Fashion Blog Hero" 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white text-center">Tất cả sản phẩm</h1>
              <Breadcrumb items={[{ label: 'Tất cả sản phẩm' }]} />
            </div>
          </div>
        </div>
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
              <ProductFilters />
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 pb-16">
          <div className="flex flex-col md:flex-row gap-8">
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
            <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
              <ProductFilters />
            </div>
            
            <div className="w-full md:w-3/4 lg:w-4/5 p-2">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">
                  Hiển thị {products.length} trong tổng số {totalProducts} sản phẩm
                </div>
                <div className="flex items-center gap-4">
                  <ViewModeToggle viewMode={viewMode} onViewModeChange={handleViewModeChange} />
                  <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
                </div>
              </div>
              
              {/* Hiển thị sản phẩm theo chế độ xem lưới */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id || product.producT_ID} product={product} />
                  ))}
                </div>
              )}
              
              {/* Hiển thị sản phẩm theo chế độ xem danh sách */}
              {viewMode === 'list' && (
                <div className="flex flex-col gap-4">
                  {products.map(product => (
                    <ProductListCard key={product.id || product.producT_ID} product={product} />
                  ))}
                </div>
              )}
              
              {totalPages > 1 && (
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