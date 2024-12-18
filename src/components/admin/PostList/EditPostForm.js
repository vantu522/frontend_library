import React, { useState, useEffect } from "react";
import Modal from "../../../common/admin/Modal/Modal";
import postService from "../../../services/admin/postService";

const EditPostForm = ({ visible, onClose, id, isEdit, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && isEdit) {
      const fetchPost = async () => {
        try {
          const post = await postService.fetchPost(id); // Lấy dữ liệu bài viết
          if (post) {
            setTitle(post.title);
            setContent(post.content);
            setAuthor(post.author);
            setDate(post.date);
            setStatus(post.status);
          }
        } catch (error) {
          console.error("Lỗi khi lấy bài viết:", error);
          setError("Không thể tải bài viết.");
        }
      };
      fetchPost();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !author || !date) {
      setError("Tất cả các trường là bắt buộc.");
      return;
    }

    const updatedPost = { title, content, author, date, status, id };

    try {
      setLoading(true);
      await onUpdate(updatedPost); // Gọi hàm cập nhật bài viết
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi chỉnh sửa bài viết:", error);
      setError("Đã xảy ra lỗi khi chỉnh sửa bài viết.");
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={visible} onClose={onClose} title="Chỉnh sửa bài viết">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        {/* Tiêu đề */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Tiêu đề
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Nội dung */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Nội dung
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Tác giả */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Tác giả
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Ngày đăng */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Ngày đăng
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Trạng thái */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Trạng thái
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="public">Công khai</option>
            <option value="draft">Nháp</option>
          </select>
        </div>

        {/* Nút gửi */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Đang tải..." : "Cập nhật bài viết"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditPostForm;
