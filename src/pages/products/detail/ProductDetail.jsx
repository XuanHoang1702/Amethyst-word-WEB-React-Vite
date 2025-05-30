import { Minus, Plus, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { GetProductDetail, ProductColors, ProductSizes } from '../../../service/ProductService';
import { API_URL } from '../../../service/Api';
import { ShoppingBag } from 'lucide-react';
import { formatPrice } from '../../../utils/formatUtils';
import { toast } from 'react-toastify';
import { addToCart } from '../../../service/CartService';
const ProductDetail = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const token = localStorage.getItem('token');

  //const [mainImage, setMainImage] = useState(productThumbnails[0].image);
  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (id === undefined || id === null) {
        throw new Error("ID sản phẩm không hợp lệ");
      }
      const response = await GetProductDetail(id);
      if (!response || !response.data) {
        throw new Error("Không tìm thấy thông tin sản phẩm");
    }
    if (response.data.producT_ID !== parseInt(id)) {
      throw new Error("Thông tin sản phẩm không chính xác");
  }
      setProduct(response.data);
      console.log("Product: ", response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setError(error.message || "Có lỗi xảy ra khi tải thông tin sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductColors = async ()=>{
    try{
      const response = await ProductColors(id);

      setColors(response);
    }
    catch(error)
    {
      setError(error.message || "Không thể tải danh sách màu sắc");
    }
  }

  const fetchProductSizes = async ()=>{
  try{
    const response = await ProductSizes(id);
  
      setSizes(response)
  
  }
  catch(error)
  {
    setError(error.message || "Không thể tải danh sách size");
  }
  }

  useEffect(() => {

    fetchProductDetail();
    fetchProductColors();
    fetchProductSizes();
    
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-96">
      <div className="text-red-500">{error}</div>
    </div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center h-96">
      <div className="text-gray-500">Không tìm thấy sản phẩm</div>
    </div>;
  }
 const calculateDiscountedPrice = (originalPrice, discountPercent)=>{
  if(!discountPercent) return originalPrice;
  const discount = (originalPrice * discountPercent) /100;
  return originalPrice - discount
 }

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


  const handleAddToCart = async ()=>{
    try{
      if(!token) {
        toast.info('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
        return 
      }
      if(!selectedColor){
        toast.error('Vui lòng chọn màu sắc');
        return;
      }
      if(!selectedSize){
        toast.error('Vui lòng chọn kích cỡ');
        return;
      }
      const response = await addToCart(token, product.producT_ID, quantity,selectedColor.id, selectedSize.id  );
      if(response.code === 201)
      {
        toast.success('Thêm sản phẩm vào giỏ hàng thành công');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(response.message || 'Thêm sản phẩm vào giỏ hàng thất bai');
      }
    }
    catch(error)
    {
      toast.error('Thêm sản phẩm vào giỏ hàng thất bai');
    }
  }
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col md:flex-row">
            <div className="bg-gray-100 rounded-lg p-4 flex-1 flex items-center justify-center mb-4 md:mb-0 ">
              {/* <img src={product.imagE_NAME ? `https://i.imgur.com/${product.imagE_NAME}` : '/placeholder-image.jpg'} alt="Sản phẩm" className="w-full h-full object-cover" /> */}
              <img src={product.imagE_NAME ? `${API_URL}/images/${product.imagE_NAME}` : '/placeholder-image.jpg'}/>
            </div>
            <div className="flex items-center flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 ml-3 p-1">

            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.producT_NAME}</h1>
            <div className="flex items-center mb-4">
              <div className="flex">{renderStars(product.rate)}</div>
              <span className="ml-2 text-gray-500">{product.reviews}</span>
            </div>
            <div className="flex items-center mb-4">
          {product.discounT_PERCENT && product.discounT_PERCENT > 0 ? (
            <>
              <span className="text-2xl font-bold text-red-600 mr-3">
                {formatPrice(calculateDiscountedPrice(product.producT_PRICE, product.discounT_PERCENT))}
              </span>
              <span className="text-xl text-gray-400 line-through mr-3">
                {formatPrice(product.producT_PRICE)}
              </span>
              <span className="bg-red-100 text-red-600 px-2 py-1 text-sm rounded">
                -{product.discounT_PERCENT}%
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold mr-3">
              {formatPrice(product.producT_PRICE)}
            </span>
          )}
        </div>

            <p className="text-gray-600 mb-6">{product.producT_DESCRIPTION || product.producT_DETAIL}</p>
            <div className="mb-6">
              <h3 className="text-xl text-purple-600 font-bold mb-3">Chọn màu</h3>
              <div className="flex space-x-3">
                {colors.map(colorObj => {
                  const colorMap = {
                    'Đen': '#000000',
                    'Trắng': '#FFFFFF',
                    'Đỏ': '#FF0000',
                    'Xanh dương': '#0000FF',
                    'Tím': '#800080',
                    'Xám': '#A9A9A9',
                    'Nâu'   :'#D2691E',
                    'Hồng': '#FFC0CB',
                    'Xanh lá': '#008000',
                    'Vàng chuẩn': "#FFFF00",
                    "Vàng": "#FFFF00",
                  };
                  const colorCode = colorMap[colorObj.coloR_NAME] || 'No color';
                  return (
                    <button
                      key={colorObj.id}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor?.id === colorObj.id ? 'border-blue-500' : 'border-gray-300'}`}
                      style={{ backgroundColor: colorCode }}
                      onClick={() => {
                        setSelectedColor(colorObj);
                        setSelectedSize(null);
                      }}
                      title={colorObj.coloR_NAME} 
                    >
                      {colorCode === '#FFFFFF' && (
                        <div className="w-full h-full rounded-full border border-gray-300"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-xl text-purple-600 font-bold mb-3">Chọn kích cỡ</h3>
              <div className="flex space-x-3">
                {sizes.map(sizeObj => (
                  <button
                    key={sizeObj.id}
                    className={`px-3 py-1 border rounded ${selectedSize === sizeObj.id ? 'border-blue-500' : 'border-gray-300'}`}
                    onClick={() => setSelectedSize(sizeObj)}
                  >
                    {sizeObj.sizE_NAME}
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
              <button className="flex bg-[#6666e5] text-white py-2 px-4 rounded-md hover:bg-gray-800" onClick={handleAddToCart}>
                <ShoppingBag size={16} className="mr-2"  />
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default ProductDetail;
