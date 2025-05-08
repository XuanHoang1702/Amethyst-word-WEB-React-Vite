// import React, { useEffect, useState, useMemo } from "react";
// import { FaHeart, FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
// import { HiBars3BottomRight } from "react-icons/hi2";
// import { IoMdClose } from "react-icons/io";
// import { Link } from "react-router-dom";

// import CartDrawer from "../../pages/carts/CartDrawer";
// import { MenuNavBarService } from "../../service/MenuNavBarService";

// const Navbar = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [navDrawerOpen, setNavDrawerOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [menuList, setMenuList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);
//   const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
//   const toggleSearch = () => setSearchOpen(!searchOpen);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const FetchMenuList = async () => {
//       try {
//         const data = await MenuNavBarService.getMenuList();
//         setMenuList(data);
//       } catch (error) {
//         console.error("Error fetching menu list:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     FetchMenuList();
//   }, []);

//   const menuSpacing = useMemo(() => {
//     if (menuList.length <= 3) return "space-x-12";
//     if (menuList.length <= 5) return "space-x-8";
//     if (menuList.length <= 7) return "space-x-6";
//     return "space-x-4";  
//   }, [menuList.length]);

//   const menuFontSize = useMemo(() => {
//     if (windowWidth >= 1280) return "text-sm"; 
//     if (windowWidth >= 1024) {  
//       return menuList.length > 5 ? "text-xs" : "text-sm";
//     }
//     return "text-xs"; // md screens
//   }, [windowWidth, menuList.length]);

//   return (
//     <>
//       <nav className="bg-[#6666e5] p-3 md:p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
//         <div className="container mx-auto flex items-center justify-between px-2">
//           <div className="flex items-center flex-grow-0 flex-shrink-0">
//             <Link to="/" className="flex items-center space-x-1 group">
//               <span className="text-purple-400 text-2xl md:text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300">💎</span>
//               <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent group-hover:blur-[0.3px] transition duration-300">
//                 AmethystWorld
//               </h1>
//             </Link>
//           </div>
//           <div className={`hidden md:flex flex-grow justify-center items-center mx-2 lg:mx-6 ${menuSpacing} ${menuFontSize} font-medium uppercase`}>
//             {loading ? (
//               <span className="text-white">Loading...</span>
//             ) : (
//               menuList.map((item, index) => (
//                 <Link 
//                   key={index} 
//                   to={item.menU_LINK} 
//                   className="text-white hover:text-black whitespace-nowrap px-1 transition-all duration-200 hover:scale-105"
//                 >
//                   {item.menU_NAME}
//                 </Link>
//               ))
//             )}
//           </div>
//           <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 flex-grow-0 flex-shrink-0">
//             <div className="hidden md:block relative">
//               <input
//                 type="text"
//                 placeholder="Tìm kiếm..."
//                 className="bg-white border border-white/30 rounded-full py-1 px-3 pl-8 text-black text-xs lg:text-sm focus:outline-none focus:ring-1 focus:ring-white w-36 lg:w-48"
//               />
//               <FaSearch className="absolute left-3 top-2 text-black text-xs lg:text-sm" />
//             </div>
//             <button onClick={toggleSearch} className="md:hidden text-white">
//               <FaSearch className="text-lg" />
//             </button>

//             <Link to="/login" className="text-white hover:text-black flex items-center">
//               <FaUser className="text-lg" />
//               <span className="hidden lg:inline ml-1 text-xs lg:text-sm">Login</span>
//             </Link>

//             <Link to="/wishlist" className="text-white hover:text-black">
//               <FaHeart className="text-lg" />
//             </Link>

//             <button onClick={toggleCartDrawer} className="text-white hover:text-black relative">
//               <FaShoppingBag className="text-lg" />
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span>
//             </button>
//             <button onClick={toggleNavDrawer} className="md:hidden text-white">
//               {navDrawerOpen ? <IoMdClose className="text-xl" /> : <HiBars3BottomRight className="text-xl" />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
//       {navDrawerOpen && (
//         <>
//           <div onClick={toggleNavDrawer} className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
//           <div className="fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg transition-transform duration-300 ease-in-out">
//             <div className="flex justify-between items-center p-4 border-b">
//               <h2 className="text-lg font-semibold">Menu</h2>
//               <button onClick={toggleNavDrawer}>
//                 <IoMdClose className="text-2xl text-gray-600" />
//               </button>
//             </div>
//             <div className="flex flex-col p-4 space-y-4">
//               {loading ? (
//                 <span className="text-gray-500">Đang tải...</span>
//               ) : (
//                 menuList.map((item, index) => (
//                   <Link
//                     key={index}
//                     to={item.menU_LINK}
//                     onClick={toggleNavDrawer}
//                     className="text-gray-800 hover:text-purple-600 text-base"
//                   >
//                     {item.menU_NAME}
//                   </Link>
//                 ))
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Navbar;
import React, { useEffect, useState, useMemo } from "react";
import { FaHeart, FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

import CartDrawer from "../../pages/carts/CartDrawer";
import { MenuNavBarService } from "../../service/MenuNavBarService";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Thêm state cho đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [username, setUsername] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false); 

  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setUserMenuOpen(false);
    // Có thể thêm logic đăng xuất thực tế (gọi API, xóa token, v.v.)
  };

  useEffect(() => {
    // Đây là giả lập, thay bằng logic thực tế (ví dụ: kiểm tra token)
    const fakeUser = { username: "JohnDoe" };
    setIsLoggedIn(true);
    setUsername(fakeUser.username);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const FetchMenuList = async () => {
      try {
        const data = await MenuNavBarService.getMenuList();
        setMenuList(data);
      } catch (error) {
        console.error("Error fetching menu list:", error);
      } finally {
        setLoading(false);
      }
    };
    FetchMenuList();
  }, []);

  const menuSpacing = useMemo(() => {
    if (menuList.length <= 3) return "space-x-12";
    if (menuList.length <= 5) return "space-x-8";
    if (menuList.length <= 7) return "space-x-6";
    return "space-x-4";
  }, [menuList.length]);

  const menuFontSize = useMemo(() => {
    if (windowWidth >= 1280) return "text-sm";
    if (windowWidth >= 1024) {
      return menuList.length > 5 ? "text-xs" : "text-sm";
    }
    return "text-xs";
  }, [windowWidth, menuList.length]);

  return (
    <>
      <nav className="bg-[#6666e5] p-3 md:p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-2">
          <div className="flex items-center flex-grow-0 flex-shrink-0">
            <Link to="/" className="flex items-center space-x-1 group">
              <span className="text-purple-400 text-2xl md:text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300">💎</span>
              <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent group-hover:blur-[0.3px] transition duration-300">
                AmethystWorld
              </h1>
            </Link>
          </div>
          <div className={`hidden md:flex flex-grow justify-center items-center mx-2 lg:mx-6 ${menuSpacing} ${menuFontSize} font-medium uppercase`}>
            {loading ? (
              <span className="text-white">Loading...</span>
            ) : (
              menuList.map((item, index) => (
                <Link
                  key={index}
                  to={item.menU_LINK}
                  className="text-white hover:text-black whitespace-nowrap px-1 transition-all duration-200 hover:scale-105"
                >
                  {item.menU_NAME}
                </Link>
              ))
            )}
          </div>
          <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 flex-grow-0 flex-shrink-0">
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="bg-white border border-white/30 rounded-full py-1 px-3 pl-8 text-black text-xs lg:text-sm focus:outline-none focus:ring-1 focus:ring-white w-36 lg:w-48"
              />
              <FaSearch className="absolute left-3 top-2 text-black text-xs lg:text-sm" />
            </div>
            <button onClick={toggleSearch} className="md:hidden text-white">
              <FaSearch className="text-lg" />
            </button>
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="text-white hover:text-black flex items-center"
              >
                <FaUser className="text-lg" />
                <span className="hidden lg:inline ml-1 text-xs lg:text-sm">
                  {isLoggedIn ? username : "Đăng nhập"}
                </span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  {isLoggedIn ? (
                    <div className="flex flex-col">
                      <Link
                        to="/profile"
                        onClick={toggleUserMenu}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Trang cá nhân
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      onClick={toggleUserMenu}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Đăng nhập
                    </Link>
                  )}
                </div>
              )}
            </div>

            <Link to="/wishlist" className="text-white hover:text-black">
              <FaHeart className="text-lg" />
            </Link>

            <button onClick={toggleCartDrawer} className="text-white hover:text-black relative">
              <FaShoppingBag className="text-lg" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span>
            </button>
            <button onClick={toggleNavDrawer} className="md:hidden text-white">
              {navDrawerOpen ? <IoMdClose className="text-xl" /> : <HiBars3BottomRight className="text-xl" />}
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      {navDrawerOpen && (
        <>
          <div onClick={toggleNavDrawer} className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
          <div className="fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={toggleNavDrawer}>
                <IoMdClose className="text-2xl text-gray-600" />
              </button>
            </div>
            <div className="flex flex-col p-4 space-y-4">
              {loading ? (
                <span className="text-gray-500">Đang tải...</span>
              ) : (
                menuList.map((item, index) => (
                  <Link
                    key={index}
                    to={item.menU_LINK}
                    onClick={toggleNavDrawer}
                    className="text-gray-800 hover:text-purple-600 text-base"
                  >
                    {item.menU_NAME}
                  </Link>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;