import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandService } from '../../service/Brand.Service';
const API_IMAGE = import.meta.env.VITE_API_IMAGE;

const BrandLogos = () => {
  console.log('api image', API_IMAGE);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const logosPerPage = 7;

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await BrandService.getBrands();
        setBrands(data); 
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Lỗi khi tải thương hiệu');
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const totalPages = Math.ceil(brands.length / logosPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleBrandClick = (brandId) => {
    navigate(`/shop?brandId=${brandId}`);
  };

  if (loading) return <div className="text-center py-8">Đang tải...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  const brandsToShow = brands.slice(
    currentPage * logosPerPage,
    currentPage * logosPerPage + logosPerPage
  );

  return (
    <div className="bg-white p-3 max-w-8xl mx-auto relative">
      {/* <div className="text-center"> */}
        <h2 className=" py-3 text-3xl font-semibold text-purple-400">Thương hiệu</h2>
      {/* </div> */}
      <div className="relative">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`absolute left-3 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-shadow duration-200 border
          ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          className={`absolute right-3 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-shadow duration-200 border
          ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-7 gap-2 w-full mx-auto px-4 py-6">
          {brandsToShow.map((brand) => (
            <div
              key={brand.branD_ID}
              onClick={() => handleBrandClick(brand.branD_ID)}
              className=" text-black h-52 rounded-lg  flex flex-col justify-center items-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              <img
                src={brand.branD_IMAGE ? `${API_IMAGE}/${brand.branD_IMAGE}` : '/placeholder-image.jpg'}
                alt={brand.branD_NAME}
                className="h-52 object-contain mb-3"
              />
              <span className="text-center font-semibold text-sm">{brand.branD_NAME}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandLogos;
