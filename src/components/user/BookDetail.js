import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookService from '../../services/user/bookService';
import { Heart, Star, ShoppingCart } from 'lucide-react';

function BookDetail() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      
      try {
        const data = await bookService.fetchBookByBookId(bookId);
        setBook(data);
        console.log(data);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Có lỗi xảy ra khi tải thông tin sách');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBook();
  }, [bookId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    // Implement add to cart logic
    console.log(`Added ${quantity} book(s) to cart`);
  };

  const handleFavorite = () => {
    // Implement favorite/wishlist logic
    console.log('Added to favorites');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <span className="ml-4 text-gray-700">Đang tải thông tin sách...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
        Lỗi: {error}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="p-4 text-center text-gray-600">
        Không tìm thấy sách
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <button 
        onClick={handleGoBack} 
        className="mb-6 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Quay lại
      </button>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Book Image */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-sm shadow-xl rounded-lg overflow-hidden">
            <img 
              src={book.img} 
              alt={book.title} 
              className="w-full h-[500px] object-cover object-center"
            />
          </div>
        </div>
        
        {/* Book Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">Tác giả: {book.author.join(", ")}</p>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-500 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-gray-600">(4/5 - 128 đánh giá)</span>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-600 mb-2">{book.price?.toLocaleString() || 'Liên hệ'} ₫</p>
            <p className="text-green-600 font-medium">Còn hàng</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span>Số lượng: {book.quantity}</span>
              <div className="flex items-center border rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Đặt lịch mượn
              </button>
              <button 
                onClick={handleFavorite}
                className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition"
              >
                <Heart className="h-6 w-6 text-red-500" />
              </button>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Mô tả sách</h2>
            <p className="text-gray-700 leading-relaxed">
              {book.description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="font-medium text-gray-600">Nhà xuất bản</p>
              <p className="font-semibold">{book.nxb || 'Chưa cập nhật'}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Năm xuất bản</p>
              <p className="font-semibold">{book.publicationYear || 'Chưa cập nhật'}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Thể loại</p>
              <p className="font-semibold">{book.bigCategory[0].name || 'Chưa cập nhật'}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Số trang</p>
              <p className="font-semibold">{book.pageCount || 'Chưa cập nhật'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;