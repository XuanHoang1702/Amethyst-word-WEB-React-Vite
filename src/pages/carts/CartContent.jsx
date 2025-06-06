import { lazy, Suspense, useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { getCart } from '../../service/CartService';
const CartItem = lazy(() => import('./CartItem'));
const CartContent = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const token = localStorage.getItem('token');
  const {updateCartCount} = useCart();
  const {selectedItems, selectAllItems, clearSelectedItems} = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (token === null || !token) {
          const cartItem = JSON.parse(localStorage.getItem("cartItem"));
          if(cartItem === null || cartItem.length === 0)
            setCartProducts([]);
          else setCartProducts(cartItem)
          await updateCartCount();
          return;
        }
        const data = await getCart(token);
        if(data[0].producT_ID === null){
          setCartProducts([]);
          await updateCartCount();
          return 
        }

        setCartProducts(data);
        await updateCartCount();
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [token]);

  const handleSelectAll =(e)=>{
    if(e.target.checked){
      selectAllItems(cartProducts);
    }else{
      clearSelectedItems()
    }
  }
  
  return (
    <div>
      {cartProducts.length > 0 ? (
        <>
          <div className='flex items-center p-4 border-b'>
            <input
              type="checkbox"
              checked={selectedItems.length === cartProducts.length && cartProducts.length > 0}

              onChange={handleSelectAll}
              className="w-5 h-5 accent-[#6666e5] mr-2"

            />
              <span className="text-sm font-medium">
              Chọn tất cả ({cartProducts.length} sản phẩm)
            </span>

          </div>
        <Suspense fallback={<p>Loading cart items...</p>}>
          {cartProducts.map((product) => <CartItem key={product.producT_ID} product={product} />)}
        </Suspense>
        </>
        ) : (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      )}
  </div>
  )
}

export default CartContent;

