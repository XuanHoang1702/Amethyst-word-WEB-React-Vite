import React from "react";
import { useParams } from 'react-router-dom';
import ProductReviews from "../ProductReviews";
import ProductRelateList from "../related/ProductRelateList";
import ProductDetail from "./ProductDetail";

const Details = () => {
  const { id } = useParams();
  console.log(id);

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

  return (
    <div className="justify-center items-center max-w-full p-20">
      <ProductDetail
        id = {id}
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
