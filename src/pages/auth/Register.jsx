import {
  FaPhoneAlt,
  FaTransgenderAlt
} from "react-icons/fa";
import {
  MdEmail,
  MdOutlineDriveFileRenameOutline
} from "react-icons/md";
import {
  RiLockPasswordFill
} from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import React from "react";
import bg1 from '../../assets/image/mau-tim-mac-voi-mau-gi-dep__18__fa7d6ebb66c840ac870291c9405730bc.webp';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/otp');
  };

  return (
    <div className="flex justify-center items-center pt-16 ">
      <div className="w-1/2 hidden lg:block">
        <img src={bg1} alt="Placeholder" className="object-cover w-auto h-full" />
      </div>
      <div className="w-2/3 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg shadow-lg w-full sm:w-96">
          <h1 className="text-2xl font-semibold mb-4 text-purple-400 text-center">ĐĂNG KÝ</h1>
          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-600">Họ</label>
              <div className="relative">
                <input type="text" id="firstName" name="firstName"
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  autoComplete="off" />
                <MdOutlineDriveFileRenameOutline className="absolute left-2 top-3 text-purple-400" />
              </div>
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-600">Tên</label>
              <div className="relative">
                <input type="text" id="lastName" name="lastName"
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  autoComplete="off" />
                <MdOutlineDriveFileRenameOutline className="absolute left-2 top-3 text-purple-400" />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">Email</label>
              <div className="relative">
                <input type="email" id="email" name="email"
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  autoComplete="off" />
                <MdEmail className="absolute left-2 top-3 text-purple-400" />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-600">Số điện thoại</label>
              <div className="relative">
                <input type="text" id="phone" name="phone"
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  autoComplete="off" />
                <FaPhoneAlt className="absolute left-2 top-3 text-purple-400" />
              </div>
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-600">Giới tính</label>
              <div className="relative">
                <FaTransgenderAlt className="absolute left-2 top-3 text-purple-400" />
                <select id="gender" name="gender"
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">Mật khẩu</label>
              <div className="relative">
                <input type="password" id="password" name="password"
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  autoComplete="off" />
                <RiLockPasswordFill className="absolute left-2 top-3 text-purple-400" />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-600">Nhập lại mật khẩu</label>
              <div className="relative">
                <input type="password" id="confirmPassword" name="confirmPassword"
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  autoComplete="off" />
                <RiLockPasswordFill className="absolute left-2 top-3 text-purple-400" />
              </div>
            </div>

            {/* Remember me */}
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
              <label htmlFor="remember" className="text-gray-600 ml-2">Ghi nhớ đăng nhập</label>
            </div>

            {/* Forgot password */}
            <div className="mb-6 text-blue-500 text-center">
              <a href="/password-reset" className="hover:underline">Quên mật khẩu?</a>
            </div>

            {/* Submit button */}
            <button type="submit" className="bg-[#6666e5] hover:bg-purple-400 text-white font-semibold rounded-md py-2 px-4 w-full">
              Đăng ký
            </button>
          </form>

          {/* Link to login */}
          <div className="mt-6 text-blue-500 text-center">
            <Link to="/login" className="hover:underline">Đăng nhập tại đây</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
