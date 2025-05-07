// import { useState } from 'react';
// import { User, MapPin, Mail, Phone, Camera, Edit2, ShoppingBag, Heart, Clock, LogOut, CreditCard, Settings, ChevronRight } from 'lucide-react';
// import img1 from '../../assets/image/P3.jpg'
// export default function FashionUserProfile() {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [user, setUser] = useState({
//     name: 'Nguyễn Văn A',
//     email: 'nguyenvana@example.com',
//     phone: '0912345678',
//     address: 'Số 123 Đường ABC, Quận 1, TP. Hồ Chí Minh',
//     avatar: '/api/placeholder/150/150'
//   });

//   const tabs = [
//     { id: 'profile', label: 'Thông tin cá nhân', icon: <User size={18} /> },
//     { id: 'orders', label: 'Đơn hàng của tôi', icon: <ShoppingBag size={18} /> },
//     { id: 'wishlist', label: 'Sản phẩm yêu thích', icon: <Heart size={18} /> },
//     { id: 'history', label: 'Lịch sử xem', icon: <Clock size={18} /> },
//     { id: 'payment', label: 'Phương thức thanh toán', icon: <CreditCard size={18} /> },
//     { id: 'settings', label: 'Cài đặt tài khoản', icon: <Settings size={18} /> }
//   ];

//   // Dữ liệu mẫu cho đơn hàng
//   const orders = [
//     { id: '#ORD-12345', date: '22/04/2025', total: '2.500.000₫', status: 'Đã giao hàng', statusColor: 'bg-teal-100 text-teal-800' },
//     { id: '#ORD-12344', date: '15/04/2025', total: '1.200.000₫', status: 'Đang vận chuyển', statusColor: 'bg-blue-100 text-blue-800' },
//     { id: '#ORD-12343', date: '08/04/2025', total: '950.000₫', status: 'Đang chuẩn bị', statusColor: 'bg-purple-100 text-purple-800' }
//   ];

//   // Dữ liệu mẫu cho danh sách sản phẩm yêu thích
//   const wishlistItems = [
//     { id: 1, name: 'Áo khoác denim wash màu xanh indigo', price: '950.000₫', originalPrice: '1.250.000₫', discount: '24%', image: img1 },
//     { id: 2, name: 'Quần âu slim fit xanh navy', price: '850.000₫', originalPrice: '950.000₫', discount: '10%', image: img1 },
//     { id: 3, name: 'Áo sơ mi linen trắng kem', price: '745.000₫', originalPrice: '', discount: '', image: img1},
//     { id: 4, name: 'Giày da Chelsea boots đen', price: '1.450.000₫', originalPrice: '1.650.000₫', discount: '12%', image: img1 }
//   ];

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 mt-20">
//       {/* Sidebar */}
//       <div className="w-full md:w-72 bg-white border-r border-slate-200 md:min-h-screen ">
//         <div className="flex flex-col items-center p-8 border-b border-slate-100">
//           <div className="relative">
//             <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 shadow-sm">
//               <img 
//                 src={user.avatar} 
//                 alt="User avatar" 
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <button className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 rounded-full shadow-md transition">
//               <Camera size={14} />
//             </button>
//           </div>
//           <h2 className="mt-4 text-xl font-semibold text-slate-800">{user.name}</h2>
//           <p className="text-slate-500 text-sm">{user.email}</p>
//         </div>

