import React, { useEffect, useState } from 'react';
import { getCart } from '../../service/CartService';
import CartItem from './CartItem';

const CartContent = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(token);
        setCartProducts(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [token]);
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

