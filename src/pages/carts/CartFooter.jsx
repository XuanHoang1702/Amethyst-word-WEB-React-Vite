import React from 'react'
import { cartProducts } from '../../service/CartData'
import { useNavigate } from 'react-router-dom'
import {formatPrice} from '../../utils/formatUtils'
const CartFooter= () =>{
    const subtotal = cartProducts.reduce((total, product)=>total+product.price*product.quantity,0)
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleContinueShopping = () => {
        navigate('/');
    };

  return (
    <div className="p-4 bg-white sticky bottom-0 space-y-2">
    <p className="text-lg font-semibold">Tổng thanh toán:{formatPrice(subtotal)} </p>
    
    <button 
      onClick={handleCheckout}
      className="w-full bg-[#6666e5] text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
    >
        Thanh toán
    </button>

    <button
      onClick={handleContinueShopping}
      className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
    >
      Tiếp tục mua sắm
    </button>

    <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
        Shipping, taxes, and discount codes calculated at checkout
    </p>
</div>
  )
}

export default CartFooter
