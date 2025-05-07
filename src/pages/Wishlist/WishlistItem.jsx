// WishlistItem.jsx
import React from "react";
import { Heart } from "lucide-react";
import { IoHeartDislike } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
const WishlistItem = ({ item }) => {
  return (
    
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm group hover:shadow-md transition">
      <div className="aspect-h-4 aspect-w-3 relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-300"
        />
        {item.discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{item.discount}
          </span>
        )}
        <button className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-slate-700 hover:text-red-500 hover:bg-white transition">
          <IoHeartDislike size={20} className="fill-current " />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-sm text-slate-800 font-medium mb-2 line-clamp-2 min-h-12">
          {item.name}
        </h3>
        <div className="flex items-center">
          <p className="text-red-500 font-semibold">{item.price}</p>
          {item.originalPrice && (
            <p className="text-slate-500 text-sm line-through ml-2">
              {item.originalPrice}
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
