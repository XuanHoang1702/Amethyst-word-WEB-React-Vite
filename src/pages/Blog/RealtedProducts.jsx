import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import {formatPrice} from '../../utils/formatUtils'
import { relatedProducts } from '../../service/ProductData';
const RelatedProducts = ({ productIds }) => {
  // In a real app, you would fetch products based on productIds
  // For this example, we'll create sample products

  // Format price with Vietnamese currency


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
          <div className="relative">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
            </Link>
            
            {product.isNew && (
              <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                MỚI
              </div>
            )}
            
            {product.salePrice && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                GIẢM GIÁ
              </div>
            )}
            
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button className="bg-white text-gray-800 rounded-full p-2 hover:bg-blue-500 hover:text-white transition-colors">
                <ShoppingCart size={18} />
              </button>
              <button className="bg-white text-gray-800 rounded-full p-2 hover:bg-blue-500 hover:text-white transition-colors">
                <Heart size={18} />
              </button>
              <button className="bg-white text-gray-800 rounded-full p-2 hover:bg-blue-500 hover:text-white transition-colors">
                <Eye size={18} />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <Link to={`/product/${product.id}`}>
              <h3 className="font-medium text-gray-800 hover:text-blue-500 transition-colors mb-1">
                {product.name}
              </h3>
            </Link>
            
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
            </div>
            
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
              <Link
                to={`/product/${product.id}`}
                className="text-blue-500 text-sm hover:underline"
              >
                Mua ngay
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedProducts;