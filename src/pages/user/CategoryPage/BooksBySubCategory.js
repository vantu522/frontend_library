import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { createSlug } from '../../../utils/slugify';
import bookService from '../../../services/user/bookService';

function BooksBySubCategory() {
  const { bigCategoryName, subCategoryName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [originalBigCategoryName, setOriginalBigCategoryName] = useState('');
  const [originalSubCategoryName, setOriginalSubCategoryName] = useState('');

  useEffect(() => {

    const fetchBooks = async () => {
      if (!bigCategoryName || !subCategoryName) {
        console.log('Missing category parameters');
        setLoading(false);
        return;
      }

      setLoading(true);
      
      try {
        const categories = JSON.parse(localStorage.getItem('categories') || '[]');
        const originalBigCategory = categories.find((cat) => createSlug(cat) === bigCategoryName);
        setOriginalBigCategoryName(originalBigCategory || bigCategoryName);

        const subCategories = JSON.parse(localStorage.getItem('subCategories'|| '[]'));
        const originalSubCategory = subCategories.find((sub) => createSlug(sub) === subCategoryName);
        setOriginalSubCategoryName(originalSubCategory);

        const bigCategorySlug = createSlug(bigCategoryName);
        const subCategorySlug = createSlug(subCategoryName);
        
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
  }, [bigCategoryName, subCategoryName]);

  const handleBookDetailClick = (bookId) => {
    navigate(`/book/${bookId}`); // Điều hướng đến trang chi tiết sách theo bookId
  };

  if (!bigCategoryName || !subCategoryName) {
    return <div className="p-4 text-center text-gray-600">Không tìm thấy danh mục</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <span className="ml-4 text-gray-700">Đang tải sách...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        Lỗi: {error}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">
        Không tìm thấy sách trong danh mục này
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-24 p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Sách trong {originalBigCategoryName} - {originalSubCategoryName}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div 
            key={book.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="w-full h-64 md:h-80 overflow-hidden">
              <img 
                src={book.img} 
                alt={book.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-1">{book.author}</p>
              <h3 className="text-lg font-semibold text-gray-900 truncate">{book.title}</h3>
              <button 
                className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => handleBookDetailClick(book.bookId)} // Gọi hàm handleBookDetailClick khi bấm
              >
                Xem Chi Tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksBySubCategory;
