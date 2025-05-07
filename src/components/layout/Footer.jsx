import React from 'react';
import { FaEnvelope, FaFacebookF, FaHeadset, FaInstagram, FaMapMarkerAlt, FaPhone, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    const contactInfo = {
        address: '123 Đường Chính, Thành phố, Quốc gia',
        phone: '+123 456 7890',
        email: 'info@example.com',
        hotline: '+098 765 4321',
    };

    return (
        <footer className="bg-[#6666e5] text-white py-10 ">
            <div className="container mx-auto px-4">
   
                <div className="flex justify-center mb-6">
                    <a href="#" className="mx-2 text-white hover:text-purple-700"><FaFacebookF /></a>
                    <a href="#" className="mx-2 text-white hover:text-purple-700"><FaTwitter /></a>
                    <a href="#" className="mx-2 text-white hover:text-purple-700"><FaInstagram /></a>
                    <a href="#" className="mx-2 text-white hover:text-purple-700"><FaYoutube /></a>
                </div>

                <div className="flex justify-center mb-6 space-x-6 uppercase font-medium text-sm">
                    <Link to="/" className="hover:text-purple-700">Trang Chủ</Link>
                    <Link to="/man" className="hover:text-purple-700">Nam</Link>
                    <Link to="/woman" className="hover:text-purple-700">Nữ</Link>
                    <Link to="/shop" className="hover:text-purple-700">Các Sản phẩm</Link>
                    <Link to="/blog" className="hover:text-purple-700">Blog</Link>
                    <Link to="/about" className="hover:text-purple-700">Giới Thiệu</Link>
                    <Link to="/contact" className="hover:text-purple-700">Liên Hệ</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                    {/* Giới thiệu về chúng tôi */}
                    <div>
                        <h3 className="font-bold mb-4">VỀ CHÚNG TÔI</h3>
                        <p className="text-white">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Đây là đoạn văn mẫu thay thế cho phần giới thiệu về chúng tôi.
                        </p>
                    </div>

                    {/* Đăng ký nhận tin */}
                    <div>
                        <h3 className="font-bold mb-4">ĐĂNG KÝ NHẬN TIN</h3>
                        <input 
                            type="email" 
                            placeholder="Nhập email của bạn" 
                            className="w-full p-2 mb-4 text-gray-900 rounded" 
                        />
                        <button className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800">ĐĂNG KÝ</button>
                    </div>

                    {/* Hỗ trợ khách hàng */}
                    <div>
                        <h3 className="font-bold mb-4">HỖ TRỢ KHÁCH HÀNG</h3>
                        <p className="text-white">
                            Nếu cần hỗ trợ, vui lòng liên hệ đội ngũ chăm sóc khách hàng của chúng tôi. Chúng tôi luôn sẵn sàng giúp bạn giải đáp mọi thắc mắc hoặc vấn đề.
                        </p>
                    </div>

                    {/* Thông tin liên hệ */}
                    <div>
                        <h3 className="font-bold mb-4">THÔNG TIN LIÊN HỆ</h3>
                        <div className="text-white">
                            <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /> ĐỊA CHỈ: {contactInfo.address}</p>
                            <p className="flex items-center"><FaPhone className="mr-2" /> ĐIỆN THOẠI: {contactInfo.phone}</p>
                            <p className="flex items-center"><FaEnvelope className="mr-2" /> EMAIL: {contactInfo.email}</p>
                            <p className="flex items-center"><FaHeadset className="mr-2" /> HOTLINE: {contactInfo.hotline}</p>
                        </div>
                    </div>
                </div>

                {/* Phần bản quyền */}
                <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-white">© 2024 Bản quyền thuộc về Free Html Templates</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
