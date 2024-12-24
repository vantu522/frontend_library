import React, { useState, useEffect } from "react";
import Modal from "../../../common/admin/Modal/Modal";
import postService from "../../../services/admin/postService";
import { FaImage } from "react-icons/fa";

const EditPostForm = ({ post, onClose, onUpdate }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Công khai");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setAuthor(post.author);
      setStatus(post.status);
      setImagePreview(post.img);
    }
  }, [post]);

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
    setLoading(true);
    setError(null);
  
    if (!title || !content || !author || !status) {
      setError("Vui lòng điền đầy đủ thông tin.");
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    const postData = {
      id: post.id,
      title,
      content,
      author,
      status
    };
  
    formData.append("post", JSON.stringify(postData));
    if (imageFile) {
      formData.append("image", imageFile);
    }
  
    try {
      const response = await postService.updatePost(post.id, formData);
      onUpdate(response.data); // Gửi response data từ server
      setLoading(false);
      onClose();
    } catch (error) {
      setError("Đã xảy ra lỗi khi chỉnh sửa bài viết.");
      setLoading(false);
    }
  };
  
  return (
    <Modal isOpen={true} onClose={onClose} title="Chỉnh sửa bài viết">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Ảnh bài viết</label>
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
            rows={4}
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
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="công khai">công khai</option>
            <option value="ẩn">ẩn</option>
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