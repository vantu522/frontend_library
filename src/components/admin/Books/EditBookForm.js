import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaImage } from "react-icons/fa";
import bookService from "../../../services/admin/booksService";

const EditBookForm = ({ book, setVisibleForm, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [category, setCategory] = useState([{ name: "", smallCategory: [] }]);
  const [nxb, setNxb] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author[0] || "");
      setPublicationYear(book.publicationYear || "");
      setCategory(book.bigCategory || [{ name: "", smallCategory: [] }]);
      setNxb(book.nxb || "");
      setQuantity(book.quantity || 1);
      setDescription(book.description || "");
      setPageCount(book.pageCount || 0);
      setImagePreview(book.img || null);
    }
  }, [book]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const updatedBook = {
      title,
      description,
      author: [author],
      publicationYear: parseInt(publicationYear),
      bigCategory: category,
      quantity: parseInt(quantity),
      nxb,
      pageCount: parseInt(pageCount),
      availability: book.availability,
    };

    const formData = new FormData();
    formData.append("book", JSON.stringify(updatedBook));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await bookService.updateBook(book.bookId, formData);
      onUpdate(response);
      setVisibleForm(false);
      toast.success("Cập nhật sách thành công!");
    } catch (error) {
      setError("Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.");
      toast.error("Cập nhật sách thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory([{ ...category[0], name: e.target.value }]);
  };

  const handleSmallCategoryChange = (e) => {
    setCategory([{ ...category[0], smallCategory: e.target.value.split(",").map(cat => cat.trim()) }]);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-y-auto max-h-[90vh]">
      <h2 className="text-xl font-bold mb-4">Chỉnh sửa Sách</h2>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Số trang</label>
          <input
            type="number"
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
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
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <FaImage className="w-8 h-8 text-gray-400" />
              )}
            </label>
            {imagePreview && (
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                }}
                className="text-red-500 hover:text-red-700"
              >
                Xóa ảnh
              </button>
            )}
          </div>
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
            value={category[0].smallCategory[0]}
            placeholder="Thể loại con (ngăn cách bằng dấu phẩy)"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            disabled={isLoading}
          >
            {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBookForm;
