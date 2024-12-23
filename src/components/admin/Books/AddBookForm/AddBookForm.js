import React, { useState } from "react";
import bookService from "../../../../services/admin/booksService";

const AddBookForm = ({ setVisibleForm }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [category, setCategory] = useState([{ 
    name: "", 
    smallCategory: [] 
  }]);
  const [img, setImg] = useState("");
  const [nxb, setNxb] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      title,
      description,
      author: [author], // Wrap single author in array to match API
      publicationYear: parseInt(publicationYear),
      category, // Using the category array structure
      quantity: parseInt(quantity),
      nxb,
      img,
    };

    try {
      const response = await bookService.addBook(newBook);
      console.log('Sách đã được thêm:', response);
      setVisibleForm(false);
    } catch (error) {
      console.error('Thêm sách thất bại:', error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory([{
      ...category[0],
      name: e.target.value
    }]);
  };

  const handleSmallCategoryChange = (e) => {
    setCategory([{
      ...category[0],
      smallCategory: e.target.value.split(",").map(cat => cat.trim())
    }]);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-y-auto max-h-[90vh]">
      <h2 className="text-xl font-bold mb-4">Thêm Sách</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên Sách</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Tên sách"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tác giả</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            placeholder="Tác giả"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Năm xuất bản</label>
          <input
            type="number"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            placeholder="Năm xuất bản"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả sách"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          ></textarea>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="URL hình ảnh"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nhà xuất bản</label>
          <input
            type="text"
            value={nxb}
            onChange={(e) => setNxb(e.target.value)}
            placeholder="Nhà xuất bản"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Thể loại</label>
          <input
            type="text"
            value={category[0].name}
            onChange={handleCategoryChange}
            placeholder="Thể loại"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Thể loại con</label>
          <input
            type="text"
            onChange={handleSmallCategoryChange}
            placeholder="Thể loại con (ngăn cách bằng dấu phẩy)"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Thêm sách
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;