import React from 'react';
import Banner from '../../components/layout/Banner';
import WhyUs from '../../components/layout/WhyUs';
import BrandLogos from '../brand/BrandLogo';
import CategoryList from '../categories/CategoryList';
import { ProductList } from '../products';
import BestSellerList from '../products/best_seller/BestSellerList';
import bannermiddle from '../../assets/image/banner-thoi-trang-nu.jpg'
import SaleList from '../products/sale/SaleList';
import SaleBanner from '../../components/layout/BannerSale';
import BlogPostCard from '../Blog/BlogPostCard';
import samplePosts from '../../service/BlogService';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import BannerSection from '../../components/layout/BannerSection';
import BrandLogos from '../brand/BrandLogo';
const Home = () => {
    return (
<div className="justify-center items-center max-w-full mx-auto"> 
    <div className="flex flex-col justify-center items-center ">
      <Banner />
    </div>
  <div className="w-full my-1">
  <CategoryList/>
  
  <div className="justify-center items-center max-w-full ">
    <BrandLogos />
    </div>
  <section>
    <div className="justify-center items-center max-w-full">
    <ProductList />
    </div>
  </section>
  <section>
    <div className="justify-center items-center max-w-full">
      <SaleList/>
    </div>
    </section>
    <section>
      <div className="justify-center items-center max-w-full">
      <BestSellerList />
      </div>
  </section>
    <section> 
    <div className="justify-between items-center max-w-full p-5 ">
                      <h1 className="text-3xl font-semibold text-purple-400 ">Bài Viết Mới Nhất </h1>
                      <Link to='/blog' className="flex items-center gap-2 text-blue-600 hover:underline">
                <span>Xem thêm</span>
                <FaArrowRight />
              </Link>
                  </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {samplePosts.slice(0, 4).map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
  </section>
      
const Home = () => {
  return (
    <div className="justify-center items-center max-w-full mx-auto">
      <div className="flex flex-col justify-center items-center">
        <Banner />
      </div>
      <div className="w-full my-10">
        <CategoryList />
        <div className="justify-center items-center max-w-full">
          <BrandLogos />
        </div>
        <section>
          <div className="justify-center items-center max-w-full">
            <ProductList />
          </div>
        </section>
        <section>
          <div className="justify-center items-center max-w-full">
            <SaleList />
          </div>
        </section>
        <section>
          <div className="justify-center items-center max-w-full">
            <BestSellerList />
          </div>
        </section>
        <section>
        </section>
      </div>
    </div>
  );
};

export default Home;
