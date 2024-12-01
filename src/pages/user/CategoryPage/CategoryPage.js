// src/pages/CategoryPage/CategoryPage.js
import React, { useState, useEffect } from 'react';
import { createSlug } from '../../../utils/slugify';
import categoryService from '../../../services/user/categoryService';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player'; // Import Lottie Player
import loadingAnimation from '../../../assets/aniamations/Animation - 1732875047380.json'; // Import animation
import './CategoryPage.css';

function CategoryPage() {
  const [bigCategories, setBigCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overlayActive, setOverlayActive] = useState(false); // Trạng thái phủ màn đen
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
    setOverlayActive(true); // Bật overlay với animation
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Giả lập thời gian chờ API
      const slug = createSlug(category);
      navigate(`/category/${slug}`); // Chuyển trang sau khi nhận được dữ liệu
    } catch (error) {
      console.error('Failed to load category:', error);
    } finally {
      setOverlayActive(false); // Tắt overlay nếu cần (không cần thực tế vì sẽ chuyển trang)
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='category'>
      {overlayActive && (
        <div className="overlay">
          <Player
            autoplay
            loop
            src={loadingAnimation}
            style={{ height: '150px', width: '150px' }}
          />
          <p>Đang tải ....</p>
        </div>
      )}

      <div className='layout-column_single'>
        <h1 className='heading'>
          <span>Các danh mục sách phổ biến</span>
        </h1>
        <div className="search-header">
          <span className="SVGInline search-header__icon">
            <svg className="SVGInline-svg search-header__icon-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m17.854 18.146-3.128-3.128c.795-.954 1.275-2.18 1.275-3.519 0-3.038-2.462-5.5-5.5-5.5s-5.5 2.462-5.5 5.5 2.462 5.5 5.5 5.5c1.339 0 2.565-.479 3.518-1.274l3.128 3.128c.098.098.226.147.354.147s.256-.049.354-.146c.195-.196.195-.512-.001-.708zm-7.353-2.146c-2.481 0-4.5-2.019-4.5-4.5s2.018-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5z"></path>
            </svg>
          </span>
          <input placeholder='Tìm tên sách hoặc tác giả ...' className='search-header__input'></input>
        </div>
      </div>

      <div className='layout-column_single'>
        <div className='layout-column__inner'>
          <div className="category-page">
            <div className="category-list">
              {bigCategories.map((category, index) => (
                <div className="category-item" key={index}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className='category-link'
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
