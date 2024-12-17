import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import postService from "../../../services/admin/postService";
import AddPostForm from "./AddPostForm"; // Import AddPostForm

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.fetchAllPost();
        setPosts(data);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await postService.deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
    }
  };

  // Cập nhật bài viết sau khi thêm mới
  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div className="p-4">
      <AddPostForm
        visible={visibleForm}
        onClose={() => setVisibleForm(false)}
        onAddPost={handleAddPost}
      />
      <h2 className="text-2xl font-bold mb-4">Danh sách bài viết</h2>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setVisibleForm(true)}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          <FaPlus /> Thêm bài viết
        </button>
      </div>

      <table className="min-w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left w-[20%]">Tiêu đề</th>
            <th className="px-4 py-2 text-left w-[40%]">Nội dung</th>
            <th className="px-4 py-2 text-left w-[15%]">Tác giả</th>
            <th className="px-4 py-2 text-left w-[15%]">Ngày đăng</th>
            <th className="px-4 py-2 text-center w-[10%]">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post.id} className="border-b border-gray-300 hover:bg-gray-50">
                <td className="px-4 py-2">{post.title}</td>
                <td className="px-4 py-2 text-ellipsis overflow-hidden whitespace-nowrap">{post.content}</td>
                <td className="px-4 py-2">{post.author}</td>
                <td className="px-4 py-2">{post.date}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {}}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                Không có bài viết nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
