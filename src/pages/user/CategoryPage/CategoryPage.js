// src/pages/CategoryPage/CategoryPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createSlug } from '../../../utils/slugify';
import categoryService from '../../../services/user/categoryService';
import './CategoryPage.css';

function CategoryPage() {
  const [bigCategories, setBigCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='category'>
        <div className='layout-column_single'>
            <h1 className='heading'>
              <span>Các danh mục sách phổ biến</span>
            </h1>
            <div class="search-header">
                <span class="SVGInline search-header__icon">
                    <svg class="SVGInline-svg search-header__icon-svg" viewBox="0 0 24 24"    xmlns="http://www.w3.org/2000/svg">
                      <path d="m17.854 18.146-3.128-3.128c.795-.954 1.275-2.18 1.275-3.519 0-3.038-2.462-5.5-5.5-5.5s-5.5 2.462-5.5 5.5 2.462 5.5 5.5 5.5c1.339 0 2.565-.479 3.518-1.274l3.128 3.128c.098.098.226.147.354.147s.256-.049.354-.146c.195-.196.195-.512-.001-.708zm-7.353-2.146c-2.481 0-4.5-2.019-4.5-4.5s2.018-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5z">
                      </path>
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
                          <a href={`/category/${createSlug(category)}`} className=''>{category}</a>
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