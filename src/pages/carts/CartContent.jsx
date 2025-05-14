import { lazy, Suspense, useEffect, useState } from 'react';
import { getCart } from '../../service/CartService';
const CartItem = lazy(() => import('./CartItem'));

const CartContent = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (token === null) {
          setCartProducts([]);
          return;
        }
        const data = await getCart(token);
        setCartProducts(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [token]);

  //const validCartProducts = cartProducts.filter(p => p.producT_ID !== null);

  return (
    <div>
      {cartProducts.length > 0 ? (
        <Suspense fallback={<p>Loading cart items...</p>}>
          {cartProducts.map((product) => <CartItem key={product.producT_ID} product={product} />)}
        </Suspense>
        ) : (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      )}
  </div>
  )
}

export default CartContent

