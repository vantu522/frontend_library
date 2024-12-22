import React, { useState } from "react";
import { toast } from "react-toastify";
import bookService from "../../../../services/admin/booksService";  // Đảm bảo import đúng service

const AddBookForm = ({ setVisibleForm, onAdd }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
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
  );
};

export default AddBookForm;
