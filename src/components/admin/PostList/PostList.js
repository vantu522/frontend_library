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
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    id: null,
  });
  const [editModal, setEditModal] = useState({
    isOpen: false,
    id: null,
  });
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch posts khi component load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.fetchAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      }
    };
    fetchPosts();
  }, []);

  // Xử lý xóa bài viết
  const handleDelete = async (id) => {
    try {
      await postService.deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      closeModal();
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
    }
  };

  // Xử lý thêm bài viết mới
  const handleAddPost = async (newPost) => {
    try {
      const response = await postService.addPost(newPost);
      setPosts([...posts, response]);
      setVisibleForm(false);
    } catch (error) {
      console.error("Lỗi khi thêm bài viết:", error);
    }
  };

  // Xử lý chỉnh sửa bài viết
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

  // Mở modal xác nhận xóa
  const openModal = (id) => {
    setConfirmModal({ isOpen: true, id });
  };

  // Đóng tất cả các modal
  const closeModal = () => {
    setConfirmModal({ isOpen: false, id: null });
    setEditModal({ isOpen: false, id: null });
  };

  // Cấu hình các cột cho bảng
  const columns = [
    { label: "Tiêu đề", field: "title", width: "20%" },
    { label: "Nội dung", field: "content", width: "40%" },
    { label: "Tác giả", field: "author", width: "15%" },
    { label: "Ngày đăng", field: "createdAt", width: "15%" },
    { label: "Trạng thái", field: "status", width: "15%" },
    { label: "Hành động", field: "actions", width: "10%", render: (value, row) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleEditPost(row)} // Open edit modal
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => openModal(row.id)} // Open delete confirmation modal
            className="text-red-500 hover:text-red-700"
          >
            <FaTrashAlt />
          </button>
        </div>
    ) }
  ];

  const data = posts.map(post => ({
    ...post,
    actions: post.id, // Giữ lại ID để xóa khi cần
  }));

  return (
    <div className="p-4">
      {/* Modal thêm bài viết */}
      <AddPostForm
        visible={visibleForm}
        onClose={() => setVisibleForm(false)}
        onAddPost={handleAddPost}
      />

      {/* Modal chỉnh sửa bài viết */}
      {editModal.isOpen && (
        <EditPostForm
          visible={editModal.isOpen}
          onClose={closeModal}
          id={selectedPost?.id}
          isEdit={true}
          onUpdate={handleUpdatePost}
        />
      )}

      {/* Modal xác nhận xóa */}
      <Modal
        isOpen={confirmModal.isOpen} // Sử dụng isOpen thay vì visible
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
            onClick={() => handleDelete(confirmModal.id)} // Đảm bảo ID đúng
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

      {/* Bảng bài viết */}
      <Table columns={columns} data={data} />
    </div>
  );
};

export default PostList;
