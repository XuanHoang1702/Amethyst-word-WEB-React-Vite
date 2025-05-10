// import { useState } from 'react';
// import { CreditCard, Copy, CheckCircle, ArrowRight } from 'lucide-react';

// export default function QRPaymentDisplay() {
//   const [copied, setCopied] = useState(false);
//   const [activeTab, setActiveTab] = useState('qr');
  
//   const bankInfo = {
//     bankName: "BIDV",
//     accountNumber: "6150889954",
//     accountName: "NGUYỄN VĂN A",
//     amount: "10,000 VND"
//   };
  
//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md">
//         {/* Header */}
//         <div className="bg-blue-600 text-white p-4 text-center">
//           <h2 className="text-xl font-bold">Thanh Toán QR</h2>
//           <p className="text-sm opacity-80">Quét mã để thanh toán nhanh chóng</p>
//         </div>
        
//         {/* Tab Navigation */}
//         <div className="flex border-b">
//           <button 
//             className={`flex-1 py-3 font-medium text-sm ${activeTab === 'qr' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('qr')}
//           >
//             Mã QR
//           </button>
//           <button 
//             className={`flex-1 py-3 font-medium text-sm ${activeTab === 'bank' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('bank')}
//           >
//             Thông tin ngân hàng
//           </button>
//         </div>
        
//         {/* QR Tab Content */}
//         {activeTab === 'qr' && (
//           <div className="p-6 flex flex-col items-center">
//             <div className="border-2 border-gray-200 rounded-lg p-2 mb-4">
//               <img 
//                 src="https://qr.sepay.vn/img?bank=BIDV&acc=6150889954&template=compact&amount=10000" 
//                 alt="QR Code Payment" 
//                 className="w-64 h-64"
//               />
//             </div>
//             <p className="text-gray-500 text-sm text-center mb-4">
//               Sử dụng ứng dụng ngân hàng hoặc ví điện tử để quét mã QR
//             </p>
//             <div className="bg-blue-50 p-3 rounded-lg w-full">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-700">Số tiền:</span>
//                 <span className="font-bold text-blue-600">{bankInfo.amount}</span>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* Bank Info Tab Content */}
//         {activeTab === 'bank' && (
//           <div className="p-6">
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center space-x-2">
//                   <CreditCard size={20} className="text-blue-600" />
//                   <span className="text-gray-600">Ngân hàng</span>
//                 </div>
//                 <span className="font-medium">{bankInfo.bankName}</span>
//               </div>
              
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center space-x-2">
//                   <ArrowRight size={20} className="text-blue-600" />
//                   <span className="text-gray-600">Tên tài khoản</span>
//                 </div>
//                 <span className="font-medium">{bankInfo.accountName}</span>
//               </div>
              
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center space-x-2">
//                   <ArrowRight size={20} className="text-blue-600" />
//                   <span className="text-gray-600">Số tài khoản</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="font-medium">{bankInfo.accountNumber}</span>
//                   <button 
//                     onClick={() => copyToClipboard(bankInfo.accountNumber)}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
//                   </button>
//                 </div>
//               </div>
              
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center space-x-2">
//                   <ArrowRight size={20} className="text-blue-600" />
//                   <span className="text-gray-600">Số tiền</span>
//                 </div>
//                 <span className="font-medium">{bankInfo.amount}</span>
//               </div>
//             </div>
            
//             <button 
//               className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//               onClick={() => setActiveTab('qr')}
//             >
//               Xem mã QR
//             </button>
//           </div>
//         )}
        
//         {/* Footer */}
//         <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
//           <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</p>
//         </div>
//       </div>
//     </div>
//   );
// }