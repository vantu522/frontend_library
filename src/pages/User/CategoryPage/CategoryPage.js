import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createSlug } from "../../../utils/slugify"; 
import "../HomePage.css"; // Giữ nguyên CSS nếu cần

function CategoryPage() {
  const [bigCategories, setBigCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBigCategories = async () => {
      try {
        const response = await fetch("http://10.147.19.246:8080/books/categories/big-categories");
        if (!response.ok) {
          throw new Error('Không thể tải danh mục');
        }
        const data = await response.json();
        setBigCategories(data);
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
      <div className="book-list">
        {bigCategories.map((category, index) => (
          <div className="book-item" key={index}>
            <h3>{category}</h3>
            <div className="book-image">
              <img 
                src="https://img.websosanh.vn/v10/users/review/images/0y9326ybla81n/de-men-phieu-luu-ky.jpg?compress=85" 
                alt={category}
              />
            </div>
            <Link 
              to={`/categories/${createSlug(category)}`} 
              className="borrow-button"
            >
              Tìm hiểu
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
