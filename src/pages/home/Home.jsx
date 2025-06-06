import React from 'react';
import Banner from '../../components/layout/Banner';

import WhyUs from '../../components/layout/WhyUs';
import CategoryList from '../categories/CategoryList';
import { ProductList } from '../products';
import BestSellerList from '../products/best_seller/BestSellerList';
import bannermiddle from '../../assets/image/banner-thoi-trang-nu.jpg'
import SaleList from '../products/sale/SaleList';
import SaleBanner from '../../components/layout/BannerSale';
import BlogPostCard from '../Blog/BlogPostCard';
import samplePosts from '../../service/BlogData';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import BannerSection from '../../components/layout/BannerSection';
import BrandLogos from '../brand/BrandLogo';
import TopSale from '../../components/layout/BannerChildren';
const Home = () => {
    return (
<div className="justify-center items-center max-w-full p-20"> 
  {/* <div className="grid grid-cols-2 md:grid-cols-12 gap-3 w-full">
    <div className="md:col-span-3 bg-white">
      <TopSale />
    </div>

    <div className="md:col-span-6 ">
      <Banner />
    </div>

    
    <div className="md:col-span-3 bg-white">
      <SaleBanner />
    </div>
  </div> */}
    <div className="flex flex-col justify-center items-center ">

      <Banner />
    </div>
{/* <div className="grid grid-cols-2 md:grid-cols-12 gap-3 w-full">
    <div className="md:col-span-8 bg-white">
      <Banner />
    </div>

    <div className="md:col-span-4 ">
      <Banner />
    </div>

  </div>  */}

  <div className="w-full my-7">
 
  <CategoryList/>
  <BannerSection/>
  <BrandLogos/>
          <section> 
          <ProductList />
        </section>
            
    <div className="justify-center items-center max-w-full">
      <BestSellerList/>
    </div>
    <div className="justify-center items-center max-w-full">
      <SaleList/>
    </div>

    <section> 
    
    <div className="my-10">
    <div className="flex justify-between items-center mb-6">
                      <h1 className="text-3xl font-semibold text-purple-400 ">Bài Viết Mới Nhất </h1>
                      <Link to='/blog' className="flex items-center gap-2 text-blue-600 hover:underline">
                <span>Xem thêm</span>
                <FaArrowRight />
              </Link>
                  </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {samplePosts.slice(0, 4).map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  </section>
      
          </div>
        </div>
      );
  }

export default Home;
