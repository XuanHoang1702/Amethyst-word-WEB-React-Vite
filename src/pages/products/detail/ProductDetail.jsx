import { useState } from 'react';
import { Star, ChevronDown, Minus, Plus, MoreHorizontal } from 'lucide-react';
import img1 from '../../../assets/image/p01.jpg'
import img2 from '../../../assets/image/p02.jpg'
export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Lớn');
  const [selectedColor, setSelectedColor] = useState('olive');
  const [mainImage, setMainImage] = useState(img1);

  const colors = [
    { id: 'olive', color: 'bg-olive-800' },
    { id: 'navy', color: 'bg-blue-900' },
    { id: 'black', color: 'bg-black' }
  ];

  const sizes = ['Nhỏ', 'Vừa', 'Lớn', 'X-Lớn'];

  const productThumbnails = [
    { id: 1, image: img1, alt: 'Áo thun mặt trước' },
    { id: 2, image: img2, alt: 'Áo thun mặt bên' },
    { id: 3, image: img1, alt: 'Áo thun mặt sau' },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Samantha D.',
      rating: 5,
      date: '14 tháng 8, 2023',
      comment: 'Áo thun này rất sáng! Thiết kế độc đáo và vải rất thoải mái. Là một nhà thiết kế, tôi đánh giá cao sự chú ý đến chi tiết. Nó đã trở thành chiếc áo tôi yêu thích.',
      verified: true
    },
    {
      id: 2,
      name: 'Alex M.',
      rating: 4,
      date: '15 tháng 8, 2023',
      comment: 'Áo thun này vượt qua mong đợi của tôi! Màu sắc rực rỡ và chất lượng giá cả rất hợp lý. Là một nhà thiết kế UX/UI, tôi rất kén chọn về thẩm mỹ, và chiếc áo này chắc chắn nhận được sự đồng tình của tôi.',
      verified: true
    },
    {
      id: 3,
      name: 'Ethan R.',
      rating: 4,
      date: '16 tháng 8, 2023',
      comment: 'Chiếc áo thun này có thiết kế tối giản độc đáo rất tốt. Thiết kế tối giản nhưng rất phong cách đã thu hút tôi, và vừa vặn rất tuyệt. Tôi có thể thấy dấu ấn của nhà thiết kế trong mỗi chi tiết của chiếc áo này!',
      verified: true
    },
    {
      id: 4,
      name: 'Olivia P.',
      rating: 4,
      date: '17 tháng 8, 2023',
      comment: 'Chất lượng chiếc áo này rất ấn tượng và vải rất mềm mại. Điều duy nhất tôi lo ngại là kích thước bình thường của tôi lại hơi rộng. Rõ ràng nhà thiết kế đã bỏ rất nhiều sáng tạo vào việc làm cho chiếc áo này nổi bật.',
      verified: true
    },
    {
      id: 5,
      name: 'Liam K.',
      rating: 5,
      date: '18 tháng 8, 2023',
      comment: 'Áo thun này là sự kết hợp giữa sự thoải mái và sự sáng tạo. Vải mềm mại và thiết kế phản ánh tài năng của nhà thiết kế. Nó giống như mặc một tác phẩm nghệ thuật!',
      verified: true
    },
    {
      id: 6,
      name: 'Ava H.',
      rating: 5,
      date: '19 tháng 8, 2023',
      comment: 'Đây không chỉ là mặc một chiếc áo thun, tôi đang mặc một phần triết lý thiết kế. Các chi tiết tinh xảo và cách bố trí cẩn thận của thiết kế này khiến chiếc áo trở thành một chủ đề trò chuyện.',
      verified: true
    }
  ];

  const relatedProducts = [
    {
      id: 1,
      name: 'Polo có viền đối lập',
      price: 212,
      originalPrice: 242,
      discount: '12%',
      image: '/api/placeholder/150/200'
    },
    {
      id: 2,
      name: 'Áo thun gradient graphic',
      price: 145,
      originalPrice: null,
      discount: null,
      image: '/api/placeholder/150/200'
    },
    {
      id: 3,
      name: 'Polo có chi tiết viền',
      price: 180,
      originalPrice: null,
      discount: null,
      image: '/api/placeholder/150/200'
    },
    {
      id: 4,
      name: 'Áo thun sọc đen',
      price: 120,
      originalPrice: 150,
      discount: '20%',
      image: '/api/placeholder/150/200'
    }
  ];
  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
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
        {/* Breadcrumb */} 
        <div className="text-sm text-gray-500 mb-20">
        </div>

        {/* Phần Sản Phẩm */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Hình ảnh sản phẩm */}
          <div className="flex flex-col md:flex-row">
  {/* Hình ảnh chính */}
  <div className="bg-gray-100 rounded-lg p-4 flex-1 flex items-center justify-center mb-4 md:mb-0 ">
    <img 
      src={mainImage} 
      alt="Sản phẩm" 
      className="w-full h-full object-cover"
    />
  </div>

  {/* Hình ảnh thu nhỏ */}
  <div className="flex items-center flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 ml-3 p-1">
    {productThumbnails.map((thumbnail) => (
      <div 
        key={thumbnail.id} 
        className="border border-gray-200 p-2 rounded cursor-pointer hover:border-black transition-colors"
        onClick={() => handleThumbnailClick(thumbnail.image)}
      >
        <img 
          src={thumbnail.image} 
          alt={thumbnail.alt} 
          className="w-16 h-20 object-cover md:w-24 md:h-28"
        />
      </div>
    ))}
  </div>
</div>

          {/* Thông tin sản phẩm */}
          <div>
            <h1 className="text-3xl font-bold mb-2">ÁO THUN MÀU ONE LIFE</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {renderStars(4.5)}
              </div>
              <span className="ml-2 text-gray-500">405</span>
            </div>
            
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold mr-3">$260</span>
              <span className="text-xl text-gray-400 line-through mr-3">$300</span>
              <span className="bg-red-100 text-red-600 px-2 py-1 text-sm rounded">-40%</span>
            </div>
            
            <p className="text-gray-600 mb-6">
              Đây là chiếc áo thun graphic hoàn hảo cho mọi dịp. Được làm từ chất liệu vải mềm mại và thoáng khí, mang đến sự thoải mái và phong cách.
            </p>
            
            {/* Chọn màu */}
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
                
            {/* Chọn kích cỡ */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Chọn kích cỡ</h3>
              <div className="flex space-x-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size 
                        ? 'bg-black text-white' 
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Số lượng và Thêm vào giỏ */}
            <div className="flex space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  className="px-3 py-2"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="px-3 py-2">{quantity}</span>
                <button 
                  className="px-3 py-2"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <button className="flex-1 bg-[#6666e5] text-white py-2 px-4 rounded-md hover:bg-gray-800">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>

        {/* Mô tả sản phẩm */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Mô tả sản phẩm</h2>
          <p className="text-gray-600">
            Đây là chiếc áo thun graphic hoàn hảo cho mọi dịp. Được làm từ chất liệu vải mềm mại và thoáng khí, mang đến sự thoải mái và phong cách. Phù hợp với mọi kiểu trang phục và dễ dàng kết hợp với nhiều món đồ khác nhau.
          </p>
        </div>

        {/* Đánh giá sản phẩm */}
        {/* <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Đánh giá</h2>
          {reviews.map((review) => (
            <div key={review.id} className="mb-6">
              <div className="flex items-center">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="ml-2 text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
              <div className="mt-2">
                {review.verified && (
                  <span className="text-sm text-green-600">Đã xác minh</span>
                )}
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
