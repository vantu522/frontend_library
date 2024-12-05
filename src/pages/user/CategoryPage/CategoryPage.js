import React, { useState, useEffect } from 'react';
import { createSlug } from '../../../utils/slugify';
import categoryService from '../../../services/user/categoryService';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../../assets/aniamations/Animation - 1732875047380.json';
import loadingg from '../../../assets/aniamations/loadingg.json';

function CategoryPage() {
  const [bigCategories, setBigCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overlayActive, setOverlayActive] = useState(false);
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

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen flex flex-col pt-10">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-80">
          <Player
            autoplay
            loop
            src={loadingg}
            style={{ height: '150px', width: '150px' }}
          />
        </div>
      ) : (
        <div className="flex-grow container mx-auto px-4">
          <h1 className="text-center pt-12 text-4xl font-bold text-indigo-800 mb-8">
            Các danh mục sách phổ biến
          </h1>
          <div className="flex items-center bg-white rounded-full shadow-lg px-6 py-3 w-full max-w-2xl mx-auto mb-16">
            <span className="text-indigo-500 mr-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="m17.854 18.146-3.128-3.128c.795-.954 1.275-2.18 1.275-3.519 0-3.038-2.462-5.5-5.5-5.5s-5.5 2.462-5.5 5.5 2.462 5.5 5.5 5.5c1.339 0 2.565-.479 3.518-1.274l3.128 3.128c.098.098.226.147.354.147s.256-.049.354-.146c.195-.196.195-.512-.001-.708zm-7.353-2.146c-2.481 0-4.5-2.019-4.5-4.5s2.018-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5z"></path>
              </svg>
            </span>
            <input
              placeholder="Tìm tên sách hoặc tác giả ..."
              className="flex-1 border-none bg-transparent text-lg outline-none text-indigo-900 placeholder-indigo-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bigCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
              >
                <button
                  onClick={() => handleCategoryClick(category)}
                  className="text-xl font-semibold text-indigo-700 hover:text-indigo-900 transition-colors duration-300"
                >
                  {category}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Transition Overlay */}
      {overlayActive && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-50">
          <Player
            autoplay
            loop
            src={loadingAnimation}
            style={{ height: '150px', width: '150px' }}
          />
          <p className="text-white mt-4 text-lg font-medium animate-pulse">Đang tải ...</p>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;

