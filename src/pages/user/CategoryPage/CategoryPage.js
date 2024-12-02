import React, { useState, useEffect } from 'react';
import { createSlug } from '../../../utils/slugify';
import categoryService from '../../../services/user/categoryService';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../../assets/aniamations/Animation - 1732875047380.json';

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

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-[#f4f2ef] pt-12 pb-8">
      {overlayActive && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <Player
            autoplay
            loop
            src={loadingAnimation}
            style={{ height: '150px', width: '150px' }}
          />
          <p className="text-white mt-2 text-sm">Đang tải ....</p>
        </div>
      )}

      <div className="max-w-full">
        <h1 className="text-center pt-12 text-2xl font-bold">
          <span>Các danh mục sách phổ biến</span>
        </h1>
        <div className="flex items-center bg-white rounded-lg px-4 py-2 w-full max-w-lg mx-auto mt-16">
          <span className="text-gray-500 mr-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m17.854 18.146-3.128-3.128c.795-.954 1.275-2.18 1.275-3.519 0-3.038-2.462-5.5-5.5-5.5s-5.5 2.462-5.5 5.5 2.462 5.5 5.5 5.5c1.339 0 2.565-.479 3.518-1.274l3.128 3.128c.098.098.226.147.354.147s.256-.049.354-.146c.195-.196.195-.512-.001-.708zm-7.353-2.146c-2.481 0-4.5-2.019-4.5-4.5s2.018-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5z"></path>
            </svg>
          </span>
          <input
            placeholder="Tìm tên sách hoặc tác giả ..."
            className="flex-1 border-none bg-transparent text-lg outline-none"
          />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bigCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-5 text-center transition-transform transform hover:-translate-y-1 hover:shadow-lg"
            >
              <button
                onClick={() => handleCategoryClick(category)}
                className="text-lg font-bold text-gray-800"
              >
                {category}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