//         <nav className="p-4">
//           <ul className="space-y-1">
//             {tabs.map(tab => (
//               <li key={tab.id}>
//                 <button
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left transition ${
//                     activeTab === tab.id
//                       ? 'bg-indigo-50 text-indigo-700 font-medium'
//                       : 'text-slate-600 hover:bg-slate-100'
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <span className={`mr-3 ${activeTab === tab.id ? 'text-indigo-700' : 'text-slate-400'}`}>{tab.icon}</span>
//                     <span>{tab.label}</span>
//                   </div>
//                   <ChevronRight size={16} className={activeTab === tab.id ? 'text-indigo-500' : 'text-slate-400'} />
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className="p-4 mt-auto">
//           <button className="flex items-center text-slate-600 hover:text-red-500 px-4 py-2 rounded-lg w-full hover:bg-slate-100 transition">
//             <LogOut size={18} className="mr-3" />
//             <span>Đăng xuất</span>
//           </button>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 p-6 md:p-8 overflow-y-auto">
//         {activeTab === 'profile' && (
//           <div>
//             <h1 className="text-2xl font-bold text-slate-800 mb-6">Thông tin cá nhân</h1>
            
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
//               <div className="p-6 flex justify-between items-center border-b border-slate-100">
//                 <h2 className="text-lg font-semibold text-slate-800">Chi tiết tài khoản</h2>
//                 <button className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium">
//                   <Edit2 size={16} className="mr-1" />
//                   <span>Chỉnh sửa</span>
//                 </button>
//               </div>

//               <div className="p-6">
//                 <div className="grid md:grid-cols-2 gap-8">
//                   <div className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium text-slate-500 mb-1">Họ và tên</label>
//                       <div className="flex items-center">
//                         <User size={16} className="text-slate-400 mr-2" />
//                         <p className="text-slate-700">{user.name}</p>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-slate-500 mb-1">Email</label>
//                       <div className="flex items-center">
//                         <Mail size={16} className="text-slate-400 mr-2" />
//                         <p className="text-slate-700">{user.email}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium text-slate-500 mb-1">Số điện thoại</label>
//                       <div className="flex items-center">
//                         <Phone size={16} className="text-slate-400 mr-2" />
//                         <p className="text-slate-700">{user.phone}</p>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-slate-500 mb-1">Địa chỉ</label>
//                       <div className="flex items-center">
//                         <MapPin size={16} className="text-slate-400 mr-2" />
//                         <p className="text-slate-700">{user.address}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//               <div className="p-6 flex justify-between items-center border-b border-slate-100">
//                 <h2 className="text-lg font-semibold text-slate-800">Địa chỉ giao hàng</h2>
//                 <button className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium">
//                   <span className="text-lg mr-1">+</span>
//                   <span>Thêm địa chỉ</span>
//                 </button>
//               </div>

//               <div className="p-6">
//                 <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-indigo-300 transition cursor-pointer">
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex items-center">
//                       <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium mr-2">
//                         Mặc định
//                       </span>
//                       <p className="font-medium text-slate-800">{user.name}</p>
//                     </div>
//                     <button className="text-indigo-600 hover:text-indigo-700 text-sm">Chỉnh sửa</button>
//                   </div>
//                   <p className="text-slate-600 text-sm mb-1">{user.phone}</p>
//                   <p className="text-slate-600 text-sm">{user.address}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'orders' && (
//           <div>
//             <h1 className="text-2xl font-bold text-slate-800 mb-6 ">Đơn hàng của tôi</h1>
            
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-slate-200">
//                   <thead className="bg-slate-50">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Mã đơn hàng</th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ngày mua</th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tổng tiền</th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Trạng thái</th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"></th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-slate-200">
//                     {orders.map((order, index) => (
//                       <tr key={index} className="hover:bg-slate-50 transition">
//                         <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-indigo-600">{order.id}</td>
//                         <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500">{order.date}</td>
//                         <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-800">{order.total}</td>
//                         <td className="px-6 py-5 whitespace-nowrap">
//                           <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${order.statusColor}`}>
//                             {order.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
//                           <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
//                             Chi tiết
//                             <ChevronRight size={16} className="ml-1" />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'wishlist' && (
//           <div>
//             <h1 className="text-2xl font-bold text-slate-800 mb-6 ">Sản phẩm yêu thích</h1>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
//               {wishlistItems.map(item => (
//                 <div key={item.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm group hover:shadow-md transition">
//                   <div className="aspect-h-4 aspect-w-3 relative overflow-hidden">
//                     <img 
//                       src={item.image} 
//                       alt={item.name} 
//                       className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-300" 
//                     />
//                     {item.discount && (
//                       <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
//                         -{item.discount}
//                       </span>
//                     )}
//                     <button className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full text-slate-700 hover:text-red-500 hover:bg-white transition">
//                       <Heart size={18} className="fill-current" />
//                     </button>
//                   </div>
//                   <div className="p-4">
//                     <h3 className="text-sm text-slate-800 font-medium mb-2 line-clamp-2 min-h-12">{item.name}</h3>
//                     <div className="flex items-center">
//                       <p className="text-indigo-700 font-semibold">{item.price}</p>
//                       {item.originalPrice && (
//                         <p className="text-slate-500 text-sm line-through ml-2">{item.originalPrice}</p>
//                       )}
//                     </div>
//                     <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition">
//                       Thêm vào giỏ
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === 'history' && (
//           <div>
//             <h1 className="text-2xl font-bold text-slate-800 mb-6">Lịch sử xem sản phẩm</h1>
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//               <div className="text-center py-12">
//                 <Clock size={48} className="mx-auto text-slate-300 mb-4" />
//                 <h3 className="text-slate-600 font-medium mb-2">Chưa có sản phẩm nào được xem gần đây</h3>
//                 <p className="text-slate-500 text-sm mb-4">Khám phá bộ sưu tập của chúng tôi để tìm thấy phong cách phù hợp với bạn</p>
//                 <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition">
//                   Khám phá ngay
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'payment' && (
//           <div>
//             <h1 className="text-2xl font-bold text-slate-800 mb-6">Phương thức thanh toán</h1>
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//               <div className="text-center py-12">
//                 <CreditCard size={48} className="mx-auto text-slate-300 mb-4" />
//                 <h3 className="text-slate-600 font-medium mb-2">Chưa có phương thức thanh toán nào</h3>
//                 <p className="text-slate-500 text-sm mb-4">Thêm phương thức thanh toán để có trải nghiệm mua sắm nhanh chóng</p>
//                 <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition">
//                   Thêm phương thức thanh toán
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'settings' && (
//           <div>
//             <h1 className="text-2xl font-bold text-slate-800 mb-6">Cài đặt tài khoản</h1>
//             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//               <div className="p-6 border-b border-slate-200">
//                 <h2 className="text-lg font-semibold text-slate-800 mb-1">Thông báo</h2>
//                 <p className="text-sm text-slate-500">Quản lý cài đặt thông báo của bạn</p>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="text-slate-700 font-medium">Thông báo đơn hàng</h3>
//                       <p className="text-slate-500 text-sm">Nhận thông báo về trạng thái đơn hàng</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input type="checkbox" value="" className="sr-only peer" defaultChecked />
//                       <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
//                     </label>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="text-slate-700 font-medium">Khuyến mãi</h3>
//                       <p className="text-slate-500 text-sm">Nhận thông báo về khuyến mãi và sự kiện</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input type="checkbox" value="" className="sr-only peer" defaultChecked />
//                       <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
//                     </label>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="text-slate-700 font-medium">Bản tin</h3>
//                       <p className="text-slate-500 text-sm">Nhận bản tin hàng tháng về xu hướng thời trang</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input type="checkbox" value="" className="sr-only peer" />
//                       <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }