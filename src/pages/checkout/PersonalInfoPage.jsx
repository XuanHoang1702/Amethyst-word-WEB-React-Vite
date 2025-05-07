// import { useState } from 'react';
// import { 
//   CreditCard, 
//   Truck, 
//   ShoppingBag, 
//   Check, 
//   ChevronRight, 
//   ArrowLeft,
//   User,
//   Phone,
//   Mail,
//   Home,
//   MapPin,
//   Shield,
//   Package
// } from 'lucide-react';

// export default function FashionCheckout() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [paymentMethod, setPaymentMethod] = useState('credit');
//   const [savedAddress, setSavedAddress] = useState(false);
  
//   const handleHome = () => {
//     navigate('/');
// };
//   // Sample cart items
//   const cartItems = [
//     { id: 1, name: "Áo thun Basic", size: "M", color: "Đen", price: 299000, quantity: 1, image: "/api/placeholder/80/100" },
//     { id: 2, name: "Quần Jeans Slim Fit", size: "32", color: "Xanh đậm", price: 599000, quantity: 1, image: "/api/placeholder/80/100" }
//   ];
  
//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const shipping = 30000;
//   const total = subtotal + shipping;
  
//   // Format currency
//   const formatCurrency = (amount) => {
//     return amount.toLocaleString('vi-VN') + ' ₫';
//   };
  
//   const nextStep = () => {
//     if (currentStep < 4) {
//       setCurrentStep(currentStep + 1);
//       window.scrollTo(0, 0);
//     }
//   };
  
//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//       window.scrollTo(0, 0);
//     }
//   };
  
//   // Steps content components
//   const CartReview = () => (
//     <div className="bg-white rounded-lg shadow-sm p-6">
//       <h2 className="text-xl font-bold mb-4">Giỏ hàng của bạn</h2>
//       <div className="space-y-4 mb-6">
//         {cartItems.map(item => (
//           <div key={item.id} className="flex items-center border-b pb-4">
//             <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded" />
//             <div className="ml-4 flex-1">
//               <h3 className="font-medium">{item.name}</h3>
//               <div className="text-sm text-gray-500">
//                 <span>Màu: {item.color}</span>
//                 <span className="mx-2">|</span>
//                 <span>Size: {item.size}</span>
//               </div>
//               <div className="mt-1 flex justify-between">
//                 <div className="flex items-center">
//                   <button className="text-gray-500 px-2">-</button>
//                   <span className="mx-2">{item.quantity}</span>
//                   <button className="text-gray-500 px-2">+</button>
//                 </div>
//                 <span className="font-medium">{formatCurrency(item.price)}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <div className="space-y-2 text-sm">
//         <div className="flex justify-between">
//           <span className="text-gray-600">Tạm tính</span>
//           <span>{formatCurrency(subtotal)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-gray-600">Phí vận chuyển</span>
//           <span>{formatCurrency(shipping)}</span>
//         </div>
//         <div className="border-t pt-2 mt-2 flex justify-between font-medium">
//           <span>Tổng cộng</span>
//           <span className="text-lg">{formatCurrency(total)}</span>
//         </div>
//       </div>
      
//       <button 
//         onClick={nextStep}
//         className="w-full mt-6 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
//       >
//         Tiếp tục <ChevronRight size={16} className="ml-1" />
//       </button>
//     </div>
//   );
  
//   const CustomerInfo = () => (
//     <div className="bg-white rounded-lg shadow-sm p-6">
//       <h2 className="text-xl font-bold mb-4">Thông tin khách hàng</h2>
      
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
//           <div className="relative">
//             <User size={18} className="absolute left-3 top-3 text-gray-400" />
//             <input 
//               type="text" 
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent" 
//               placeholder="Nguyễn Văn A"
//             />
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <div className="relative">
//               <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
//               <input 
//                 type="email" 
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent" 
//                 placeholder="example@email.com"
//               />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
//             <div className="relative">
//               <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
//               <input 
//                 type="tel" 
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent" 
//                 placeholder="0912345678"
//               />
//             </div>
//           </div>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ giao hàng</label>
//           <div className="relative">
//             <Home size={18} className="absolute left-3 top-3 text-gray-400" />
//             <input 
//               type="text" 
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent" 
//               placeholder="Số nhà, tên đường"
//             />
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố</label>
//             <div className="relative">
//               <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
//               <select className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent">
//                 <option>Hà Nội</option>
//                 <option>Hồ Chí Minh</option>
//                 <option>Đà Nẵng</option>
//               </select>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện</label>
//             <select className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent">
//               <option>Quận 1</option>
//               <option>Quận 2</option>
//               <option>Quận 3</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phường/Xã</label>
//             <select className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent">
//               <option>Phường 1</option>
//               <option>Phường 2</option>
//               <option>Phường 3</option>
//             </select>
//           </div>
//         </div>
        
//         <div className="flex items-center mt-2">
//           <input 
//             id="save-address" 
//             type="checkbox" 
//             className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded" 
//             checked={savedAddress}
//             onChange={() => setSavedAddress(!savedAddress)}
//           />
//           <label htmlFor="save-address" className="ml-2 block text-sm text-gray-600">
//             Lưu thông tin cho lần thanh toán sau
//           </label>
//         </div>
//       </div>
      
//       <div className="flex justify-between mt-6">
//         <button 
//           onClick={prevStep}
//           className="flex items-center text-gray-600 hover:text-black"
//         >
//           <ArrowLeft size={16} className="mr-1" /> Quay lại
//         </button>
        
//         <button 
//           onClick={nextStep}
//           className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center"
//         >
//           Tiếp tục <ChevronRight size={16} className="ml-1" />
//         </button>
//       </div>
//     </div>
//   );
  
//   const PaymentMethod = () => (
//     <div className="bg-white rounded-lg shadow-sm p-6">
//       <h2 className="text-xl font-bold mb-4">Phương thức thanh toán</h2>
      
//       <div className="space-y-3">
//         <div 
//           className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'credit' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
//           onClick={() => setPaymentMethod('credit')}
//         >
//           <div className="flex items-center">
//             <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'credit' ? 'border-black' : 'border-gray-300'}`}>
//               {paymentMethod === 'credit' && <div className="w-3 h-3 bg-black rounded-full"></div>}
//             </div>
//             <div className="ml-3 flex items-center">
//               <CreditCard size={20} className="mr-2" />
//               <span className="font-medium">Thẻ tín dụng/Ghi nợ</span>
//             </div>
//           </div>
          
//           {paymentMethod === 'credit' && (
//             <div className="mt-4 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Số thẻ</label>
//                 <input 
//                   type="text" 
//                   className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent" 
//                   placeholder="1234 5678 9012 3456"
//                 />
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hết hạn</label>
//                   <input 
//                     type="text" 
//                     className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent" 
//                     placeholder="MM/YY"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
//                   <input 
//                     type="text" 
//                     className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent" 
//                     placeholder="123"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Tên chủ thẻ</label>
//                 <input 
//                   type="text" 
//                   className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent" 
//                   placeholder="NGUYEN VAN A"
//                 />
//               </div>
//             </div>
//           )}
//         </div>
        
//         <div 
//           className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'banking' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
//           onClick={() => setPaymentMethod('banking')}
//         >
//           <div className="flex items-center">
//             <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'banking' ? 'border-black' : 'border-gray-300'}`}>
//               {paymentMethod === 'banking' && <div className="w-3 h-3 bg-black rounded-full"></div>}
//             </div>
//             <div className="ml-3">
//               <span className="font-medium">Chuyển khoản ngân hàng</span>
//             </div>
//           </div>
          
//           {paymentMethod === 'banking' && (
//             <div className="mt-4">
//               <div className="bg-gray-50 p-4 rounded-lg text-sm">
//                 <p className="font-medium mb-2">Thông tin chuyển khoản:</p>
//                 <p>Ngân hàng: <span className="font-medium">BIDV</span></p>
//                 <p>Số tài khoản: <span className="font-medium">6150889954</span></p>
//                 <p>Chủ tài khoản: <span className="font-medium">CÔNG TY THỜI TRANG XYZ</span></p>
//                 <p>Nội dung: <span className="font-medium">Thanh toan don hang #12345</span></p>
//                 <p className="mt-2 text-xs">Đơn hàng sẽ được xác nhận sau khi chúng tôi nhận được thanh toán của bạn.</p>
//               </div>
//             </div>
//           )}
//         </div>
        
//         <div 
//           className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
//           onClick={() => setPaymentMethod('cod')}
//         >
//           <div className="flex items-center">
//             <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-black' : 'border-gray-300'}`}>
//               {paymentMethod === 'cod' && <div className="w-3 h-3 bg-black rounded-full"></div>}
//             </div>
//             <div className="ml-3">
//               <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
//             </div>
//           </div>
          
//           {paymentMethod === 'cod' && (
//             <div className="mt-4 text-sm text-gray-600">
//               <p>Bạn sẽ thanh toán bằng tiền mặt khi nhận được đơn hàng.</p>
//             </div>
//           )}
//         </div>
//       </div>
      
//       <div className="flex justify-between mt-6">
//         <button 
//           onClick={prevStep}
//           className="flex items-center text-gray-600 hover:text-black"
//         >
//           <ArrowLeft size={16} className="mr-1" /> Quay lại
//         </button>
        
//         <button 
//           onClick={nextStep}
//           className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center"
//         >
//           Xác nhận đơn hàng <ChevronRight size={16} className="ml-1" />
//         </button>
//       </div>
//     </div>
//   );
  
//   const OrderConfirmation = () => (
//     <div className="bg-white rounded-lg shadow-sm p-6 text-center">
//       <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
//         <Check size={32} className="text-green-600" />
//       </div>
//       <h2 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h2>
//       <p className="text-gray-600 mb-6">Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.</p>
      
//       <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
//         <h3 className="font-medium mb-2">Thông tin đơn hàng #12345</h3>
//         <p className="text-sm text-gray-600">Ngày đặt hàng: 20/04/2025</p>
//         <p className="text-sm text-gray-600">Tổng tiền: {formatCurrency(total)}</p>
//         <p className="text-sm text-gray-600">Phương thức thanh toán: {
//           paymentMethod === 'credit' ? 'Thẻ tín dụng/Ghi nợ' : 
//           paymentMethod === 'banking' ? 'Chuyển khoản ngân hàng' :
//           'Thanh toán khi nhận hàng (COD)'
//         }</p>
//       </div>
      
//       <div className="mb-8">
//         <h3 className="font-medium mb-3">Trạng thái đơn hàng</h3>
//         <div className="flex justify-between items-center relative">
//           <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200"></div>
//           <div className="absolute left-0 right-2/3 top-4 h-0.5 bg-green-500"></div>
          
//           <div className="relative flex flex-col items-center">
//             <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10">
//               <Check size={16} className="text-white" />
//             </div>
//             <span className="text-xs mt-1 text-green-500">Đã xác nhận</span>
//           </div>
          
//           <div className="relative flex flex-col items-center">
//             <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center z-10">
//               <Package size={16} className="text-gray-500" />
//             </div>
//             <span className="text-xs mt-1 text-gray-500">Đang chuẩn bị</span>
//           </div>
          
//           <div className="relative flex flex-col items-center">
//             <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center z-10">
//               <Truck size={16} className="text-gray-500" />
//             </div>
//             <span className="text-xs mt-1 text-gray-500">Đang giao hàng</span>
//           </div>
//         </div>
//       </div>
      
