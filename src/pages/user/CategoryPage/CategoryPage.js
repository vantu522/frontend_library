import React, { useState, useEffect } from 'react';
import { createSlug } from '../../../utils/slugify';
import categoryService from '../../../services/user/categoryService';
import bookService from '../../../services/user/bookService';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../../assets/aniamations/Animation - 1732875047380.json';
import loadingg from '../../../assets/aniamations/loadingg.json';

function CategoryPage() {
  const [bigCategories, setBigCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overlayActive, setOverlayActive] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBigCategories = async () => {
      try {
        const data = await categoryService.fetchBigCategories();
        setBigCategories(data);
        localStorage.setItem('categories', JSON.stringify(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBigCategories();
  }, []);

  const handleBookSuggestion = async (searchQuery) => {
    if (searchQuery.length > 0) {
      try {
        const data = await bookService.fetchBookBySuggest(searchQuery);
        setSuggestedBooks(data);
      } catch (error) {
        console.error('Lỗi gợi ý sách:', error);
        setSuggestedBooks([]);
      }
    } else {
      setSuggestedBooks([]);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleBookSuggestion(query);
    }, 300);

    return () => clearTimeout(timerId);
  }, [query]);

  const handleCategoryClick = async (category) => {
    setOverlayActive(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const slug = createSlug(category);
      navigate(`/category/${slug}`);
    } catch (error) {
      console.error('Failed to load category:', error);
    } finally {
      setOverlayActive(false);
    }
  };

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <p className="text-2xl text-red-600 font-semibold">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-x-hidden relative">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-80">
          <Player
            autoplay
            loop
            src={loadingg}
            style={{ height: '200px', width: '200px' }}
          />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-16 mt-10 relative z-10">
          <h1 className="text-center text-5xl font-bold text-indigo-800 mb-12 
            animate-fade-in-down 
            transition-all duration-1000 
            hover:scale-105 
            hover:text-indigo-900
            transform-gpu"
          >
            Các danh mục sách phổ biến
          </h1>
          
          <div className="relative mb-16">
            <div className="flex items-center bg-white rounded-full shadow-lg px-6 py-4 w-full max-w-2xl mx-auto transition-all duration-300 focus-within:shadow-xl">
              <span className="text-indigo-500 mr-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="m17.854 18.146-3.128-3.128c.795-.954 1.275-2.18 1.275-3.519 0-3.038-2.462-5.5-5.5-5.5s-5.5 2.462-5.5 5.5 2.462 5.5 5.5 5.5c1.339 0 2.565-.479 3.518-1.274l3.128 3.128c.098.098.226.147.354.147s.256-.049.354-.146c.195-.196.195-.512-.001-.708zm-7.353-2.146c-2.481 0-4.5-2.019-4.5-4.5s2.018-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5z"></path>
                </svg>
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm tên sách hoặc tác giả ..."
                className="flex-1 border-none bg-transparent text-lg outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            {suggestedBooks.length > 0 && (
              <div className="absolute z-50 w-full max-w-2xl mx-auto left-0 right-0 mt-2">
                <div className="bg-white rounded-lg shadow-xl max-h-80 overflow-y-auto animate-fade-in">
                  {suggestedBooks.map((book) => (
                    <div 
                      key={book.bookId} 
                      onClick={() => handleBookClick(book.bookId)}
                      className="px-6 py-3 hover:bg-indigo-50 cursor-pointer transition-colors duration-200"
                    >
                      <p className="font-medium text-indigo-700">{book.title}</p>
                      <p className="text-sm text-gray-500">{book.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bigCategories.map((category, index) => (
              <div
                key={index}
                className="
                  bg-white 
                  rounded-xl 
                  p-8 
                  text-center 
                  transition-all 
                  duration-500 
                  transform 
                  hover:-translate-y-4 
                  hover:shadow-2xl 
                  hover:rotate-3 
                  cursor-pointer
                  perspective-500
                  hover:scale-105
                  animate-float
                "
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
                onClick={() => handleCategoryClick(category)}
              >
                <h2 className="
                  text-2xl 
                  font-semibold 
                  text-indigo-600 
                  hover:text-indigo-800 
                  transition-colors 
                  duration-300
                ">
                  {category}
                </h2>
              </div>
            ))}
          </div>
        </div>
      )}

      {overlayActive && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-indigo-900 bg-opacity-80 z-50">
          <Player
            autoplay
            loop
            src={loadingAnimation}
            style={{ height: '200px', width: '200px' }}
          />
          <p className="text-white mt-6 text-2xl font-medium animate-pulse">Đang tải ...</p>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;