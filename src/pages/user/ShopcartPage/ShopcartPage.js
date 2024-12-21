import React, { useState, useEffect } from 'react';

const ShopCart = () => {
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [viewHistory, setViewHistory] = useState(false);

  // Lấy danh sách giỏ sách và lịch sử từ Local Storage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedHistory = JSON.parse(localStorage.getItem('history')) || [];
    setCart(savedCart);
    setHistory(savedHistory);
  }, []);

  const updateStatus = (index, newStatus) => {
    const updatedCart = [...cart];
    updatedCart[index].status = newStatus;

    // Nếu trạng thái là "Đang trả", chuyển sách sang lịch sử
    if (newStatus === "Đã trả") {
      const returnedBook = updatedCart.splice(index, 1)[0];
      setHistory([returnedBook, ...history]);
      localStorage.setItem("history", JSON.stringify([returnedBook, ...history]));
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{viewHistory ? "Lịch sử sách đã mượn" : "Giỏ sách"}</h2>
      <button
        onClick={() => setViewHistory(!viewHistory)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        {viewHistory ? "Quay lại giỏ sách" : "Xem lịch sử"}
      </button>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">STT</th>
            <th className="border border-gray-300 p-2">Hình ảnh</th>
            <th className="border border-gray-300 p-2">Tên sách</th>
            <th className="border border-gray-300 p-2">Thể loại</th>
            <th className="border border-gray-300 p-2">Ngày mượn</th>
            <th className="border border-gray-300 p-2">Ngày trả</th>
            <th className="border border-gray-300 p-2">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {(viewHistory ? history : cart).map((book, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
              <td className="border border-gray-300 p-2 text-center">
                <img
                  src={book.img}
                  alt={book.title}
                  className="h-16 w-auto object-cover mx-auto"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">{book.title}</td>
              <td className="border border-gray-300 p-2 text-center">{book.category}</td>
              <td className="border border-gray-300 p-2 text-center">
                {new Date(book.borrowDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {new Date(book.returnDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {!viewHistory && book.status === "Đang chờ" ? (
                  <button
                    onClick={() => updateStatus(index, "Đang mượn")}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    Duyệt
                  </button>
                ) : book.status === "Đang mượn" ? (
                  <button
                    onClick={() => updateStatus(index, "Đã trả")}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Trả sách
                  </button>
                ) : (
                  <span>{book.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShopCart;
