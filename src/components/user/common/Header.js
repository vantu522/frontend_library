import React, { useState, useEffect, useCallback } from "react";
import { UserCircle, Bell, LogOut, Heart, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bookService from "../../../services/admin/booksService";
import { Player } from '@lottiefiles/react-lottie-player';
import hotline from "../../../assets/aniamations/Animation - loading.json";
import { createSlug } from "../../../utils/slugify";

const MegaMenu = ({ categories }) => {
  return (
    <div className="absolute top-[100%] left-0 z-50 w-full origin-top border-t border-gray-100 bg-white py-6 shadow-lg transition-all duration-300 ease-out opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <a
              key={index}
              href={`/category/${createSlug(category)}`}
              className="group/item block rounded-lg p-3 transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="text-base font-semibold uppercase text-gray-800 transition-colors hover:text-blue-600">
                    {category}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  // ... state declarations remain the same ...
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]); // Added state for categories
  const [placeholder, setPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // Added state for current category index
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUser(userData);
      setNotifications([
        { id: 1, message: "Bạn có sách mới" },
        { id: 2, message: "Ưu đãi đặc biệt" },
      ]);
      setFavoriteBooks([
        { id: 1, title: "Đắc Nhân Tâm" },
        { id: 2, title: "Nhà Giả Kim" },
      ]);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 20);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setNotifications([]);
    setFavoriteBooks([]);
    navigate("/loginemail");
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await bookService.fetchCategories();
        setCategories(data);
        setPlaceholder("Tìm kiếm sách");
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setPlaceholder("Tìm kiếm sách");
      }
    };
    loadCategories();
  }, []);

  const animatePlaceholder = useCallback(() => {
    if (categories.length === 0) return;
    console.log(categories);

    const currentCategory = categories[currentCategoryIndex];
    const fullText = `Tìm kiếm trong ${currentCategory}`;

    if (placeholderIndex < fullText.length) {
      setPlaceholder((prev) => fullText.slice(0, placeholderIndex + 1));
      setPlaceholderIndex((prevIndex) => prevIndex + 1);
    } else {
      // Chuyển sang danh mục tiếp theo
      setCurrentCategoryIndex(
        (prevIndex) => (prevIndex + 1) % categories.length
      );
      setPlaceholderIndex(0);
      setPlaceholder("");
    }
  }, [categories, currentCategoryIndex, placeholderIndex]);

  useEffect(() => {
    const intervalId = setInterval(animatePlaceholder, 100);
    return () => clearInterval(intervalId);
  }, [animatePlaceholder]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 bg-white shadow-md transition-transform duration-500 
          ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Top Header Section */}
        <div className="mx-auto max-w-7xl px-2">
          <div className="flex items-center justify-between h-17">
            {/* Logo Section */}
            <a href="/" className="flex items-center gap-4">
              <img
                src="/assets/images/logo-preview.png"
                alt="Logo"
                className="h-12 w-20 object-contain"
              />
              <span className="hidden text-2xl font-bold text-gray-800 md:block">
                Wisdom's Beacon
              </span>
            </a>

            {/* Search Section */}
            <div className="relative w-full max-w-lg">
              <form action="/search" method="get" className="flex items-center">
                <input
                  type="text"
                  name="query"
                  aria-label="Tìm sản phẩm"
                  placeholder={placeholder}
                  autoComplete="off"
                  className="w-full rounded-l-md border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  aria-label="Tìm kiếm"
                  className="rounded-r-md bg-[#0abaff] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <svg viewBox="0 0 451 451" className="h-5 w-5" fill="currentColor">
                    <g>
                      <path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3 s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4 C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3 s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z" />
                    </g>
                  </svg>
                </button>
              </form>
            </div>

            {/* Hotline Section */}
            <div className="flex items-center">
              <Player
                autoplay
                loop
                src={hotline}
                style={{ height: '100px', width: '100px' }}
              />
              <p className="ml-1 text-red-500 text-lg font-semibold italic">0123456789</p>

            </div> 

            {/* User Actions Section */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  {/* Favorites Button */}
                  <div className="relative" onClick={() => navigate("/favorite_books")}>
                    <Heart className="h-6 w-6 cursor-pointer text-gray-600 hover:text-red-600" />
                    {favoriteBooks.length > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {favoriteBooks.length}
                      </span>
                    )}
                  </div>

                  {/* Notifications Button */}
                  <div className="relative">
                    <Bell className="h-6 w-6 cursor-pointer text-gray-600 hover:text-blue-600" />
                    {notifications.length > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {notifications.length}
                      </span>
                    )}
                  </div>

                  {/* User Profile Dropdown */}
                  <div
                    className="relative"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS075s728_EWpOqKmQl3L-_4qGiNIDbuoRxGw&s"
                      alt={user?.name}
                      className="h-10 w-10 cursor-pointer rounded-full border-2 border-blue-500 object-cover"
                    />
                    {showDropdown && (
                      <div className="absolute right-0 top-full z-10 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                        <p className="border-b px-4 py-2 text-sm font-medium text-gray-800">
                          {user?.name}
                        </p>
                        <button
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                          onClick={() => navigate("/edit_profile")}
                        >
                          Chỉnh sửa hồ sơ
                        </button>
                        <button
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <a
                  href="/loginemail"
                  className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  <UserCircle className="h-5 w-5" />
                  <span className="hidden md:inline">Đăng nhập</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="h-16 w-full bg-[#0abaff]">
          <div className="mx-auto max-w-6xl">
            <nav>
              <ul className="flex justify-center">
                <li className="group relative px-4 py-4 hover:bg-custom">
                  <a href="/" className="flex items-center p-1.5 text-large font-medium uppercase text-white">
                    Trang chủ
                  </a>
                </li>

                <li className="group relative px-4 py-4 hover:bg-custom">
                  <a href="/news" className="flex items-center p-1.5 text-large font-medium uppercase text-white">
                    Tin tức
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </a>
                </li>

                <li className="group px-4 py-4 hover:bg-custom">
                  <a href="/category" className="flex items-center p-1.5 text-large font-medium uppercase text-white">
                    Danh mục
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </a>
                  <MegaMenu categories={categories} />
                </li>

                <li className="group relative px-4 py-4 hover:bg-custom">
                  <a href="/shopcart" className="flex items-center p-1.5 text-large font-medium uppercase text-white">
                    Giỏ sách
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-32" />
    </>
  );
};

export default Header;