import { Heart } from 'lucide-react';
import { wishlistData } from '../../../service/profileData';

export default function WishlistTab() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Sản phẩm yêu thích</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistData.map(item => (
          <div key={item.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm group hover:shadow-md transition">
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
              <button className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full text-slate-700 hover:text-red-500 hover:bg-white transition">
                <Heart size={18} className="fill-current" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-sm text-slate-800 font-medium mb-2 line-clamp-2 min-h-12">{item.name}</h3>
              <div className="flex items-center">
                <p className="text-indigo-700 font-semibold">{item.price}</p>
                {item.originalPrice && (
                  <p className="text-slate-500 text-sm line-through ml-2">{item.originalPrice}</p>
                )}
              </div>
              <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}