import { useEffect, useMemo, useState, useContext } from "react";
import { FaHeart, FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import CartDrawer from "../../pages/carts/CartDrawer";
import { MenuNavBarService } from "../../service/MenuNavBarService";
import { GetInformation } from "../../service/UserService";
import { ProductSearch } from "../../service/ProductService";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const { username, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const fetchUserData = async () => {
    try {
      if (!token) {
        setUsername(null);
        return;
      }
      const userInfo = await GetInformation(token);
      if (userInfo?.user_Inf?.USER_LAST_NAME) {
        setUsername(userInfo.user_Inf.USER_LAST_NAME);
      } else {
        setUsername(null);
      }
    } catch (error) {
      setUsername(null);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchProduct.trim()) {
      setSearchError("Vui lòng nhập từ khóa tìm kiếm.");
      return;
    }
    setSearchError("");
    setSearchLoading(true);
    try {
      const response = await ProductSearch(searchProduct);
      navigate(`/search?query=${encodeURIComponent(searchProduct)}`, { state: { results: response.data } });
    } catch (error) {
      setSearchError("Lỗi tìm kiếm sản phẩm. Vui lòng thử lại.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const fetchMenuList = async () => {
    try {
      const data = await MenuNavBarService.getMenuList();
      if (Array.isArray(data)) {
        setMenuList(data);
      } else {
        setMenuList([]);
      }
    } catch (error) {
      setMenuList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuList();
    fetchUserData();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [token]);

  const menuSpacing = useMemo(() => {
    const spacingMap = {
      3: "space-x-12",
      5: "space-x-8",
      7: "space-x-6",
      default: "space-x-4",
    };
    return spacingMap[Math.min(menuList.length, 7)] || spacingMap.default;
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
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="bg-white border border-white/30 rounded-full py-1 px-3 pl-8 text-black text-xs lg:text-sm focus:outline-none focus:ring-1 focus:ring-white w-36 lg:w-48"
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                  disabled={searchLoading}
                />
                <FaSearch className="absolute left-3 top-2 text-black text-xs lg:text-sm" />
                <button type="submit" className="hidden">Tìm kiếm</button>
                {searchError && <p className="text-red-500 text-xs mt-1">{searchError}</p>}
                {searchLoading && <span className="text-white text-xs">Đang tìm kiếm...</span>}
              </form>
              <button onClick={toggleSearch} className="md:hidden text-white">
                <FaSearch className="text-lg" />
              </button>
            </div>
            <div className="relative">
              <Link
                to={token ? "/profile" : "/login"}
                className="text-white hover:text-black flex items-center"
              >
                <FaUser className="text-lg" />
                <span className="hidden lg:inline ml-1 text-xs lg:text-sm">
                  {username || "Đăng nhập"}
                </span>
              </Link>
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