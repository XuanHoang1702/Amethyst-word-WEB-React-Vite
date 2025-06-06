import React from "react";
import { useParams } from 'react-router-dom';
import ProductReviews from "../ProductReviews";
import ProductRelateList from "../related/ProductRelateList";
import ProductDetail from "./ProductDetail";

const Details = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  if (!productId || isNaN(productId)) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-red-500">ID sản phẩm không hợp lệ</div>
      </div>
    );
  }
  return (
    <div className="justify-center items-center max-w-full p-20">
      <ProductDetail id = {productId}
      />
      <div className="justify-center items-center max-w-full">
        <ProductReviews product={productId}  />
      </div>
      <div className="flex justify-center items-center w-full">
        <ProductRelateList  product={productId} />
      </div>
    </div>
  );
};

export default Details;
