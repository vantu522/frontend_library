import React, { useState } from "react";
import Modal from "../../../common/admin/Modal/Modal";
import postService from "../../../services/admin/postService";

const AddPostForm = ({ visible, onClose, onAddPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("công khai");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !author || !date) {
      setError("Tất cả các trường là bắt buộc.");
      return;
    }

    const newPost = { title, content, author, date, status };

    try {
      setLoading(true);
      const addedPost = await postService.addPost(newPost); // Gọi API để thêm bài viết
      onAddPost(addedPost); // Cập nhật giao diện
      setSuccess(true);
      setError(""); // Xóa thông báo lỗi
      setLoading(false);
      onClose(); // Đóng modal sau khi thêm thành công
    } catch (error) {
      setError("Đã xảy ra lỗi khi thêm bài viết.");
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={visible} onClose={onClose} title="Thêm bài viết">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500">{error}</p>}

        {/* Các trường nhập liệu */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Nội dung</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Tác giả</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Ngày đăng</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="public">Công khai</option>
            <option value="draft">Nháp</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
          >
            Hủy
          </button>
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Đang tải..." : "Thêm bài viết"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPostForm;
