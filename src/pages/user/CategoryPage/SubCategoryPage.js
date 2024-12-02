import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createSlug } from '../../../utils/slugify';
import categoryService from '../../../services/user/categoryService';
import bookService from '../../../services/user/bookService';
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../../assets/aniamations/Animation - 1732875047380.json';

function SubCategoryPage() {
  const { bigCategoryName } = useParams();
  const navigate = useNavigate();

  const [subCategories, setSubCategories] = useState([]);
  const [booksByCategory, setBooksByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalCategoryName, setOriginalCategoryName] = useState('');

  const bookListRefs = useRef({});

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const slug = createSlug(bigCategoryName);
        const data = await categoryService.fetchSubCategories(slug);
        setSubCategories(data);

        const categories = JSON.parse(localStorage.getItem('categories') || '[]');
        const original = categories.find((cat) => createSlug(cat) === slug);
        setOriginalCategoryName(original || bigCategoryName);

        const booksData = await Promise.all(
          data.map(async (subCategory) => {
            const subCategorySlug = createSlug(subCategory);
            const books = await bookService.fetchBooksByCategory(slug, subCategorySlug);
            return { subCategory, books: books || [] };
          })
        );

        const booksMap = {};
        booksData.forEach(({ subCategory, books }) => {
          booksMap[subCategory] = books;
        });

        setBooksByCategory(booksMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (bigCategoryName) {
      setLoading(true);
      fetchSubCategories();
    }
  }, [bigCategoryName]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubCategoryClick = async (subCategory) => {
    const bigSlug = createSlug(bigCategoryName);
    const subSlug = createSlug(subCategory);

    // Navigate to books page for the specific subcategory
    navigate(`/category/${bigSlug}/${subSlug}`);
  };

  const scrollBooks = (subCategory, direction) => {
    const bookList = bookListRefs.current[subCategory];
    if (bookList) {
      const scrollAmount = bookList.clientWidth;
      bookList.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  const handleBookDetailClick = (bookId) => {
    navigate(`/book/${bookId}`); // Điều hướng đến trang chi tiết sách theo bookId
  };


  if (loading) {
    return true
  }

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-9xl mx-auto mt-20 p-6 bg-gray-50 animate-fadeIn">
      <button
        onClick={handleGoBack}
        className="mb-5 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
      >
        ← Quay lại
      </button>
      <h2 className="text-2xl font-semibold text-center mb-8">
        Các thể loại con của {originalCategoryName}
      </h2>
      <div className="space-y-10">
        {subCategories.map((subCategory, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <button className="text-lg font-medium text-blue-800 mb-4 hover:text-blue-600 transition cursor-pointer"
            onClick={() =>handleSubCategoryClick(subCategory)} 
          > 
              {subCategory}
            </button>
            {booksByCategory[subCategory]?.length > 0 ? (
              <div className="relative">
                <button
                  onClick={() => scrollBooks(subCategory, 'prev')}
                  className="absolute top-1/2 -translate-y-1/2 left-0 bg-white shadow-lg p-2 rounded-full hover:bg-gray-200 transition z-10"
                >
                  ❮
                </button>
                <div
                  ref={(el) => (bookListRefs.current[subCategory] = el)}
                  className="flex gap-4 overflow-x-auto scrollbar-hide"
                >
                  {booksByCategory[subCategory].map((book, idx) => (
                    <div
                      onClick={() => handleBookDetailClick(book.bookId)}
                      key={book.id}
                      className="cursor-pointer flex-none w-44 bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <img src={book.img} alt={book.name} className="w-full h-56 object-cover" />
                      <p className='pl-3'>{book.author}</p>
                      <h3 className="text-center text-gray-800 text-sm truncate pl-3">{book.title}</h3>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => scrollBooks(subCategory, 'next')}
                  className="absolute top-1/2 -translate-y-1/2 right-0 bg-white shadow-lg p-2 rounded-full hover:bg-gray-200 transition z-10"
                >
                  ❯
                </button>
              </div>
            ) : (
              <p className="text-gray-500">Không có sách nào trong thể loại này</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubCategoryPage;
