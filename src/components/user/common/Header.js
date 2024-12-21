import React, { useState, useEffect, useCallback } from 'react';
import { UserCircle, Bell, LogOut, Heart, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bookService from '../../../services/admin/booksService';
import { createSlug } from '../../../utils/slugify';

const MegaMenu = ({categories}) => {
 

  return (
    <div className="absolute top-[100%] left-0 w-full bg-white shadow-lg py-6 opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-300 ease-out origin-top border-t border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <a 
              key={index}
              href={`/category/${createSlug(category)}`}
              className="p-3 rounded-lg transition-all duration-200 block group/item"
            >
              <div className="flex items-start space-x-4">
                {/* <div className="text-2xl w-8 text-center">{category}</div> */}
                <div className="flex-1">
                  <h3 className="text-base uppercase font-semibold text-gray-800 hover:text-blue-600 transition-colors">
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
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]); // Added state for categories
  const [placeholder, setPlaceholder] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // Added state for current category index

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUser(userData);
      setNotifications([
        { id: 1, message: 'Bạn có sách mới' },
        { id: 2, message: 'Ưu đãi đặc biệt' },
      ]);
      setFavoriteBooks([
        { id: 1, title: 'Đắc Nhân Tâm' },
        { id: 2, title: 'Nhà Giả Kim' },
      ]);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 20);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setNotifications([]);
    setFavoriteBooks([]);
    navigate('/loginemail');
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };


  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await bookService.fetchCategories();
        setCategories(data);
        // Đặt placeholder ban đầu
        setPlaceholder('Tìm kiếm sách');
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setPlaceholder('Tìm kiếm sách');
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
      setPlaceholder(prev => fullText.slice(0, placeholderIndex + 1));
      setPlaceholderIndex(prevIndex => prevIndex + 1);
    } else {
      // Chuyển sang danh mục tiếp theo
      setCurrentCategoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
      setPlaceholderIndex(0);
      setPlaceholder('');
    }
  }, [categories, currentCategoryIndex, placeholderIndex]);

  useEffect(() => {
    const intervalId = setInterval(animatePlaceholder, 100);
    return () => clearInterval(intervalId);
  }, [animatePlaceholder]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } bg-white shadow-md`}
      >
        {/* Top header - giới hạn width */}
        <div className="max-w-7xl mx-auto px-2">
          <div className="flex justify-between items-center py-4 ">
            <a href="/" className=" items-center gap-4">
              <img
                src="/assets/images/logo-preview.png"
                alt="Logo"
                className="w-20 h-12 object-contain "
              />
              <span className="text-2xl font-bold text-gray-800 hidden md:block">
                Wisdom's Beacon
              </span>
            </a>

            <div className="w-full max-w-lg relative">
              <form action="/search" method="get" className="flex items-center">
                <input
                  type="text"
                  name="query"
                  aria-label="Tìm sản phẩm"
                  placeholder={placeholder}
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-400 rounded-l-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Tìm kiếm"
                  className="px-4 py-3 bg-[#0abaff] text-white rounded-r-md  focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <svg
                    viewBox="0 0 451 451"
                    className="w-5 h-5"
                    fill="currentColor"
                  >
                    <g>
                      <path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3 s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4 C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3 s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z"></path>
                    </g>
                  </svg>
                </button>
              </form>
            </div>


            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <div className="relative">
                    <Heart
                      className="w-6 h-6 text-gray-600 cursor-pointer hover:text-red-600"
                      onClick={toggleFavorites}
                    />
                    {favoriteBooks.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {favoriteBooks.length}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS075s728_EWpOqKmQl3L-_4qGiNIDbuoRxGw&s"
                      alt={user?.name} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                    />
                    <span className="hidden md:inline text-gray-800 font-medium">
                      {user?.name}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </button>
                </>
              ) : (
                <a
                  href="/loginemail"
                  className="flex items-center gap-2 text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700"
                >
                  <UserCircle className="w-5 h-5" />
                  <span className="hidden md:inline">Đăng nhập</span>
                </a>
              )}
            </div>

          </div>
        </div>

        {/* Navigation Menu - full width background */}
        <div className="w-full bg-[#0abaff] h-12">
          <div className="max-w-6xl mx-auto">
            <nav>
              <ul className="flex justify-center">
                <li className="group relative px-4 py-2 hover:bg-custom">
                  <a href="/" className="flex items-center text-sm uppercase text-[#fff] p-1.5  font-medium">
                    Trang chủ
                  </a>
                </li>

                <li className="group  px-4 py-2 hover:bg-custom">
                  <a href="/category" className="flex items-center text-sm uppercase text-[#fff] p-1.5  font-medium">
                    Danh mục
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </a>
                  {/* Thêm MegaMenu component ở đây */}
                  <MegaMenu categories={categories} />
                </li>

                <li className="group relative px-4 py-2 hover:bg-custom">
                  <a href="/news" className="flex items-center text-sm uppercase text-[#fff] p-1.5 font-medium">
                    Tin tức
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </a>
                </li>

                <li className="group relative px-4 py-2 hover:bg-custom">
                  <a href="/shopcart" className="flex items-center text-sm uppercase text-[#fff] p-1.5  font-medium">
                    Giỏ sách
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

      </header>
      
      {/* Spacer để tránh content bị che bởi fixed header */}
      <div className="h-32"></div>
    </>
  );
};

export default Header;