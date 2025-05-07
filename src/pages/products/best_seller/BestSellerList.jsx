import React from 'react';
import BestSellerCard from './BestSellerCard';
import { bestsellerProducts, newProducts } from '../../../service/ProductData';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa' 
import ProductCard from '../new/ProductCard';
const BestSellerList = () => {

    return (

           <div className="max-w-full mx-auto px-4 py-10">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-3xl font-semibold text-purple-400 ">Sản phẩm bán chạy </h1>
                            <Link to='/shop' className="flex items-center gap-2 text-blue-600 hover:underline">
                      <span>Xem thêm</span>
                      <FaArrowRight />
                    </Link>
                        </div>
            
                        {/* Products grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                            {bestsellerProducts.map(product => (
                                <BestSellerCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
    );
};

export default BestSellerList;

