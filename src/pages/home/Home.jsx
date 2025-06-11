import Banner from '../../components/layout/Banner';

import BannerSection from '../../components/layout/BannerSection';
import BrandLogos from '../brand/BrandLogo';
import CategoryList from '../categories/CategoryList';
import { ProductList } from '../products';
import BestSellerList from '../products/best_seller/BestSellerList';
import SaleList from '../products/sale/SaleList';
const Home = () => {
    return (
      <div className="justify-center items-center max-w-full p-20"> 
          <div className="flex flex-col justify-center items-center ">
            <Banner />
          </div>
          <div className="w-full my-7">
            <BrandLogos/>
            <BannerSection/>
            <CategoryList/>
            <section> 
              <ProductList />
            </section>
            <div className="justify-center items-center max-w-full">
              <BestSellerList/>
            </div>
            <div className="justify-center items-center max-w-full">
              <SaleList/>
            </div>
          </div>
        </div>
      );
  }

export default Home;
