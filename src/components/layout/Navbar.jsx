import React, { useEffect, useState } from "react";
import { FaHeart, FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import '../../index.css';
import CartDrawer from "../../pages/carts/CartDrawer";
import { MenuNavBarService } from "../../service/MenuNavBarService";
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);


  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  useEffect (()=>{
    const FetchMenuList = async () => {
      
  
    try{
      const data = await MenuNavBarService.getMenuList();
      setMenuList(data);
      console.log(data);
    }
    catch(error){
      console.error("Error fetching menu list:", error);
    }
    finally{
      setLoading(false);
    }
  };
  FetchMenuList()

  },[])

  return (
    <nav className="bg-[#6666e5] p-4 md:p-5 fixed top-0 left-0 right-0 z-50 shadow-md ">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <span className="text-purple-400 text-3xl md:text-5xl group-hover:scale-110 transition-transform duration-300">💎</span>
          <h1 className="text-white text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent group-hover:blur-[0.3px] transition duration-300">
            AmethystWorld
          </h1>
        </Link>
        <div className="hidden md:flex space-x-8 text-sm font-medium uppercase">
          {loading ?(
            <span className="text-white">Loading...</span>
          ):(
            menuList.map((item, index) => (
              <Link key={index} to={item.menU_LINK} className="text-white hover:text-black">
                {item.menU_NAME}
              </Link>
            ))
          )}
        </div>

        <div className="flex items-center space-x-4 md:space-x-5 overflow-x-auto scrollbar-hide max-w-full md:max-w-none">
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
            className="bg-white border border-white/30 rounded-full py-1 px-3 pl-8 text-black placeholder- text-sm focus:outline-none focus:ring-1 focus:ring-white w-70 lg:w-70"
            />
            <FaSearch className="absolute left-3 top-2 text-black" />
          </div>


          <button onClick={toggleSearch} className="md:hidden text-black">
            <FaSearch className="text-xl" />
          </button>

          <Link to="/login" className="text-white hover:text-black flex items-center">
            <FaUser className="text-xl" />
            <span className="hidden md:inline ml-1 text-sm">Login</span>
          </Link>

          <Link to="/wishlist" className="text-white hover:text-black">
            <FaHeart className="text-xl" />
          </Link>

        
          <button onClick={toggleCartDrawer} className="text-white hover:text-black relative">
            <FaShoppingBag className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span>
          </button>
      

          <button onClick={toggleNavDrawer} className="md:hidden text-white ml-1">
            {navDrawerOpen ? <IoMdClose className="text-2xl" /> : <HiBars3BottomRight className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden mt-3 px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full bg-white border border-white/30 rounded-full py-2 px-4 pl-10 text-black placeholder-grey-500 focus:outline-none focus:ring-1 focus:ring-white"
            />
            <FaSearch className="absolute left-4 top-3 text-black" />
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {navDrawerOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-[#6666e5] z-40 shadow-md flex flex-col space-y-4 p-6">
          {menuList.map((menu, index) => (
            <Link key={index} to={menu.menU_LINK} onClick={toggleNavDrawer} className="text-white hover:text-black uppercase">
              {menu.menU_NAME}
            </Link> 
          ))}
          {/* <Link to="/" onClick={toggleNavDrawer} className="text-white hover:text-black uppercase">Trang Chủ</Link>
          <Link to="/shop" onClick={toggleNavDrawer} className="text-white hover:text-black uppercase">Nam</Link>
          <Link to="/woman" onClick={toggleNavDrawer} className="text-white hover:text-black uppercase">Nữ</Link>
          {/* <Link to="/accessory" onClick={toggleNavDrawer} className="text-white hover:text-black uppercase">Phụ kiện</Link> */}
          {/* <Link to="/jewelry" onClick={toggleNavDrawer} className="text-white hover:text-black uppercase">Trang sức </Link> */}
          {/* <Link to="/shop" onClick={toggleNavDrawer} className="text-white hover:text-black uppercase">Các Sản phẩm</Link>
          <Link to="/blog" onClick={toggleNavDrawer} className="text-white hover:text-black uppercase">Blog</Link>
          <Link to="/contact" onClick={toggleNavDrawer} className="text-white hover:text-black uppercase">Liên Hệ</Link> */}
        </div>
      )}

      {/* Cart Drawer Component */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
    </nav>
  );
};

export default Navbar;
