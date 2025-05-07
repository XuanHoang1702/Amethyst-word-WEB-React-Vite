import React from 'react'
import ProductCard from '../new/ProductCard'
import { saleproducts } from '../../../service/ProductData'
import SaleCard from './SaleCard'
import { FaArrowRight } from 'react-icons/fa' 
import { Link } from 'react-router-dom'
const SaleList=()=> {
    return(
        <div className="max-w-full mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold text-purple-400 ">Sản phẩm giảm giá  </h1>
            <Link to='/shop' className="flex items-center gap-2 text-blue-600 hover:underline">
      <span>Xem thêm</span>
      <FaArrowRight />
    </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {saleproducts.map(product => (
                <SaleCard key={product.id} product={product} />
            ))}
        </div>
    </div>
    )
}
export default SaleList