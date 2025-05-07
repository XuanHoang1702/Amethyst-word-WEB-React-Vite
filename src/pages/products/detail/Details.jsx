import React from "react";
import ProductDetail from "./ProductDetail";
import ProductReviews from "../ProductReviews";
import ProductRelateList from "../related/ProductRelateList";
import img1 from '../../../assets/image/p03.jpg';
import img2 from '../../../assets/image/PP1.jpg';
import img3 from '../../../assets/image/PP2.jpg';
import img4 from '../../../assets/image/PP3.jpg';
const Details = () => {
  const product = {
    name: 'Áo thun One Life',
    price: 260,
    oldPrice: 300,
    rating: 4.5,
    reviews: 405,
    discount: 40,
    description: 'Chất liệu mềm, thoáng mát, phù hợp với mọi lứa tuổi.',
    longDescription:
      'Chiếc áo thun One Life là lựa chọn hoàn hảo cho những ai yêu thích phong cách tối giản mà vẫn muốn nổi bật. Được làm từ chất liệu cotton cao cấp, áo mang lại cảm giác thoải mái và thoáng khí suốt cả ngày. Thiết kế hiện đại kết hợp cùng gam màu trung tính giúp bạn dễ dàng phối đồ trong mọi hoàn cảnh.'
  };

  const colors = [
    { id: 'olive', color: 'bg-olive-800' },
    { id: 'navy', color: 'bg-blue-900' },
    { id: 'black', color: 'bg-black' }
  ];

  const sizes = ['Nhỏ', 'Vừa', 'Lớn', 'X-Lớn'];

  const productThumbnails = [
    { id: 1, image: img1, alt: 'Mặt trước' },
    { id: 2, image: img2, alt: 'Mặt bên' },
    { id: 3, image: img1, alt: 'Mặt sau' }
  ];
    return (
        <div className="justify-center items-center max-w-full p-20">
        <ProductDetail
        product={product}
        colors={colors}
        sizes={sizes}
        productThumbnails={productThumbnails}
      />
            <div className="justify-center items-center max-w-full">
                <ProductReviews product={product.id}  />
            </div>
            <div className="flex justify-center items-center w-full">
                <ProductRelateList  product={product.id} />
            </div>
        </div>
    );
};

export default Details;
