import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, X } from 'lucide-react';
import DatePickerInput from './DatePickerInput';
import { toast } from 'react-toastify';

const ReservationPopup = ({ book, onClose, onConfirm }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [borrowDate, setBorrowDate] = useState(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);


  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for the animation to complete before closing
  };

  const handleConfirm = () => {
    if (borrowDate) {
      onConfirm(borrowDate);
      toast.success("Đặt lịch thành công!");
      navigate("/shopcart")
    } else {
      toast.error('Vui lòng chọn ngày mượn sách');
    }
  };  

  return (
    <div className={`fixed inset-0 bg-black flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-out ${isVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`}>
      <div className={`bg-white rounded-lg shadow-xl max-w-lg w-full transform transition-all duration-300 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Đặt lịch mượn sách</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-xl text-gray-800 mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-1">Tác giả: {book.author.join(", ")}</p>
            <p className='text-gray-600 mb-4'>Thể loại: {book.bigCategory[0]?.name}</p>
            <img src={book.img} alt={book.title} className='h-48 w-auto object-cover rounded-md shadow-md'/>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Chọn ngày mượn</label>
            <DatePickerInput
              selectedDate={borrowDate}
              onChangeDate={setBorrowDate}
              placeholder="Chọn ngày mượn"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Xác nhận đặt lịch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPopup;