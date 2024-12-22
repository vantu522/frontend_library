import React, { useState } from "react";
import bookService from "../../../../services/admin/booksService";  // Import bookService

const AddBookForm = ({ setVisibleForm }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [bigCategory, setBigCategory] = useState({ name: "", smallCategory: [] });
  const [img, setImg] = useState("");
  const [nxb, setNxb] = useState("");
  const [pageCount, setPageCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      title,
      description,
      author: [author],
      publicationYear,
      bigCategory,
      quantity,
      availability: quantity > 0,
      img,
      nxb,
      pageCount,
    };
    try {
      const response = await bookService.addBook(newBook);
      console.log('Sách đã được thêm:', response);
      setVisibleForm(false);
    } catch (error) {
      console.error('Thêm sách thất bại:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Thêm Sách</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên Sách</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Tên sách"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tác giả</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            placeholder="Tác giả"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả sách"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Năm xuất bản</label>
          <input
            type="number"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            placeholder="Năm xuất bản"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="URL hình ảnh"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nhà xuất bản</label>
          <input
            type="text"
            value={nxb}
            onChange={(e) => setNxb(e.target.value)}
            placeholder="Nhà xuất bản"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Số trang</label>
          <input
            type="number"
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
            placeholder="Số trang"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Thể loại lớn</label>
          <input
            type="text"
            value={bigCategory.name}
            onChange={(e) => setBigCategory({ ...bigCategory, name: e.target.value })}
            placeholder="Thể loại lớn"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Thể loại nhỏ</label>
          <input
            type="text"
            onChange={(e) => setBigCategory({ ...bigCategory, smallCategory: e.target.value.split(",").map(cat => cat.trim()) })}
            placeholder="Thể loại nhỏ (ngăn cách bằng dấu phẩy)"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4 text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Thêm sách
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;