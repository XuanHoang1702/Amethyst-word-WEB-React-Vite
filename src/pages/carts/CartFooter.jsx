import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {formatPrice} from '../../utils/formatUtils'
import { useCart } from '../../context/CartContext'

const CartFooter= () =>{
  const { cartItems } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    const total = cartItems.reduce((sum, item)=> sum + (item.producT_PRICE * item.quantity), 0);
    setSubtotal(total);
  }, [cartItems]);

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
      disabled={subtotal === 0}
      className={`w-full ${subtotal ===0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#6666e5] hover:bg-gray-800'} text-white py-3 rounded-lg font-semibold transition`}
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
