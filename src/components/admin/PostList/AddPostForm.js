import React, { useState } from "react";
import postService from "../../../services/admin/postService"; // Thêm dòng này để import postService

const AddPostForm = ({ visible, onClose, onAddPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !author || !date) {
      setError("Tất cả các trường là bắt buộc.");
      return;
    }

    const newPost = { title, content, author, date };

    try {
      // Gọi API thêm bài viết
      const addedPost = await postService.addPost(newPost);
      console.log("Bài viết đã được thêm:", addedPost);

      // Cập nhật lại danh sách bài viết
      onAddPost(addedPost);

      // Đóng form sau khi thêm
      onClose();
    } catch (error) {
      console.error("Đã xảy ra lỗi khi thêm bài viết:", error);
      setError("Đã xảy ra lỗi khi thêm bài viết.");
    }
  };

  return (
    visible && (
      <div className="modal">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="text-xl font-bold">Thêm Bài Viết Mới</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label htmlFor="title">Tiêu đề</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Nội dung</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="author">Tác giả</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="date">Ngày đăng</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button type="submit">Thêm bài viết</button>
          <button type="button" onClick={onClose}>
            Đóng
          </button>
        </form>
      </div>
    )
  );
};

export default AddPostForm;