//       <div className="flex flex-col md:flex-row justify-center gap-4">
//         <button onClick={handleHome} className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center">
//           <ShoppingBag size={16} className="mr-2" /> Tiếp tục mua sắm
//         </button>
//         <button className="border border-black text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center">
//           <Package size={16} className="mr-2" /> Theo dõi đơn hàng
//         </button>
//       </div>
//     </div>
//   );
  
//   // Checkout steps visualization
//   const CheckoutSteps = () => {
//     const steps = [
//       { number: 1, title: "Giỏ hàng", icon: ShoppingBag },
//       { number: 2, title: "Thông tin", icon: User },
//       { number: 3, title: "Thanh toán", icon: CreditCard },
//       { number: 4, title: "Xác nhận", icon: Check }
//     ];
    
//     return (
//       <div className="mb-6">
//         <div className="flex justify-between">
//           {steps.map((step, index) => (
//             <div key={step.number} className="flex flex-col items-center relative">
//               {/* Progress line */}
//               {index < steps.length - 1 && (
//                 <div className={`absolute w-full h-0.5 top-4 left-1/2 ${currentStep > step.number ? 'bg-black' : 'bg-gray-200'}`}></div>
//               )}
              
//               {/* Step circle */}
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
//                 ${currentStep >= step.number ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
//                 {currentStep > step.number ? (
//                   <Check size={16} />
//                 ) : (
//                   <step.icon size={16} />
//                 )}
//               </div>
              
//               {/* Step title */}
//               <span className={`text-xs mt-1 ${currentStep >= step.number ? 'text-black font-medium' : 'text-gray-500'}`}>
//                 {step.title}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };
  
//   // Order summary sidebar
//   const OrderSummary = () => (
//     <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
//       <h3 className="font-bold text-lg mb-4">Tóm tắt đơn hàng</h3>
      
//       <div className="space-y-3 mb-4">
//         {cartItems.map(item => (
//           <div key={item.id} className="flex items-center">
//             <img src={item.image} alt={item.name} className="w-12 h-16 object-cover rounded" />
//             <div className="ml-3 flex-1">
//               <h4 className="font-medium text-sm">{item.name}</h4>
//               <p className="text-xs text-gray-500">Size: {item.size} | {item.color}</p>
//               <div className="flex justify-between mt-1">
//                 <span className="text-xs text-gray-500">x{item.quantity}</span>
//                 <span className="text-sm font-medium">{formatCurrency(item.price)}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <div className="border-t pt-4">
//         <div className="space-y-2 text-sm">
//           <div className="flex justify-between">
//             <span className="text-gray-600">Tạm tính</span>
//             <span>{formatCurrency(subtotal)}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Phí vận chuyển</span>
//             <span>{formatCurrency(shipping)}</span>
//           </div>
//         </div>
        
//         <div className="border-t mt-4 pt-4 flex justify-between font-bold">
//           <span>Tổng cộng</span>
//           <span>{formatCurrency(total)}</span>
//         </div>
//       </div>
      
//       <div className="mt-6 py-3 px-4 bg-gray-50 rounded-lg flex items-center">
//         <Shield size={20} className="text-green-600" />
//         <span className="ml-2 text-sm">Thanh toán an toàn & bảo mật</span>
//       </div>
//     </div>
//   );
  
//   // Render checkout page layout
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4 max-w-6xl">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold">THỜI TRANG XYZ</h1>
//           <p className="text-gray-600">Thanh toán an toàn & bảo mật</p>
//         </div>
        
//         <CheckoutSteps />
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2">
//             {currentStep === 1 && <CartReview />}
//             {currentStep === 2 && <CustomerInfo />}
//             {currentStep === 3 && <PaymentMethod />}
//             {currentStep === 4 && <OrderConfirmation />}
//           </div>
          
//           <div className="lg:col-span-1">
//             {currentStep < 4 && <OrderSummary />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }