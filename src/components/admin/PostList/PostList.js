import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import postService from "../../../services/admin/postService";
import AddPostForm from "./AddPostForm";
import EditPostForm from "./EditPostForm";
import Modal from "../../../common/admin/Modal/Modal";
import Table from "../../../common/admin/Table/Table";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });
  const [editModal, setEditModal] = useState({ isOpen: false, id: null });
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await postService.fetchAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await postService.deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      closeModal();
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
    }
  };

  const handleAddPost = async (newPost) => {
    try {
      const response = await postService.addPost(newPost);
      setPosts([...posts, response]);
      setVisibleForm(false);
    } catch (error) {
      console.error("Lỗi khi thêm bài viết:", error);
    }
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setEditModal({ isOpen: true, id: post.id });
  };

  const handleUpdatePost = async (updatedPost) => {
    try {
      const response = await postService.updatePost(updatedPost.id, updatedPost);
      setPosts(posts.map(post => post.id === updatedPost.id ? response : post));
      closeModal();
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
    }
  };

  const openModal = (id) => {
    setConfirmModal({ isOpen: true, id });
  };

  const closeModal = () => {
    setConfirmModal({ isOpen: false, id: null });
    setEditModal({ isOpen: false, id: null });
  };
  const renderImage = (image) => {
    if (!image) return "Không có hình ảnh";
  
    // Kiểm tra nếu là URL
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return <img src={image} alt="Hình ảnh" className="text-gray-600 font-mono" />;
    }
  
    // Kiểm tra nếu là base64
    if (image.startsWith("data:image")) {
      return <img src={image} alt="Hình ảnh Base64" className="text-gray-600 font-mono" />;
    }
  
    // Nếu là chuỗi base64 không có tiền tố
    const base64Image = `data:image/png;base64,${image}`;
    return <img src={base64Image} alt="Hình ảnh Base64" className="text-gray-600 font-mono" />;
  };

  const columns = [
    { label: "Hình ảnh", field: "img", render:(img) => renderImage(img) },
    { label: "Tiêu đề", field: "title" },
    { label: "Nội dung", field: "content" },
    { label: "Tác giả", field: "author" },
    { label: "Ngày đăng", field: "createdAt", render: (value) => new Date(value).toLocaleDateString("vi-VN") },
    { label: "Trạng thái", field: "status" },
    {
      label: "Hành động",
      field: "actions",
      render: (value, row) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleEditPost(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => openModal(row.id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  const data = posts.map(post => ({
    ...post,
    actions: post.id,
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen mt-[-150px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <span className="ml-4 text-gray-700">Đang tải danh sách...</span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <AddPostForm
        visible={visibleForm}
        onClose={() => setVisibleForm(false)}
        onAddPost={handleAddPost}
      />

      {editModal.isOpen && selectedPost && (
        <EditPostForm
          post={selectedPost}
          onClose={closeModal}
          onUpdate={handleUpdatePost}
        />
      )}

      <Modal
        isOpen={confirmModal.isOpen}
        onClose={closeModal}
        title="Xác nhận xóa bài viết"
      >
        <p className="mb-4">Bạn có chắc chắn muốn xóa bài viết này?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
          >
            Hủy
          </button>
          <button
            onClick={() => handleDelete(confirmModal.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Xóa
          </button>
        </div>
      </Modal>

      <h2 className="text-2xl font-bold mb-4">Danh sách bài viết</h2>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setVisibleForm(true)}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          <FaPlus /> Thêm bài viết
        </button>
      </div>

      <Table columns={columns} data={data} />
    </div>
  );
};

export default PostList;