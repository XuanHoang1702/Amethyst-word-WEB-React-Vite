import React from 'react'
import { MdDelete } from "react-icons/md";
import CartItem from './CartItem';
import { cartProducts } from '../../service/CartData';


const CartContent = () => {

  return (
    <div>
    {cartProducts.length > 0 ? (
        cartProducts.map((product) => <CartItem key={product.id} product={product} />)
    ) : (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
    )}
</div>
  )
}

export default CartContent

