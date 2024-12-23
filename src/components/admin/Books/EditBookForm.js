import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../../../redux/admin/booksReducer";
import { toast } from "react-toastify";
import bookService from "../../../services/admin/booksService";

const EditBookForm = ({ book, setVisibleForm, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [category, setCategory] = useState([{ 
    name: "", 
    smallCategory: [] 
  }]);
  const [nxb, setNxb] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author[0]);
      setPublicationYear(book.publicationYear);
      setCategory(book.category || [{ name: "", smallCategory: [] }]);
      setNxb(book.nxb);
      setQuantity(book.quantity);
      setDescription(book.description);
      setImg(book.img);
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const updatedBook = {
      id: book.bookId,
      title,
      description,
      author: [author],
      publicationYear: parseInt(publicationYear),
      category,
      quantity: parseInt(quantity),
      nxb,
      img
    };

    try {
      await bookService.updateBook(book.bookId, updatedBook);
      onUpdate(updatedBook);
      setVisibleForm(false);
      toast.success("Cập nhật sách thành công!");
    } catch (error) {
      setError("Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.");
      toast.error("Cập nhật sách thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="uppercase"><strong>Chỉnh sửa sách</strong></h1>
      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">ID:</label>
            <input
              type="text"
              disabled
              value={book.bookId}
              className="w-full mt-1 p-2 bg-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Tiêu đề:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Tác giả:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Năm xuất bản:</label>
            <input
              type="number"
              value={publicationYear}
              onChange={(e) => setPublicationYear(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Số lượng:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Thể loại:</label>
            <input
              type="text"
              value={category[0].name}
              onChange={(e) => setCategory([{...category[0], name: e.target.value}])}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Nhà xuất bản:</label>
            <input
              type="text" 
              value={nxb}
              onChange={(e) => setNxb(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Hình ảnh:</label>
            <input
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block font-medium text-gray-700">Mô tả:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? "Đang lưu..." : "Lưu"}
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;