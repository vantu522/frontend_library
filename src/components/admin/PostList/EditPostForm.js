import React, { useState, useEffect } from "react";
import postService from "../../../services/admin/postService"; // Import postService
import Modal from "../../../common/admin/Modal/Modal"; // Modal Component

const EditPostForm = ({ visible, onClose, postId, isEdit, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    date: ""
  });

  // Lấy thông tin bài viết khi modal mở và có postId
  useEffect(() => {
    if (postId && isEdit) {
      const fetchPostDetails = async () => {
        try {
          const post = await postService.fetchAllPost(); // Lấy tất cả bài viết
          const currentPost = post.find((item) => item.id === postId); // Tìm bài viết theo ID
          if (currentPost) {
            setFormData({
              title: currentPost.title,
              content: currentPost.content,
              author: currentPost.author,
              date: currentPost.date,
            });
          }
        } catch (error) {
          console.error("Lỗi khi lấy thông tin bài viết:", error);
        }
      };

      fetchPostDetails();
    }
  }, [postId, isEdit]);

  // Cập nhật giá trị trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Xử lý khi submit form để cập nhật bài viết
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = await postService.updatePost(postId, formData); // Gọi API cập nhật bài viết
      onUpdate(updatedPost); // Gọi hàm callback để cập nhật giao diện
      onClose(); // Đóng modal
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
    }
  };

  if (!visible) return null;

  return (
    <Modal onClose={onClose}>
      <h3 className="text-lg font-bold mb-4">{isEdit ? "Chỉnh sửa bài viết" : "Thêm bài viết"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Tiêu đề</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nội dung</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Tác giả</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Ngày đăng</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Đóng
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEdit ? "Cập nhật bài viết" : "Thêm bài viết"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditPostForm;
