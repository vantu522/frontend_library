import React, { useState } from 'react';
import DatePickerInput from '../../../components/user/DatePickerInput';
import { Book, Calendar, CheckCircle } from 'lucide-react';

const BookList = () => {
  const [borrowDate, setBorrowDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const books = [
    { id: '001', img: 'https://nhasachphuongnam.com/images/thumbnails/435/537/detailed/177/ho-oan-han.jpg', name: 'Tấm Cám', author: 'Không nhớ', genre: 'Truyện cổ tích' },
    { id: '002', img: '/placeholder.svg?height=200&width=150', name: 'Ông lão đánh cá và con cá vàng', author: 'Không nhớ', genre: 'Truyện gì cũng được' },
    // Add more books if needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Danh sách sách</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-9 gap-4 bg-orange-500 text-white font-semibold text-sm uppercase tracking-wider py-3 px-6">
          <div className="col-span-1">STT</div>
          <div className="col-span-1">Hình ảnh</div>
          <div className="col-span-2">Tên sách</div>
          <div className="col-span-1">Tác giả</div>
          <div className="col-span-1">Thể loại</div>
          <div className="col-span-1">Ngày mượn</div>
          <div className="col-span-1">Hạn trả</div>
          <div className="col-span-1">Trạng thái</div>
        </div>

        {/* Book Rows */}
        {books.map((book, index) => (
          <div
            key={book.id}
            className={`grid grid-cols-9 gap-4 items-center py-4 px-6 ${
              index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
            } hover:bg-gray-100 transition-colors duration-150 ease-in-out`}
          >
            <div className="col-span-1 font-medium text-gray-600">{book.id}</div>
            <div className="col-span-1">
              <img src={book.img} alt={book.name} className="w-16 h-20 object-cover rounded-md shadow-sm" />
            </div>
            <div className="col-span-2 font-medium text-gray-800">{book.name}</div>
            <div className="col-span-1 text-gray-600">{book.author}</div>
            <div className="col-span-1 text-gray-600">{book.genre}</div>
            <div className="col-span-1">
              <DatePickerInput
                selectedDate={borrowDate}
                onChangeDate={setBorrowDate}
                placeholder="Chọn ngày mượn"
                className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="col-span-1">
              <DatePickerInput
                selectedDate={returnDate}
                onChangeDate={setReturnDate}
                placeholder="Chọn ngày trả"
                className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="col-span-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4 mr-1" />
                Đang mượn
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" aria-current="page" className="z-10 bg-orange-50 border-orange-500 text-orange-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
            1
          </a>
          <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
            2
          </a>
          <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
            3
          </a>
          <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default BookList;

