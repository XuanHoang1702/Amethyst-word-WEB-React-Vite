import React, { lazy, Suspense  } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactUs from './components/layout/Contact';
import UserLayout from './components/layout/UserLayout';
import FashionBlog from './pages/Blog/FashionBlog';
// import Wishlist from './pages/Wishlist/Wishlist';
import Login from './pages/auth/Login';
import OTPForm from './pages/auth/OTPForm';
import Register from './pages/auth/Register';
import FashionCheckout from './pages/checkout/FashionCheckout';
import ManShop from './pages/shop/ManShop';
import Shop from './pages/shop/Shop';
import WomanShop from './pages/shop/WomanShop';
import ScrollToTop from './utils/ScrollToTop';
import BlogPostDetail from './pages/Blog/BlogPostDetail';
const Details = lazy(() => import('./pages/products/detail/Details'));
const Home = lazy(()=>import('./pages/home/Home'));
const FashionUserProfile = lazy(() => import('./pages/Profile/FashionUserProfile'));
const OrderDetail = lazy(() => import('./pages/Profile/tabs/Order/OrderDetail'));
const OrdersTab = lazy(() => import('./pages/Profile/tabs/Order/OrdersTab'));
const Wishlist = lazy(() => import('./pages/Wishlist/Wishlist'));

const App  = () => {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp" element={<OTPForm />} />
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/woman" element={<WomanShop />} />
            <Route path="/man" element={<ManShop />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/checkout" element={<FashionCheckout />} />
            <Route path="/blog" element={<FashionBlog />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
            <Route path="/profile" element={<FashionUserProfile />} />
            <Route path="/profile/orders" element={<OrdersTab />} />
            <Route path="/profile/orders/:orderId" element={<OrderDetail />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </Router>
  );
};

export default App;