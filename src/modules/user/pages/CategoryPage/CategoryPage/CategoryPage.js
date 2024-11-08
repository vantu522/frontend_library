// src/pages/CategoryPage/CategoryPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createSlug } from '../../../../../utils/slugify';
import categoryService from '../../../../../services/user/categoryService';
// import './CategoryPage.css';

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
    <div className="category-page">
      <h2 className="category-title">Các danh mục phổ biến</h2>
      <div className="category-list">
        {bigCategories.map((category, index) => (
          <div className="category-item" key={index}>
            <h3>{category}</h3>
            <div className="category-image"></div>
            <Link to={`/category/${createSlug(category)}`} className="borrow-button">
              Tìm hiểu
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;