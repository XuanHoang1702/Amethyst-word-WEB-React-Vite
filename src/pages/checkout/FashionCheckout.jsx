import { ArrowRight, Check, CheckCircle, ChevronLeft, ChevronRight, Clock, Copy, CreditCard, Home, ShoppingBag, Truck, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { getCart } from '../../service/CartService';
import { CreateOrder, GetStatus } from '../../service/OrderService';
import { GetAddress, GetInformation } from '../../service/UserService';
import WebSocketService from '../../service/WebSocket.Service';
import {CreateOrderDetail} from '../../service/OrderDetailService';
export default function FashionCheckout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('qr');
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [address, setAddress] = useState([]);
  const {cartItems, selectedItems} = useCart();
  const [orderDetail, setOrderDetails] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingMethod, setShippingMethod] = useState('');
  const [shipPrice, setShipPrice] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  
  let intervalId = null;
  const handleHome = () => {
    navigate('/');
  };
  useEffect(() => {
    if (orderId) {
      WebSocketService.connectWebSocket(orderId, (msg) => {
        setMessage(msg);
        toast.success(msg);
        setCurrentStep(4);
      });
    }

    return () => {
      WebSocketService.closeWebSocket();
    };
  }, [orderId]);

  const fetchUserData = async () => {
    try {
      const userInfo = await GetInformation(token);
      setUser(userInfo.user_Inf);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchAddress = async () => {
    try {
      const response = await GetAddress(token);
      setAddress(response);
    }
    catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(()=>{
    if(cartItems && cartItems.length > 0)
    {
      const selectedProducts = cartItems.filter(item=>selectedItems.includes(item.producT_ID)
    )
      const formattedItems = selectedProducts.map(item=>({
        producT_ID: item.producT_ID,
        quantity: item.quantity,
        producT_PRICE: Number(item.producT_PRICE),
        subtotal: Number(item.producT_PRICE * item.quantity)
      }
      ))
      setOrderDetails(formattedItems);

      const totalQty = formattedItems.reduce((sum ,item)=>
      sum + Number(item.quantity),0);
      setTotalQuantity(totalQty);

      const total = formattedItems.reduce((sum, item)=>
      sum + Number(item.subtotal),0);
      setTotalPrice(total);
    }
    else{
      setOrderDetails([]);
      setTotalQuantity(0);
      setTotalPrice(0);
    }
  },[cartItems, selectedItems])

  // const fetchOrderStatus = async () => {
  //   try {
  //     if(orderId){
  //       const response = await GetStatus(token, orderId);

  //       setOrderStatus(response.result);
  //       if (orderStatus === "2") {
  //         toast.success("Đặt hàng thành công");
  //         setCurrentStep(4);
  //       }
  //     }

  //   } catch (error) {
  //     console.error("Error fetching order status:", error);
  //   }
  // };

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = {
        addresS_ID: address[0].id,
        totaL_QUANTITY: totalQuantity,
        totaL_PRICE: totalPrice + shipPrice,
        note: shippingMethod,
        ordeR_STATUS: 1,
      }

      const response = await CreateOrder(token, data);
      setOrderId(response.result);
    }catch (error) {
      console.error("Error placing order:", error);
    }
  }

  const handleOrderDetail = async () => {
    try {
      const response = await CreateOrderDetail(orderId, orderDetail);
      
    }
      catch(error)
      {
        console.error("Error placing order:", error);
      }
  }
      

  useEffect(() => {
    fetchUserData();
    fetchAddress();
  }, []);
  
  const bankInfo = {
    bankName: "BIDV",
    accountNumber: "6150889954",
    accountName: "Trần Xuân Hoàng",
    amount: "1,100,000 VND"
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlaceOrder = () => {
    setCurrentStep(4);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8 ">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep === step ? 'bg-[#6666e5] text-white' : currentStep > step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
              {currentStep > step ? <Check size={16} /> : step}
            </div>
            {step < 4 && (
              <div className={`h-1 w-16 ${currentStep > step ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderOrderSummary = () => {
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Tóm tắt đơn hàng</h3>
        <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto pr-2">
          {cartItems.filter(item=> selectedItems.includes(item.producT_ID)).map(item => (
            <div key={item.id} className="flex space-x-4">
              <img src={`https://imgur.com/${item.imagE_NAME}`} alt={item.producT_NAME} className="w-16 h-20 object-cover rounded" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{item.producT_NAME}</h4>
                <div className="text-sm text-gray-500">
                  <span>Size: {item.sizE_NAME}</span> | <span>Màu: {item.coloR_NAME}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">x{item.quantity}</span>
                  <span className="font-medium">{item.producT_PRICE.toLocaleString('vi-VN')} VND</span>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Tạm tính</span>
            <span>{totalPrice.toLocaleString('vi-VN')} VND</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phí vận chuyển</span>
            <span>{shipPrice.toLocaleString('vi-VN')} VND</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tổng số lượng</span>
            <span>{totalQuantity} Sản phẩm</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Tổng cộng</span>
            <span>{(totalPrice + shipPrice).toLocaleString('vi-VN')} VND</span>
          </div>
        </div>
      </div>
    );
  };
  
  const renderAddressStep = () => {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Thông tin giao hàng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Họ và tên</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" value = { user.USER_LAST_NAME } />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Số điện thoại</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" value={ user.USER_PHONE} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" value={ user.USER_EMAIL } />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Địa chỉ</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={address.map(item =>
                `${item.typE_ADDRESS}: ${item.housE_NUMBER}, ${item.street}, ${item.city}, ${item.country} (${item.postaL_CODE})`
              ).join(' | ')}
              readOnly
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button 
            onClick={() => {
              setCurrentStep(2);
            }}
            className="bg-[#6666e5] text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Tiếp tục <ChevronRight size={16} className="inline ml-1" />
          </button>
        </div>
      </div>
    );
  };

  const renderShippingStep = () => {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Phương thức vận chuyển</h2>
        <div className="space-y-4">
          <div className="border border-gray-300 rounded-lg p-4 hover:border-black cursor-pointer relative">
            <input type="radio" name="shipping" id="standard" className="absolute left-4 top-4" defaultChecked onChange={() =>{ 
              setShippingMethod("Miễn phí");
              setShipPrice(0);
              }}/>
            <label htmlFor="standard" className="flex items-start ml-6 cursor-pointer">
              <div className="flex-1">
                <div className="flex items-center">
                  <Truck size={18} className="mr-2" />
                  <span className="font-medium">Giao hàng tiêu chuẩn</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Nhận hàng trong 3-5 ngày làm việc</p>
              </div>
              <span className="font-medium">Miễn phí</span>
            </label>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 hover:border-black cursor-pointer relative">
            <input type="radio" name="shipping" id="express" className="absolute left-4 top-4" onChange={() => {
              setShippingMethod("Nhanh");
              setShipPrice(30000);
              }}/>
            <label htmlFor="express" className="flex items-start ml-6 cursor-pointer">
              <div className="flex-1">
                <div className="flex items-center">
                  <Clock size={18} className="mr-2" />
                  <span className="font-medium">Giao hàng nhanh</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Nhận hàng trong 1-2 ngày làm việc</p>
              </div>
              <span className="font-medium">30,000 VND</span>
            </label>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button 
            onClick={() => setCurrentStep(1)} 
            className=" border border-black text-gray-600  rounded-lg px-6 py-3 hover:text-black transition-colors"
          >
          <ChevronLeft size={16} className="inline ml-1" /> Quay lại
          </button>
          <button 
            onClick={() => {
              setCurrentStep(3);
              handleOrder();
              handleOrderDetail();
            }}
            className="bg-[#6666e5] text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Tiếp tục <ChevronRight size={16} className="inline ml-1" />
          </button>
        </div>
      </div>
    );
  };

  const renderQRPayment = () => {
    const total = cartItems.reduce((sum, item) => {
      const price = Number(item.producT_PRICE);
      return sum + price * item.quantity;
    }, 0);
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b">
          <button 
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'qr' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('qr')}
          >
            Mã QR
          </button>
          <button 
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'bank' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('bank')}
          >
            Thông tin chuyển khoản
          </button>
        </div>
        
        {activeTab === 'qr' && (
          <div className="p-6 flex flex-col items-center">
            <div className="border-2 border-gray-200 rounded-lg p-2 mb-4">
              <img 
                src={`https://qr.sepay.vn/img?bank=MBBank&acc=0335404974&template=compact&amount=${totalPrice + shipPrice}&des=${orderId}`}
                alt="QR Code Payment" 
                className="w-64 h-64"
              />
            </div>
            <p className="text-gray-500 text-sm text-center mb-4">
              Sử dụng ứng dụng ngân hàng hoặc ví điện tử để quét mã QR
            </p>
            <div className="bg-gray-50 p-3 rounded-lg w-full">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Số tiền:</span>
                <span className="font-bold text-black">{total}</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'bank' && (
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <CreditCard size={20} className="text-gray-600" />
                  <span className="text-gray-600">Ngân hàng</span>
                </div>
                <span className="font-medium">{bankInfo.bankName}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <ArrowRight size={20} className="text-gray-600" />
                  <span className="text-gray-600">Tên tài khoản</span>
                </div>
                <span className="font-medium">{bankInfo.accountName}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <ArrowRight size={20} className="text-gray-600" />
                  <span className="text-gray-600">Số tài khoản</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{bankInfo.accountNumber}</span>
                  <button 
                    onClick={() => copyToClipboard(bankInfo.accountNumber)}
                    className="text-black hover:text-gray-600"
                  >
                    {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <ArrowRight size={20} className="text-gray-600" />
                  <span className="text-gray-600">Số tiền</span>
                </div>
                <span className="font-medium">{bankInfo.amount}</span>
              </div>
            </div>
            
            <button 
              className="w-full mt-6 bg-[#6666e5] text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              onClick={() => setActiveTab('qr')}
            >
              Xem mã QR
            </button>
          </div>
        )}
      </div> 
    );
  };

  const renderPaymentStep = () => {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Phương thức thanh toán</h2>
        
        <div className="space-y-4 mb-6">
          <div 
            className={`border ${paymentMethod === 'qr' ? 'border-black' : 'border-gray-300'} rounded-lg p-4 hover:border-black cursor-pointer`}
            onClick={() => setPaymentMethod('qr')}
          >
            <div className="flex items-center">
              <input 
                type="radio" 
                name="payment" 
                id="qr" 
                checked={paymentMethod === 'qr'} 
                onChange={() => setPaymentMethod('qr')}
                className="mr-3"
              />
              <label htmlFor="qr" className="flex items-center cursor-pointer">
                <QrCode size={20} className="mr-2" />
                <span className="font-medium">Thanh toán QR/Chuyển khoản</span>
              </label>
            </div>
            
            {paymentMethod === 'qr' && (
              <div className="mt-4 pl-6">
                {renderQRPayment()}
              </div>
            )}
          </div>
          
          <div 
            className={`border ${paymentMethod === 'cod' ? 'border-black' : 'border-gray-300'} rounded-lg p-4 hover:border-black cursor-pointer`}
            onClick={() => setPaymentMethod('cod')}
          >
            <div className="flex items-center">
              <input 
                type="radio" 
                name="payment" 
                id="cod" 
                checked={paymentMethod === 'cod'} 
                onChange={() => setPaymentMethod('cod')}
                className="mr-3"
              />
              <label htmlFor="cod" className="flex items-center cursor-pointer">
                <Home size={20} className="mr-2" />
                <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
              </label>
            </div>
          </div>
          
          <div 
            className={`border ${paymentMethod === 'card' ? 'border-black' : 'border-gray-300'} rounded-lg p-4 hover:border-black cursor-pointer`}
            onClick={() => setPaymentMethod('card')}
          >
            <div className="flex items-center">
              <input 
                type="radio" 
                name="payment" 
                id="card" 
                checked={paymentMethod === 'card'} 
                onChange={() => setPaymentMethod('card')}
                className="mr-3"
              />
              <label htmlFor="card" className="flex items-center cursor-pointer">
                <CreditCard size={20} className="mr-2" />
                <span className="font-medium">Thẻ tín dụng/Ghi nợ</span>
              </label>
            </div>
          </div>
          
          <div 
            className={`border ${paymentMethod === 'wallet' ? 'border-black' : 'border-gray-300'} rounded-lg p-4 hover:border-black cursor-pointer`}
            onClick={() => setPaymentMethod('wallet')}
          >
            <div className="flex items-center">
              <input 
                type="radio" 
                name="payment" 
                id="wallet" 
                checked={paymentMethod === 'wallet'} 
                onChange={() => setPaymentMethod('wallet')}
                className="mr-3"
              />
              <label htmlFor="wallet" className="flex items-center cursor-pointer">
                <Wallet size={20} className="mr-2" />
                <span className="font-medium">Ví điện tử (Momo, ZaloPay, VNPay)</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start">
            <input type="checkbox" id="terms" className="mt-1 mr-3" />
            <label htmlFor="terms" className="text-gray-600 text-sm">
              Tôi đã đọc và đồng ý với <a href="#" className="text-black underline">Điều khoản dịch vụ</a> và <a href="#" className="text-black underline">Chính sách bảo mật</a> của cửa hàng.
            </label>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button 
            onClick={() => setCurrentStep(2)} 
                className=" border border-black text-gray-600  rounded-lg px-6 py-3 hover:text-black transition-colors"
          >
            <ChevronLeft size={16} className="inline ml-1" /> Quay lại
            
          </button>
        
          <button 
            onClick={handlePlaceOrder}
            className="bg-[#6666e5] text-white px-10 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Xác nhận đặt hàng
          </button>
        </div>
      </div>
    );
  };

  const renderOrderConfirmation = () => {
    return (
      <div className="mb-8 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Đặt hàng thành công!</h2>
        <p className="text-gray-600 mb-8">Cảm ơn bạn đã mua sắm tại Fashion Store.</p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8 mx-auto max-w-md">
          <div className="text-left mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Mã đơn hàng:</span>
              <span className="font-bold">{orderId}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Phương thức thanh toán:</span>
              <span className="font-medium">
                {paymentMethod === 'qr' && 'QR/Chuyển khoản'}
                {paymentMethod === 'cod' && 'Thanh toán khi nhận hàng (COD)'}
                {paymentMethod === 'card' && 'Thẻ tín dụng/Ghi nợ'}
                {paymentMethod === 'wallet' && 'Ví điện tử'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tổng cộng:</span>
              <span className="font-bold">{(totalPrice + shipPrice).toLocaleString('vi-VN')} VND</span>
            </div>
          </div>
          
          {paymentMethod === 'qr' && (
            <div className="text-left p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800 font-medium mb-2">Thông tin thanh toán</p>
              <p className="text-sm text-gray-600">
                Vui lòng chuyển khoản số tiền <span className="font-bold">{bankInfo.amount}</span> đến tài khoản {bankInfo.bankName} - {bankInfo.accountName} để hoàn tất đơn hàng.
              </p>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Thông tin đơn hàng đã được gửi qua email của bạn</h3>
          <p className="text-gray-600">
            Bạn có thể kiểm tra trạng thái đơn hàng bất kỳ lúc nào trong tài khoản của mình
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button className="bg-[#6666e5] text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Theo dõi đơn hàng
          </button>
          <button onClick={handleHome} className="border border-black text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  };

  const QrCode = (props) => {
    return (
      <svg 
        {...props}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <rect x="7" y="7" width="3" height="3"></rect>
        <rect x="14" y="7" width="3" height="3"></rect>
        <rect x="7" y="14" width="3" height="3"></rect>
        <rect x="14" y="14" width="3" height="3"></rect>
      </svg>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 p-12">
        <div className="flex items-center justify-center mb-10">
          <ShoppingBag className="h-8 w-8 mr-2" />
          <h1 className="text-3xl font-bold">AmethystWorld Store</h1>
        </div>
        
        {renderStepIndicator()}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={`${currentStep === 4 ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
            {currentStep === 1 && renderAddressStep()}
            {currentStep === 2 && renderShippingStep()}
            {currentStep === 3 && renderPaymentStep()}
            {currentStep === 4 && renderOrderConfirmation()}
          </div>
          
          {currentStep !== 4 && (
            <div className="lg:col-span-1">
              {renderOrderSummary()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
