import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createSlug } from '../../../utils/slugify';
import categoryService from '../../../services/user/categoryService';
import bookService from '../../../services/user/bookService';
import './SubCategoryPage.css';
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

  // Refs for scroll controls
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

  const scrollBooks = (subCategory, direction) => {
    const bookList = bookListRefs.current[subCategory];
    if (bookList) {
      const scrollAmount = bookList.clientWidth; // Scroll by one viewport width
      bookList.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return true;
  }
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="subcategory-page">
      <button className="back-button" onClick={handleGoBack}>
        ← Quay lại
      </button>
      <h2 className="subCategory-title">Các thể loại con của {originalCategoryName}</h2>
      <div className="subcategories">
        {subCategories.map((subCategory, index) => (
          <div className="subcategory-section" key={index}>
            <div className="subcategory-header">
              <h3>{subCategory}</h3>
            </div>
            {booksByCategory[subCategory] && booksByCategory[subCategory].length > 0 ? (
              <div className="books-container">
                <button 
                  className="scroll-btn scroll-prev" 
                  onClick={() => scrollBooks(subCategory, 'prev')}
                >
                  ❮
                </button>
                <div 
                  className="books-list" 
                  ref={(el) => bookListRefs.current[subCategory] = el}
                >
                  {booksByCategory[subCategory].map((book) => (
                    <div key={book.id} className="book-item"
                    style={{ '--delay': `${index * 0.1}s` }} // Delay tăng dần cho mỗi cuốn sách
                    >
                      <img src={book.img} alt={book.name} />
                      <p>{book.author}</p>
                      <h3>{book.title}</h3>
                    </div>
                  ))}
                </div>
                <button 
                  className="scroll-btn scroll-next" 
                  onClick={() => scrollBooks(subCategory, 'next')} 
                >
                  ❯
                </button>
              </div>
            ) : (
              <p>Không có sách nào trong thể loại này</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubCategoryPage;