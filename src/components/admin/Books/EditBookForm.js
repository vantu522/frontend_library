import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../../../redux/admin/booksReducer";

const EditBookForm = ({ setVisibleForm, bookId }) => {
  const book = useSelector((state) =>
    state.books.data.find((book) => book.id === bookId)
  );
  
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (book) {
      console.log(book)
      setTitle(book.title);
      setAuthor(book.author[0]); // Assuming we take the first author
      setPublicationYear(book.publicationYear);
      setCategory(book.category || [{ name: "", smallCategory: [] }]);
      setNxb(book.nxb);
      setQuantity(book.quantity);
      setDescription(book.description);
      setImg(book.img);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBook = {
      id: book.id,
      title,
      description,
      author: [author], // Wrap in array to match API
      publicationYear: parseInt(publicationYear),
      category,
      quantity: parseInt(quantity),
      nxb,
      img
    };
    dispatch(updateBook(updatedBook));
    setVisibleForm(false);
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
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Chỉnh sửa Sách</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
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
        <div className="col-span-2 sm:col-span-1">
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
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Năm xuất bản
          </label>
          <input
            type="number"
            placeholder="Năm xuất bản"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số lượng
          </label>
          <input
            type="number"
            placeholder="Số lượng"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="0"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả
          </label>
          <textarea
            placeholder="Mô tả sách"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thể loại
          </label>
          <input
            type="text"
            placeholder="Thể loại"
            value={category[0].name}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thể loại con
          </label>
          <input
            type="text"
            placeholder="Thể loại con (ngăn cách bằng dấu phẩy)"
            value={category[0].smallCategory.join(", ")}
            onChange={handleSmallCategoryChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nhà xuất bản
          </label>
          <input
            type="text"
            placeholder="Nhà xuất bản"
            value={nxb}
            onChange={(e) => setNxb(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hình ảnh
          </label>
          <input
            type="text"
            placeholder="URL hình ảnh"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-300"
          >
            Lưu Thay Đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBookForm;