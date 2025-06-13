/** @file src/components/ui/CartItem.jsx */
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { deleteCart } from '../../service/CartService';
import { formatPrice } from '../../utils/formatUtils';
const API_URL = import.meta.env.VITE_API_URL;

/**
 * 
 * @param {Object} props
 * @param {Object} props.product 
 * @param {number} props.product.id 
 * @param {string} props.product.name 
 * @param {string} props.product.size 
 * @param {string} props.product.color 
 * @param {number} props.product.quantity 
 * @param {number} props.product.price 
 * @param {string} props.product.image
 */
const CartItem = ({ product }) => {
  console.log("Cart item: ", product)
  const [quantity, setQuantity] = useState(product.quantity);
  const {selectedItems=[], toggleSelectedItem} = useCart();
  const { updateCartCount, updateQuantity } = useCart();
  const token = localStorage.getItem('token');
  
  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(product.producT_ID, newQuantity);
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    updateQuantity(product.producT_ID, newQuantity);
  };

  

  const handleDelete = async () => {
    try {
      if (!token) {
        toast.info('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
        return;
      }
      const res = await deleteCart(token, product.producT_ID);
      if (res.code === 200) {
        toast.success('Xóa sản phẩm thành cong');
        await updateCartCount();
        setTimeout(() => {
          window.location.reload();
        }, 2000);

      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Xóa sản phẩm thất bại');
    }
  }; 

  return (
    <div className="flex items-start justify-between py-4 border-b">
      <div className="flex items-start">
      <input
          type='checkbox'
          checked={selectedItems.includes(product.producT_ID)}
          onChange={() => toggleSelectedItem(product.producT_ID)}
          className="mr-4 mt-8 w-5 h-5 accent-[#6666e5]"
        />
        <img
           src={product.imagE_NAME ? `${API_URL}/images/${product.imagE_NAME}` : '/placeholder-image.jpg'}
          alt={product.name}
          className="w-24 h-28 object-cover mr-4 rounded border-2 border-[#6666e5]"
        />
        <div>
          <h3>{product.producT_NAME}</h3>
          <p className="text-sm text-gray-500">
            Size: {product.sizE_NAME} | Color: {product.coloR_NAME}
          </p>
          <div className="flex items-center mt-2">
            <button
              className="border rounded px-2 py-1 text-xl font-medium"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <span className="mx-2">{quantity}</span>
            <button
              className="border rounded px-2 py-1 text-xl font-medium"
              onClick={increaseQuantity}
            >
              +
            </button>
            
          </div>
        </div>
      </div>
      
      <div className="text-xl text-right font-semibold">
        <p>{formatPrice(product.producT_PRICE * quantity)} </p>
        <div className="ml-2">
          <button onClick={handleDelete}>
            <MdDelete className="text-red-500 text-3xl mt-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem
