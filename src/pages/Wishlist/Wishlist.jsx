// Wishlist.jsx
import React from "react";
import { wishlistData } from "../../service/WishlistData";
import WishlistItem from "./WishlistItem"; 
import Breadcrumb from "../../components/BreadCrumb";

const Wishlist = () => {
  return (
    <div className = 'pt-[60px]'>
    <div className="flex flex-col min-h-screen bg-white">
            
      <div className="relative">
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-64 md:h-96 w-full ">
      <img 
              // src={bg1}
              alt="Fashion Blog Hero" 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white text-center">Sản phẩm yêu thích  </h1>
              <Breadcrumb   items={[{ label: 'Sản phẩm yêu thích ' }]} />
              {/* Search Bar */}
            </div>
          </div>
        </div>
    <div className="justify-center items-center max-w-auto p-20">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Sản phẩm yêu thích</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {wishlistData.map(item => (
          <WishlistItem key={item.id} item={item} />
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default Wishlist;
