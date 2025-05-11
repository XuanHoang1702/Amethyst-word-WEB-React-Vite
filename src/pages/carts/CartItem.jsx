/** @file src/components/ui/CartItem.jsx */
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { deleteCart } from '../../service/CartService';
import { formatPrice } from '../../utils/formatUtils';
/**
 * CartItem component for displaying a single product in the cart
 * @param {Object} props
 * @param {Object} props.product - Product details
 * @param {number} props.product.id - Product ID
 * @param {string} props.product.name - Product name
 * @param {string} props.product.size - Product size
 * @param {string} props.product.color - Product color
 * @param {number} props.product.quantity - Product quantity
 * @param {number} props.product.price - Product price
 * @param {string} props.product.image - Product image URL
 */
const CartItem = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const token = localStorage.getItem('token');

  const handleDelete = async () => {
    try {
      const res = await deleteCart(token, product.producT_ID);
      if (res.code === 200) {
        toast.success('Xóa sản phẩm thành công');
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
        <img
          src={`https://imgur.com/${product.imagE_NAME}`}
          alt={product.name}
          className="w-20 h-24 object-cover mr-4 rounded border-2 border-[#6666e5]"
        />
        <div>
          <h3>{product.producT_NAME}</h3>
          <p className="text-sm text-gray-500">
            Size: {product.size} | Color: {product.color}
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
      <div>
        <p className="font-medium">{formatPrice(product.producT_PRICE)}</p>
        <button onClick={handleDelete}>
          <MdDelete className="h-6 w-6 mt-2 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;