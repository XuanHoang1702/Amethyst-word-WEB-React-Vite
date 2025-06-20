import { FaEye, FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useWishlist } from '../../context/WishListContext';
import { addToCart } from '../../service/Cart.Service';
import { AddWishList } from '../../service/WishList.Service';
import { formatPrice } from '../../utils/formatUtils';
import { getProductImage } from '../../service/Product.Service';
import { useState, useEffect } from 'react';
const API_IMAGE = import.meta.env.VITE_API_IMAGE;
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

const AllProductCard=({product})=>{
  const [imageUrl, setImageUrl] = useState('');
  const {incrementCount} = useWishlist();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  // const handleAddToCart = async()=>{
  //   try{
  //     if(!token)
  //     {
  //       toast.info('Vui lòng đăng nhập đêr thêm sản phẩm');
  //       return;
  //     }
  //     const response = await addToCart(token, product.producT_ID, 1);
  //     if(response.code === 201)
  //     {
  //       toast.success('Thêm giỏ hàng thành công ');
  //       setTimeout(()=>{
  //         window.location.reload();
  //       },2000)
  //     }
  //     else{
  //       toast.error(res.message);
  //     }
  //   }
  //   catch(error)
  //   {
  //     console.error('Error adding to cart:', error);
  //     toast.error('Thêm vào giỏ hàng thất bại');

  //   }
  // }
  useEffect(()=>{
    const fetchImage =async()=>{
      try{
        const response = await getProductImage(product.producT_ID);
        setImageUrl(response[0].imagE_NAME);
      }
      catch(error){
        console.error('Error fetching product image:', error);
      }
    }
    fetchImage();
  },[product.producT_ID])
  const handleAddToWishList = async () => {
    if (token) {
      const response = await AddWishList(token, product.producT_ID);
      if (response.code === 201) {
        toast.success('Thêm vào danh sách yêu thích thành công!');
        incrementCount();
      } else {
        toast.error(response.message || 'Thêm vào danh sách yêu thích thất bại!');
      }
    } else {
      toast.error('Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích.');
    }
  };

  const isNew = product.producT_PRICE;
  const isOnSale = product.discounT_PERCENT;
  const isBestSeller = product.isBestSeller;
  const displayPrice = product.discounT_PERCENT ? product.producT_PRICE * (1-product.discounT_PERCENT/100) : product.producT_PRICE;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="relative">
        <img

          src={imageUrl ? `${API_IMAGE}/${imageUrl}` : '/placeholder-image.jpg'}
          alt={product.alt}
          className="w-full h-64 object-cover transition-transform group-hover:scale-105 cursor-pointer"
          onClick={() => navigate(`/details/${product.producT_ID}`)}
        />

          {isOnSale && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            GIẢM GIÁ {product.discounT_PERCENT}%
          </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          {/* <button
            className="bg-white text-gray-800 rounded-full p-2 hover:bg-blue-500 hover:text-white transition-colors"
            onClick={handleAddToCart}
          >
            <FaShoppingCart size={18} />
          </button> */}
          <button
            className="bg-white text-gray-800 rounded-full p-2 hover:bg-blue-500 hover:text-white transition-colors"
            onClick={handleAddToWishList}
          >
            <FaHeart size={18} />
          </button>
          <button
            className="bg-white text-gray-800 rounded-full p-2 hover:bg-blue-500 hover:text-white transition-colors"
            onClick={() => navigate(`/details/${product.producT_ID}`)}
          >
            <FaEye size={18} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3
          className="font-medium text-gray-800 hover:text-blue-500 transition-colors mb-1 cursor-pointer text-center"
          onClick={() => navigate(`/details/${product.producT_ID}`)}
        >
          {product.producT_NAME}
        </h3>
        <div className="flex items-center justify-center mb-2">
          {renderStars(product.rate)}
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {isOnSale ? (
              <>
                <span className="font-medium text-red-500">{formatPrice(displayPrice)}</span>
                <span className="text-gray-400 text-sm line-through ml-1">{formatPrice(product.producT_PRICE)}</span>
              </>
            ) : (
              <span className="font-medium text-gray-800">{formatPrice(displayPrice)}</span>
            )}
          </div>
          <button
            className="text-blue-500 text-sm hover:underline"
            onClick={() => navigate(`/details/${product.producT_ID}`)}
          >
            Mua ngay
          </button>
        </div>
    </div>
    </div>
  )
}

export default AllProductCard;