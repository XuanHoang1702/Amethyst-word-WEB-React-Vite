import React from 'react';
import { Link } from 'react-router-dom';

// Giả sử các hình ảnh đã được import
import bannerFashion from '../../assets/image/elle-viet-nam-trang-phuc-mau-tim-quoc-te-phu-nu-2019-3.jpg'
import bannerHydrophobic from '../../assets/image/AMARO - Sale.jpeg';
import bannerElegant1 from '../../assets/image/Girly & Cute Dresses and Accessories _ Feminine, Functional & Classic.jpeg';
import bannerElegant2 from '../../assets/image/Magazin online cu designeri romani.jpeg';
import modelImage1 from '../../assets/image/Trendy Clothing & Fashion.jpeg';
import modelImage2 from '../../assets/image/Girly & Cute Dresses and Accessories _ Feminine, Functional & Classic.jpeg';
import modelImage3 from '../../assets/image/tải xuống.jpeg';

const BannerSection = () => {
  return (
    <section className="w-full my-12">
      {/* Banner chính - công thức mix match */}
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="relative">
          <img 
            className="w-full h-auto object-cover" 
            src={bannerFashion}
            alt="Công thức mix match thời thượng cho ngày giao mùa" 
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 bg-gradient-to-r from-gray-800/30 to-transparent">
            <h2 className="text-3xl md:text-5xl font-bold text-blue-400 mb-2">
              CÔNG THỨC MIX MATCH
            </h2>
            <h3 className="text-2xl md:text-4xl font-bold text-blue-500 mb-4">
              THỜI THƯỢNG
            </h3>
            <p className="text-xl md:text-2xl text-blue-300 italic">
              cho ngày giao mùa
            </p>
            <Link to="/shop" className="mt-6 px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-100 transition duration-300">
              Khám phá ngay
            </Link>
          </div>
        </div>
      </div>

      {/* Banner grid 2 hàng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Hàng 1: Hydrophobic Shorts */}
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <img 
            className="w-full h-auto object-cover" 
            src={bannerHydrophobic} 
            alt="Hydrophobic Shorts Collection" 
          />
          <div className="absolute top-0 right-0 p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600">HYDROPHOBIC</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-blue-600">SHORTS</h3>
          </div>
        </div>

        {/* Hàng 1: Model với quần áo */}
        <div className="relative rounded-lg overflow-hidden shadow-lg bg-gray-100">
          <img 
            className="w-full h-auto object-cover" 
            src={modelImage3} 
            alt="Model với quần áo thời trang" 
          />
        </div>

        {/* Hàng 2: Elegant Vibrance - Hình 1 */}
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <img 
            className="w-full h-auto object-cover" 
            src={bannerElegant1} 
            alt="Elegant Vibrance Collection - Model 1" 
          />
        </div>

        {/* Hàng 2: Elegant Vibrance - Hình 2 */}
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <img 
            className="w-full h-auto object-cover" 
            src={bannerElegant2} 
            alt="Elegant Vibrance Collection - Model 2" 
          />
          <div className="absolute bottom-0 right-0 p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-700">Elegant</h2>
            <h3 className="text-3xl md:text-4xl font-light text-white">vibrance</h3>
            <p className="text-sm text-white mt-2">SUMMER CAMPAIGN'24</p>
            <p className="text-sm text-white">NEW COLLECTION</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;