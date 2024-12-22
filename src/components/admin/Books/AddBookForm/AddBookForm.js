import React, { useState } from "react";
import { toast } from "react-toastify";
import bookService from "../../../../services/admin/booksService";  // Đảm bảo import đúng service

const AddBookForm = ({ setVisibleForm, onAdd }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
<<<<<<< HEAD
  const [bigCategory, setBigCategory] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [quantity, setQuantity] = useState("");
  const [img, setImg] = useState("");  // Thêm state cho ảnh
  const [isLoading, setIsLoading] = useState(false);  // Để xử lý loading
  const [error, setError] = useState("");  // Để xử lý lỗi

  const handleSubmit = async () => {
    // Validation
    if (!title || !author || !bigCategory || !publicationYear || !quantity || !img) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    // Kiểm tra định dạng năm xuất bản (phải là số và hợp lý)
    const yearRegex = /^\d{4}$/;
    if (!yearRegex.test(publicationYear) || Number(publicationYear) > new Date().getFullYear()) {
      toast.error("Năm xuất bản không hợp lệ");
      return;
    }

    // Kiểm tra định dạng số lượng (phải là số và lớn hơn 0)
    if (quantity <= 0) {
      toast.error("Số lượng phải lớn hơn 0");
      return;
    }

=======
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
>>>>>>> 9afd62669f0c6c9c98f096eb3762cb979ab0b5d6
    try {
      setIsLoading(true);
      setError("");

      // Gọi API thêm sách
      const bookData = {
        title,
        author,
        bigCategory,
        publicationYear,
        quantity: Number(quantity),
        img,  // Thêm ảnh vào dữ liệu
      };

      const response = await bookService.addBook(bookData);  // Gọi service thêm sách

      // Xử lý kết quả
      if (response) {
        toast.success("Thêm sách thành công!");
        setVisibleForm(false);  // Đóng form sau khi thêm sách thành công

        if (onAdd) onAdd(response);  // Callback để xử lý thêm sách trong component cha
      }
    } catch (error) {
      console.error("Lỗi khi thêm sách:", error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi thêm sách");
    } finally {
      setIsLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tên sách</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Tác giả</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="bigCategory" className="block text-sm font-medium text-gray-700">Thể loại</label>
        <input
          type="text"
          id="bigCategory"
          value={bigCategory}
          onChange={(e) => setBigCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-700">Năm xuất bản</label>
        <input
          type="number"
          id="publicationYear"
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Số lượng</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="img" className="block text-sm font-medium text-gray-700">Ảnh (link)</label>
        <input
          type="text"
          id="img"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => setVisibleForm(false)}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md"
          disabled={isLoading}  // Disable khi đang tải
        >
          {isLoading ? "Đang thêm..." : "Thêm sách"}
        </button>
      </div>
    </form>
=======
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
>>>>>>> 9afd62669f0c6c9c98f096eb3762cb979ab0b5d6
  );
};

export default AddBookForm;
