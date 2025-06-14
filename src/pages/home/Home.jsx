import Banner from '../../components/layout/Banner';
import BrandLogos from '../brand/BrandLogo';
import CategoryList from '../categories/CategoryList';
import { ProductList } from '../products';
import BestSellerList from '../products/best_seller/BestSellerList';
import SaleList from '../products/sale/SaleList';

      
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
