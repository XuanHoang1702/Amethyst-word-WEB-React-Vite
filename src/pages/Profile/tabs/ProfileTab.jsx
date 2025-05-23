import { Edit2, Mail, MapPin, Phone, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GetAddress } from '../../../service/UserService';

export default function ProfileTab({ user }) {
  const token = localStorage.getItem("token");
  const [address, setAddress] = useState([]);

  const fetchAddress = async () => {
    console.log("Profile :", token);
    try {
      if (token === null) {
        setAddress([]);
        return;
      }else {
        const userInfo = await GetAddress(token);
        console.log(userInfo);
        setAddress(userInfo.user_Inf.USER_ADDRESS);
      }
    }
    catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);



  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Thông tin cá nhân</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="p-6 flex justify-between items-center border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Chi tiết tài khoản</h2>
          <button className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            <Edit2 size={16} className="mr-1" />
            <span>Chỉnh sửa</span>
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Họ và tên</label>
                <div className="flex items-center">
                  <User size={16} className="text-slate-400 mr-2" />
                  <p className="text-slate-700">{user.USER_FIRST_NAME} {user.USER_LAST_NAME}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Email</label>
                <div className="flex items-center">
                  <Mail size={16} className="text-slate-400 mr-2" />
                  <p className="text-slate-700">{user.USER_EMAIL}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Số điện thoại</label>
                <div className="flex items-center">
                  <Phone size={16} className="text-slate-400 mr-2" />
                  <p className="text-slate-700">{user.USER_PHONE}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Địa chỉ</label>
                <div className="flex items-center">
                  <MapPin size={16} className="text-slate-400 mr-2" />
                  {address.map((item, index) => (
                    <p key={index}>
                      {item.typE_ADDRESS}: {item.housE_NUMBER}, {item.street}, {item.city}, {item.country} ({item.postaL_CODE})
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Địa chỉ giao hàng</h2>
          <button className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            <span className="text-lg mr-1">+</span>
            <span>Thêm địa chỉ</span>
          </button>
        </div>

        <div className="p-6">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-indigo-300 transition cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium mr-2">
                  Mặc định
                </span>
                <p className="font-medium text-slate-800">{user.USER_FIRST_NAME} {user.USER_LAST_NAME}</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm">Chỉnh sửa</button>
            </div>
            <p className="text-slate-600 text-sm mb-1">{user.USER_PHONE}</p>
            <p className="text-slate-600 text-sm">
              {address.map((item, index) => (
                <p key={index}>
                  {item.typE_ADDRESS}: {item.housE_NUMBER}, {item.street}, {item.city}, {item.country} ({item.postaL_CODE})
                </p>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}