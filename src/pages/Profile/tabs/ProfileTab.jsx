  import { Edit2, Mail, MapPin, Phone, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GetAddress, UpdateInformation } from '../../../service/UserService';

export default function ProfileTab({ user }) {
  const token = localStorage.getItem("token");
  const [address, setAddress] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: `${user.USER_FIRST_NAME || ''} ${user.USER_LAST_NAME || ''}`.trim(),
    email: user.USER_EMAIL || '',
    phone: user.USER_PHONE || '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchAddress = async () => {
    try {
      if (token === null) {
        setAddress([]);
        return;
      } else {
        const userInfo = await GetAddress(token);
        console.log(userInfo);
        setAddress(userInfo);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);


  useEffect(() => {
    if(user) {
      fetchAddress();
      setFormData({
        fullName: `${user.USER_FIRST_NAME || ''} ${user.USER_LAST_NAME || ''}`.trim(),
        email: user.USER_EMAIL || '',
        phone: user.USER_PHONE || '',
      });
    }
  }, [user]);

  const validateForm = ()=>{
    if(!formData.fullName.trim()){
      return 'Vui lòng nhập họ và tên '
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      return 'Email không hợp lệ';
    }
    if(!formData.phone.trim()){
      return 'Số điện thoại không hợp lệ '
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      return 'Số điện thoại không hợp lệ (phải có 10 chữ số)';
    }
    return null;
  }


  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage('');
    setError('');
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      fullName: `${user.USER_FIRST_NAME || ''} ${user.USER_LAST_NAME || ''}`.trim(),
      email: user.USER_EMAIL || '',
      phone: user.USER_PHONE || '',
    });
    setError('');
    setSuccessMessage('');
  };

  const handleSaveClick = async () => {
    setError('');
    setSuccessMessage('');
    const validationError = validateForm();
    if(validationError){
      setError(validationError);
      return;
    }
    try {
      const names = formData.fullName.trim().split(' ');
      if(names.length < 2)
      {
        setError('Vui lòng nhập họ và tên');
        return 
      }

      const firstName = names[0];
      const lastName = names.slice(1).join(' ');

      const response = await UpdateInformation(token, 
        {
          id: user.USER_ID,
          firstName: firstName,
          lastName: lastName,
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          gender: user.USER_GENDER || ''
        }
      )
      if(response.code === 200)
      {
        setIsEditing(false);
        setSuccessMessage('Cập nhật thông tin thành công');
      }
      else{
        setError('Lỗi cập nhật thông tin');
      }
      
    } catch (err) {
      const errorMessage = err?.message || err?.data?.message || err?.response?.data?.message || 'Lỗi cập nhật thông tin';
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Thông tin cá nhân</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="p-6 flex justify-between items-center border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Chi tiết tài khoản</h2>
          {!isEditing ? (
            <button onClick={handleEditClick} className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              <Edit2 size={16} className="mr-1" />
              <span>Chỉnh sửa</span>
            </button>
          ) : (
            <div>
              <button onClick={handleSaveClick} className="mr-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm font-medium">Lưu</button>
              <button onClick={handleCancelClick} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm font-medium">Hủy</button>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Họ và tên</label>
                {!isEditing ? (
                  <div className="flex items-center">
                    <User size={16} className="text-slate-400 mr-2" />
                    <p className="text-slate-700">{formData.fullName}</p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <User size={16} className="text-slate-400 mr-2" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded px-3 py-2"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Email</label>
                {!isEditing ? (
                  <div className="flex items-center">
                    <Mail size={16} className="text-slate-400 mr-2" />
                    <p className="text-slate-700">{formData.email}</p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Mail size={16} className="text-slate-400 mr-2" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded px-3 py-2"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Số điện thoại</label>
                {!isEditing ? (
                  <div className="flex items-center">
                    <Phone size={16} className="text-slate-400 mr-2" />
                    <p className="text-slate-700">{formData.phone}</p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Phone size={16} className="text-slate-400 mr-2" />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded px-3 py-2"
                    />
                  </div>
                )}
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
          {error && <p className="text-red-600 mt-4">{error}</p>}
          {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
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
                <p className="font-medium text-slate-800">{formData.fullName}</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm">Chỉnh sửa</button>
            </div>
            <p className="text-slate-600 text-sm mb-1">{user.USER_PHONE}</p>
            <div className="text-slate-600 text-sm">
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
  );
}