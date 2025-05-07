import React from 'react';
import { FaHeart, FaShoppingCart, FaEye, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { relatedProducts } from '../../../service/ProductData';
import {formatPrice} from '../../../utils/formatUtils';
/**
 * Render stars based on rating
 * @param {Object} props
 * @param {Object} props.product -
 * @param {number} props.product.id 
 * @param {string} props.product.name
 * @param {number} props.product.price 
 * @param {string} props.product.src 
 * @param {string} props.product.alt 
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

// Format price function

const ProductRelateCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="relative">
        <img
          src={product.src}
          alt={product.alt}
          className="w-full h-64 object-cover transition-transform group-hover:scale-105 cursor-pointer"
          onClick={() => navigate(`/details/${product.id}`)}
        />

        {/* Badge mới */}
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            MỚI
          </div>
        )}

        {/* Badge giảm giá */}
        {product.salePrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            GIẢM GIÁ
          </div>
        )}

        {/* Hover buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button className="bg-white text-gray-800 rounded-full p-2 hover:bg-blue-500 hover:text-white transition-colors">
            <FaShoppingCart size={18} />
          </button>
          <button className="bg-white text-gray-800 rounded-full p-2 hover:bg-blue-500 hover:text-white transition-colors">
            <FaHeart size={18} />
          </button>
          <button
            className="bg-white text-gray-800 rounded-full p-2 hover:bg-blue-500 hover:text-white transition-colors"
            onClick={() => navigate(`/details/${product.id}`)}
          >
            <FaEye size={18} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3
          className="font-medium text-gray-800 hover:text-blue-500 transition-colors mb-1 cursor-pointer text-center"
          onClick={() => navigate(`/details/${product.id}`)}
        >
          {product.name}
        </h3>

        {/* Đánh giá sao */}
        <div className="flex items-center justify-center mb-2">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0})</span>
        </div>

        {/* Giá sản phẩm */}
        <div className="flex items-center justify-between">
          <div>
            {product.salePrice ? (
              <>
                <span className="font-medium text-red-500">{formatPrice(product.salePrice)}</span>
                <span className="text-gray-400 text-sm line-through ml-1">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="font-medium text-gray-800">{formatPrice(product.price)}</span>
            )}
          </div>
          <button
            className="text-blue-500 text-sm hover:underline"
            onClick={() => navigate(`/details/${product.id}`)}
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductRelateCard;

