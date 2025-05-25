// WishlistItem.jsx
import React, { useState } from "react";
import { Heart } from "lucide-react";
import { IoHeartDislike } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { API_URL } from "../../service/Api";
import { DeleteWishList } from "../../service/WishListService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishListContext";
const WishlistItem = ({ item, OnDelete}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate()
  const {decrementCount, updateWishListCount} = useWishlist();
  const token = localStorage.getItem('token');
  
  const DeleteToWishList = async () => {
    if (!token || isDeleting) {
      if(!token)
      {
        toast.error("Bạn cần đăng nhập để thực hiện chức năng này");
      }
      return;
    }
    
    setIsDeleting(true)
    try {
      const response = await DeleteWishList(token, item.producT_ID);
      if (response && (response.code === 201 || response.code === 200 || response.code === undefined || response.code === null)) {
        decrementCount();
        OnDelete(item);
        toast.success('Xóa sản phẩm khỏi danh sách yêu thích thành công!');
      } else {
        toast.error(response.message || 'Xóa sản phẩm thất bại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa sản phẩm');
    }
    finally{
      setIsDeleting(false);
    }
  }
  return (
    
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm group hover:shadow-md transition">
      <div className="aspect-h-4 aspect-w-3 relative overflow-hidden">
      <img
          // src={`${API_URL}/images/${item.imagE_NAME}`}
          src={item.imagE_NAME ? `https://i.imgur.com/${item.imagE_NAME}.jpg` : '/placeholder-image.jpg'}
          alt={item.alt}
          className="w-full h-64 object-cover transition-transform group-hover:scale-105 cursor-pointer"
          onClick={() => navigate(`/details/${item.producT_ID}`)}
        />
        {item.discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{item.discount}
          </span>
        )}
        <button className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-slate-700 hover:text-red-500 hover:bg-white transition"
        onClick={DeleteToWishList} >
          <IoHeartDislike size={20} className="fill-current " />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-xl text-purple-600 font-medium mb-2 line-clamp-2 min-h-12">
          {item.producT_NAME}
        </h3>
        <div className="flex items-center">
          <p className="text-red-500 font-semibold">{item.producT_PRICE}</p>
          {item.originalPrice && (
            <p className="text-slate-500 text-sm line-through ml-2">
              {item.producT_PRICE}
            </p>
          )}
        </div>
        <button className="w-full mt-2 p-4 mr-2 flex items-center justify-center  bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition">
         <FaShoppingCart size={25} />
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
