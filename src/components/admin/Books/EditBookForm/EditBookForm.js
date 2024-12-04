import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../../../../redux/admin/booksReducer";

const EditBookForm = ({ setVisibleForm, bookId }) => {
  const book = useSelector((state) => state.books.find((book) => book.id === bookId));
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("available");

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setYear(book.year);
      setGenre(book.genre);
      setPublisher(book.publisher);
      setQuantity(book.quantity);
      setStatus(book.status);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBook = {
      id: book.id,
      title,
      author,
      year,
      genre,
      publisher,
      quantity,
      status: quantity === 0 ? "unavailable" : "available",
    };
    dispatch(updateBook(updatedBook));
    setVisibleForm(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Chỉnh sửa Sách</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiêu đề
          </label>
          <input
            type="text"
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tác giả
          </label>
          <input
            type="text"
            placeholder="Tác giả"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Năm xuất bản
          </label>
          <input
            type="number"
            placeholder="Năm xuất bản"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thể loại
          </label>
          <input
            type="text"
            placeholder="Thể loại"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nhà xuất bản
          </label>
          <input
            type="text"
            placeholder="Nhà xuất bản"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số lượng
          </label>
          <input
            type="number"
            placeholder="Số lượng"
            value={quantity}
            onChange={(e) => {
              const newQuantity = Number(e.target.value);
              setQuantity(newQuantity);
              setStatus(newQuantity === 0 ? "unavailable" : "available");
            }}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trạng thái
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="available">Còn sách</option>
            <option value="unavailable">Hết sách</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Lưu Thay Đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBookForm;
