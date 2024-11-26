import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSlug } from '../../../utils/slugify';
import bookService from '../../../services/user/bookService';

function BooksBySubCategory() {
  const { bigCategoryName, subCategoryName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!bigCategoryName || !subCategoryName) {
        console.log('Missing category parameters');
        setLoading(false);
        return;
      }

      setLoading(true);
      
      try {
        const bigCategorySlug = createSlug(bigCategoryName);
        const subCategorySlug = createSlug(subCategoryName);
        
        // Truyền cả hai tham số vào hàm fetch
        const data = await bookService.fetchBooksByCategory(bigCategorySlug, subCategorySlug);
        if (!data) {
          throw new Error('Không nhận được dữ liệu từ API');
        }
        
        setBooks(data);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err.message || 'Có lỗi xảy ra khi tải sách');
      } finally {
        setLoading(false);
      }
    };
  
    fetchBooks();
  }, [bigCategoryName, subCategoryName]); // Thêm bigCategoryName vào dependencies


  if (!bigCategoryName || !subCategoryName) {
    return <div>Không tìm thấy danh mục</div>;
  }

  if (loading) {
    return <div className="loading-message">Đang tải sách...</div>;
  }

  if (error) {
    return <div className="error-message" style={{ color: 'red' }}>Lỗi: {error}</div>;
  }

  if (!books || books.length === 0) {
    return <div className="no-books-message">Không tìm thấy sách trong danh mục này</div>;
  }

  return (
    <div className="books-container">
      <h2>Sách trong {bigCategoryName} - {subCategoryName}</h2>
      <div className="books-list">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <img src={book.img} alt={book.name} />
            <h3>{book.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksBySubCategory;