import React, { useState, useEffect } from "react";
import Modal from "../../../common/admin/Modal/Modal";
import postService from "../../../services/admin/postService";

const EditPostForm = ({ post, onClose, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [status, setStatus] = useState("công khai");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setAuthor(post.author);
<<<<<<< HEAD
      setCreatedAt(post.createdAt ? post.createdAt.split('T')[0] : "");
=======
>>>>>>> 9afd62669f0c6c9c98f096eb3762cb979ab0b5d6
      setStatus(post.status === "công khai" ? "công khai" : "ẩn");
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!title || !content || !author || !createdAt) {
      setError("Vui lòng điền đầy đủ thông tin.");
      setLoading(false);
      return;
    }

<<<<<<< HEAD
    const data = { title, content, author, createdAt, status };
=======
    const updatedPost = {id:post.id, title, content, author, status };
>>>>>>> 9afd62669f0c6c9c98f096eb3762cb979ab0b5d6

    try {
      // Gọi API cập nhật bài viết
      const response = await postService.updatePost(post.id, data);
      onUpdate(response); // Gửi lại response từ API vào onUpdate
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Lỗi khi chỉnh sửa bài viết:", error);
      setError("Đã xảy ra lỗi khi chỉnh sửa bài viết.");
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Chỉnh sửa bài viết">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Nội dung</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
            className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">Ngày đăng</label>
          <input
            type="date"
            id="createdAt"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
<<<<<<< HEAD
            <option value="công khai">Công khai</option>
            <option value="ẩn">Ẩn</option>
=======
            <option value="Công khai">công khai</option>
            <option value="Ẩn danh">ẩn</option>
>>>>>>> 9afd62669f0c6c9c98f096eb3762cb979ab0b5d6
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
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Đang cập nhật...' : 'Cập nhật'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditPostForm;
