import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Booklist = () => {
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [viewHistory, setViewHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setCart(savedCart);
    setHistory(savedHistory);
  }, []);

  const updateStatus = (index, newStatus) => {
    const updatedCart = [...cart];
    updatedCart[index].status = newStatus;

    if (newStatus === "Đã trả") {
      const returnedBook = updatedCart.splice(index, 1)[0];
      setHistory([returnedBook, ...history]);
      localStorage.setItem(
        "history",
        JSON.stringify([returnedBook, ...history])
      );
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(
      newStatus === "Đang mượn"
        ? "Yêu cầu mượn sách đã được gửi!"
        : "Sách đã được chuyển sang lịch sử!"
    );
  };

  const filteredBooks = (viewHistory ? history : cart).filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {viewHistory ? "Lịch sử sách đã mượn" : "Giỏ sách của bạn"}
      </h2>

      {/* Thanh tìm kiếm */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm sách..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-64"
        />
        <button
          onClick={() => setViewHistory(!viewHistory)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {viewHistory ? "Quay lại giỏ sách" : "Xem lịch sử"}
        </button>
      </div>

      {/* Bảng sách */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 bg-[#0abaff]">STT</th>
            <th className="border border-gray-300 p-2 bg-[#0abaff]">
              Hình ảnh
            </th>
            <th className="border border-gray-300 p-2 bg-[#0abaff]">
              Tên sách
            </th>
            <th className="border border-gray-300 p-2 bg-[#0abaff]">
              Ngày mượn
            </th>
            <th className="border border-gray-300 p-2 bg-[#0abaff]">
              Ngày trả
            </th>
            <th className="border border-gray-300 p-2 bg-[#0abaff]">
              Trạng thái
            </th>
            <th className="border border-gray-300 p-2 bg-[#0abaff]">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <img
                  src={book.img}
                  alt={book.title}
                  className="h-16 w-auto object-cover mx-auto"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {book.title}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {new Date(book.borrowDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {new Date(book.returnDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {book.status}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {book.status === "Đang chờ" && !viewHistory ? (
                  <button
                    onClick={() => updateStatus(index, "Đang mượn")}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Yêu cầu mượn
                  </button>
                ) : book.status === "Đang mượn" && !viewHistory ? (
                  <button
                    onClick={() => updateStatus(index, "Đã trả")}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Trả sách
                  </button>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booklist;
