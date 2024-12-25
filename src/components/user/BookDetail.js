import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookService from '../../services/user/bookService';
import { Clock, MapPin, Star, Calendar, Book, MessageCircle, XCircle } from 'lucide-react';
import RatingsAndComments from './RatingsAndComments';
import ReservationPopup from './ReservationPopup';
import transactionsService from '../../services/user/transactionsService';

function LibraryBookDetail() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showReservationPopup, setShowReservationPopup] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const data = await bookService.fetchBookByBookId(bookId);
        setBook(data);
      } catch (err) {
        setError('Không thể tải thông tin sách');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBook();
  }, [bookId]);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleReservation = () => {
    setShowReservationPopup(true);
  };

  const handleConfirmReservation = async (borrowDate) => {
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage
  
      if (!user) {
        throw new Error('Vui lòng đăng nhập để đặt sách.');
      }

      // Chuyển đổi `borrowDate` sang định dạng yyyy-MM-dd
       const formattedDate = borrowDate.toISOString().split('T')[0];
  
      const requestData = {
        name: user.name, 
        title: book.title, 
        phoneNumber: user.phoneNumber || 'Chưa cập nhật', 
        borrowDateStr: formattedDate, // Ngày mượn (yyyy-MM-dd)
      };
  
      await transactionsService.addTransaction(requestData); // Gọi API mượn sách
      setShowReservationPopup(false); 
      console.log(requestData);
      // Đóng popup
    } catch (error) {
      console.error('Đặt sách thất bại:', error.response?.data || error.message);
      alert('Đặt sách thất bại, vui lòng thử lại.');
    }
  };
  

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse text-center">
        <div className="h-12 w-12 mx-auto bg-gray-300 rounded-full mb-4"></div>
        <p className="text-gray-600">Đang tải thông tin sách...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-6 bg-red-50 text-red-700 text-center">
      {error}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen mt-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-3 gap-6 p-6">
          {/* Book Image and Publication Details */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center justify-center">
              <img 
                src={book.img} 
                alt={book.title} 
                className="w-full max-h-[400px] object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Publication Details */}
            <div className="bg-gray-100 p-4 rounded-lg space-y-3">
              <div className="flex items-center">
                <Book className="h-5 w-5 mr-2 text-gray-600" />
                <p className="font-medium text-gray-700">Chi tiết xuất bản</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-600">Nhà xuất bản</p>
                  <p className="font-semibold">{book.nxb || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Năm xuất bản</p>
                  <p className="font-semibold">{book.publicationYear || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Thể loại</p>
                  <p className="font-semibold">{book.bigCategory[0]?.name || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Số trang</p>
                  <p className="font-semibold">{book.pageCount || 'Chưa cập nhật'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="md:col-span-2 space-y-6">
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

            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                <p className="font-medium text-gray-700">Vị trí: Kệ sách A2, Tầng 2</p>
              </div>
              <div className="flex items-center">
              {book.availability ? (
                <>
                  <Clock className="h-5 w-5 mr-2 text-green-600" />
                  <p className="text-green-700">Sẵn sàng mượn</p>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 mr-2 text-red-600" />
                  <p className="text-red-600">Sách hiện đã hết</p>
                </>
              )}
              </div>
            </div>

            <div>
              <div className="relative">
                <h2 className="text-xl font-semibold mb-2">Mô tả sách</h2>
                <div
                  className={`
                    text-gray-700 
                    transition-all 
                    duration-300 
                    ${isDescriptionExpanded ? 'max-h-96' : 'max-h-20'}
                    overflow-hidden 
                    relative
                  `}
                  dangerouslySetInnerHTML={{ __html: book.description }}
                />
                <button 
                  onClick={toggleDescription}
                  className="mt-2 text-blue-600 hover:text-blue-800"
                >
                  {isDescriptionExpanded ? 'Thu gọn' : 'Xem thêm'}
                </button>
              </div>
            </div>

            <button 
              onClick={handleReservation}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Đặt lịch mượn sách
            </button>

          </div>
        </div>

        {/* Ratings and Comments Section */}
        <div className="border-t mt-8 pt-8 ml-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <MessageCircle className="mr-2 h-6 w-6 text-blue-600" />
            Đánh giá và Bình luận
          </h2>
          <RatingsAndComments bookId={bookId} />
        </div>
      </div>

      {showReservationPopup && (
        <ReservationPopup
          book={book}
          onClose={() => setShowReservationPopup(false)}
          onConfirm={handleConfirmReservation}
        />
      )}
    </div>
  );
}

export default LibraryBookDetail;
