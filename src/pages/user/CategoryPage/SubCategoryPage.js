// src/pages/SubCategoryPage/SubCategoryPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createSlug } from '../../../utils/slugify';
import categoryService from '../../../services/user/categoryService';
// import './SubCategoryPage.css';

function SubCategoryPage() {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bigCategoryName } = useParams();
  const navigate = useNavigate();
  const [originalCategoryName, setOriginalCategoryName] = useState('');

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const slug = createSlug(bigCategoryName);
        const data = await categoryService.fetchSubCategories(slug);
        setSubCategories(data);

        const categories = JSON.parse(localStorage.getItem('categories') || '[]');
        const original = categories.find((cat) => createSlug(cat) === slug);
        setOriginalCategoryName(original || bigCategoryName);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [bigCategoryName]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="subCategory-page">
      <button className="back-button" onClick={handleGoBack}>
        ← Quay lại
      </button>
      <h2 className="subCategory-title">Các thể loại con của {originalCategoryName}</h2>
      <div className="book-list">
        {subCategories.map((subCategory, index) => (
          <div className="book-item" key={index}>
            <h3>{subCategory}</h3>
            <div className="book-image">
              <img 
                src="https://img.websosanh.vn/v10/users/review/images/0y9326ybla81n/de-men-phieu-luu-ky.jpg?compress=85" 
                alt={subCategory}
              />
            </div>
            <button 
              className="borrow-button"
               onClick={() => window.location.href = `/category/${createSlug(originalCategoryName)}/${createSlug(subCategory)}`}
               >
             Xem sách
            </button>

            <Link to={`/category/${createSlug(originalCategoryName)}/${createSlug(subCategory)}`}>Xem Sách</Link>
          </div>
        ))}
    </div>
    </div>
  )
}
export default SubCategoryPage;