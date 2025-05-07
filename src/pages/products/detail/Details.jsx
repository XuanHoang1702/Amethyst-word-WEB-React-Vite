import React from 'react';
import { useParams } from 'react-router-dom';
import ProductReviews from '../ProductReviews';
import ProductRelateList from '../related/ProductRelateList';
import ProductDetail from './ProductDetail';
const Details=()=> {
    const {id} = useParams();
  return (
  <div className="justify-center items-center max-w-full">
    {/* Hiển thị chi tiết sản phẩm */}
    <ProductDetail />
    <div className="justify-center items-center max-w-full">
        <ProductReviews/>
    </div>

    {/* Danh sách sản phẩm liên quan */}
    <div className="flex justify-center items-center w-full">
        <ProductRelateList/>
    </div>
  </div>
  )
}

export default Details