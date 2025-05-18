import React from 'react';
import { FaEye, FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddWishList } from '../../../service/WishListService';
import { formatPrice } from '../../../utils/formatUtils';
import { addToCart } from '../../../service/CartService';

/**
 * Render stars based on rating
 * @param {number} rating 
 */
const renderStars = (rating) => {
  return (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

const ProductListCard = ({ product }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const AddToWishList = async () => {
    if (token) {
      const response = await AddWishList(token, product.producT_ID);
      if(response.code === 201) {
        toast.success('Thêm vào danh sách yêu thích thành công!');
      } else {
        toast.error(response.message || 'Thêm vào danh sách yêu thích thất bại!');
      }
    } else {
      toast.error('Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích.');
    }
  }

  const handleAddToCart = async () => {
    try {
      if (!token) {
        toast.info('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
        return;
      }
      const res = await addToCart(token, product.producT_ID, 1);
      if (res.code == 201) {
        toast.success('Thêm vào giỏ hàng thành công');
        setTimeout(() => {
        window.location.reload();
      }, 2000);
      }else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Thêm vào giỏ hàng thất bại');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Phần hình ảnh - chiếm 30% chiều rộng trên desktop */}
        <div className="relative w-full md:w-1/3 h-64 ">
          <img
            src={`https://imgur.com/${product.imagE_NAME}`}
            alt={product.alt || product.producT_NAME}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/details/${product.producT_ID}`)}
          />

          {/* Badge mới */}
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
              MỚI
            </div>
          )}

          {/* Badge giảm giá */}
          {product.discounT_PERCENT && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              GIẢM {product.discounT_PERCENT}%
            </div>
          )}
        </div>

        {/* Phần thông tin sản phẩm - chiếm 70% chiều rộng trên desktop */}
        <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 
                  className="text-lg font-medium text-gray-800 hover:text-blue-500 transition-colors cursor-pointer"
                  onClick={() => navigate(`/details/${product.producT_ID}`)}
                >
                  {product.producT_NAME}
                </h3>
                
                <div className="flex items-center mt-1">
                  {renderStars(product.rate)}
                  <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0} đánh giá)</span>
                </div>
              </div>

              {/* Giá sản phẩm */}
              <div className="text-right">
                {product.salePrice ? (
                  <div className="flex flex-col">
                    <span className="font-medium text-red-500 text-lg">{formatPrice(product.salePrice)}</span>
                    <span className="text-gray-400 text-sm line-through">{formatPrice(product.producT_PRICE)}</span>
                  </div>
                ) : (
                  <span className="font-medium text-gray-800 text-lg">{formatPrice(product.producT_PRICE)}</span>
                )}
              </div>
            </div>

            {/* Mô tả sản phẩm - nếu có */}
            {product.description && (
              <p className="text-gray-600 text-sm my-2 line-clamp-2">{product.description}</p>
            )}

            {/* Các thuộc tính sản phẩm - nếu có */}
            {product.attributes && (
              <div className="flex flex-wrap gap-2 my-2">
                {product.attributes.map((attr, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {attr}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Phần nút hành động */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <button 
                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                onClick={() => navigate(`/details/${product.producT_ID}`)}
              >
                <FaEye size={16} />
                <span className="hidden sm:inline">Xem chi tiết</span>
              </button>
              <button 
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded transition-colors flex items-center gap-1"
                onClick={AddToWishList}
              >
                <FaHeart size={16} className="text-red-500" />
                <span className="hidden sm:inline">Yêu thích</span>
              </button>
            </div>
            
            <button className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors">
              <FaShoppingCart size={16} />
              <span>Mua ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;