import React, { useState } from 'react';
import { Star, Minus, Plus } from 'lucide-react';

const ProductDetail = ({ product, colors, sizes, productThumbnails }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Lớn');
  const [selectedColor, setSelectedColor] = useState('olive');
  const [mainImage, setMainImage] = useState(productThumbnails[0].image);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      );
    }
    return stars;
  };

  const handleThumbnailClick = (thumbnailImage) => {
    setMainImage(thumbnailImage);
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col md:flex-row">
            <div className="bg-gray-100 rounded-lg p-4 flex-1 flex items-center justify-center mb-4 md:mb-0 ">
              <img src={mainImage} alt="Sản phẩm" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 ml-3 p-1">
              {productThumbnails.map((thumbnail) => (
                <div
                  key={thumbnail.id}
                  className="border border-gray-200 p-2 rounded cursor-pointer hover:border-black transition-colors"
                  onClick={() => handleThumbnailClick(thumbnail.image)}
                >
                  <img src={thumbnail.image} alt={thumbnail.alt} className="w-16 h-20 object-cover md:w-24 md:h-28" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="ml-2 text-gray-500">{product.reviews}</span>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold mr-3">${product.price}</span>
              <span className="text-xl text-gray-400 line-through mr-3">${product.oldPrice}</span>
              <span className="bg-red-100 text-red-600 px-2 py-1 text-sm rounded">-{product.discount}%</span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Chọn màu</h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    className={`w-8 h-8 rounded-full ${color.color} ${selectedColor === color.id ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                    onClick={() => setSelectedColor(color.id)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Chọn kích cỡ</h3>
              <div className="flex space-x-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button className="px-3 py-2" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={16} />
                </button>
                <span className="px-3 py-2">{quantity}</span>
                <button className="px-3 py-2" onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>
              <button className="flex-1 bg-[#6666e5] text-white py-2 px-4 rounded-md hover:bg-gray-800">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Mô tả sản phẩm</h2>
          <p className="text-gray-600">{product.longDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
