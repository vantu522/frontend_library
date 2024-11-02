import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSlug } from "../../../utils/slugify";
import "../HomePage.css"; // Giữ nguyên CSS nếu cần

function SubCategoryPage() {
  const [subCategories, setSubCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { bigCategoryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const slug = createSlug(bigCategoryName);
        const response = await fetch(`http://10.147.19.246:8080/books/categories/${slug}/subcategories`);
        if (!response.ok) {
          throw new Error('Không thể tải danh mục con');
        }
        const data = await response.json();
        setSubCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [bigCategoryName]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-page">
      <button 
        className="back-button" 
        onClick={() => navigate(-1)}
      >
        ← Quay lại
      </button>
      <h2 className="category-title">Các thể loại con của {bigCategoryName}</h2>
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
            >
              Xem sách
            </button>
          </div>
        ))}
      </div>
      {books.length > 0 && (
        <div className="books-list">
          <h2>Sách thuộc thể loại con:</h2>
          {books.map((book, index) => (
            <div key={index} className="book-item">
              <h3>{book.name}</h3>
              <p>Tác giả: {book.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubCategoryPage;
