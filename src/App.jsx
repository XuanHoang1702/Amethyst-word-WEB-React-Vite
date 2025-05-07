import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React ,{lazy, Suspense} from 'react';
// import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import WomanShop from './pages/shop/WomanShop';
import ContactUs from './components/layout/Contact';
import Wishlist from './pages/Wishlist/Wishlist';
// import Details from './pages/products/detail/Details';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserLayout from './components/layout/UserLayout';
// import PersonalInfoPage from './pages/checkout/PersonalInfoPage';
// import About from './pages/About/ABout';
import QRPaymentDisplay from './pages/checkout/QRPaymentDisplay.JSX';
import FashionCheckout from './pages/checkout/FashionCheckout';
// import Profile from './pages/Profile/Profile';
import FashionBlog from './pages/Blog/FashionBlog';
import FashionUserProfile from './pages/Profile/FashionUserProfile';
import OTPForm from './pages/auth/OTPForm';
import AccessoryShop from './pages/shop/AccessoryShop';
import ManShop from './pages/shop/ManShop';
// import UserProfile from './pages/Profile/UserProfile';
const Details = lazy(() => import('./pages/products/detail/Details'));
const Home = lazy(()=>import('./pages/home/Home'));

// const Cart = lazy(() => import('./pages/Cart'));

const App  = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path='/otp' element={<OTPForm />} />
          <Route index element={<Home />} /> 
          <Route path="/shop" element={<Shop />} />
          <Route path="/woman" element={<WomanShop />} />
          <Route path="/man" element={<ManShop />} />
          <Route path= "/accessory" element={<AccessoryShop />} />
          <Route path="/contact" element={<ContactUs />} /> 
          <Route path="/wishlist" element={<Wishlist />} /> 
          <Route path="details/:id" element={<Details />} />
          <Route path="/checkout" element={<FashionCheckout/>}/>
          <Route path="/paymentqr" element={<QRPaymentDisplay/>}/>
          <Route path="/blog" element={<FashionBlog/>}/>
          <Route path ='/profile' element={<FashionUserProfile />}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;