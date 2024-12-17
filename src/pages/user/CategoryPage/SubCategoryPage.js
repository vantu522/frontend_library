import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createSlug } from '../../../utils/slugify';
import categoryService from '../../../services/user/categoryService';
import bookService from '../../../services/user/bookService';
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../../assets/aniamations/Animation - 1732875047380.json';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Assuming you're using lucide-react for icons

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
        localStorage.setItem('subCategories',JSON.stringify(data));

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
    navigate(`/book/${bookId}`);
  };

  if (loading) {
    return true;
  }

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto mt-20 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen animate-fadeIn">
      <button
        onClick={handleGoBack}
        className="mb-5 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition-all duration-300 flex items-center"
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Quay lại
      </button>
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-800">
        Các thể loại con của <span className="text-indigo-600">{originalCategoryName}</span>
      </h2>
      <div className="space-y-10">
        {subCategories.map((subCategory, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <button 
              className="text-xl font-semibold text-indigo-700 mb-4 hover:text-indigo-500 transition-colors duration-300 cursor-pointer"
              onClick={() => handleSubCategoryClick(subCategory)}
            >
              {subCategory}
            </button>
            {booksByCategory[subCategory]?.length > 0 ? (
              <div className="relative">
                <button
                  onClick={() => scrollBooks(subCategory, 'prev')}
                  className="absolute top-1/2 -translate-y-1/2 -left-4 bg-white shadow-lg p-2 rounded-full hover:bg-indigo-100 transition-all duration-300 z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-indigo-600" />
                </button>
                <div
                  ref={(el) => (bookListRefs.current[subCategory] = el)}
                  className="flex gap-6 overflow-x-auto scrollbar-hide py-4"
                >
                  {booksByCategory[subCategory].map((book, idx) => (
                    <div
                      onClick={() => handleBookDetailClick(book.bookId)}
                      key={book.id}
                      className="cursor-pointer flex-none w-48 bg-indigo-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <img src={book.img} alt={book.name} className="w-full h-64 object-cover" />
                      <div className="p-4">
                        <p className="text-sm text-indigo-600 mb-1">{book.author.join(", ")}</p>
                        <h3 className="text-gray-800 font-medium text-sm line-clamp-2">{book.title}</h3>
                        <p>{book.availability ? 'Có sẵn': 'Tạm hết'}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => scrollBooks(subCategory, 'next')}
                  className="absolute top-1/2 -translate-y-1/2 -right-4 bg-white shadow-lg p-2 rounded-full hover:bg-indigo-100 transition-all duration-300 z-10"
                >
                  <ChevronRight className="w-6 h-6 text-indigo-600" />
                </button>
              </div>
            ) : (
              <p className="text-gray-500 italic">Không có sách nào trong thể loại này</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubCategoryPage;

