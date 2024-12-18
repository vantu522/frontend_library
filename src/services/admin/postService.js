import axios from 'axios';
import { API_ENDPOINTS } from "../../config/apiConfig";

const postService = {
  // Lấy tất cả bài viết
  fetchAllPosts: async () => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.BASE_URL}/posts`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy bài viết:', error);
      throw error;
    }
  },

  // Thêm bài viết mới
  addPost: async (data) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.BASE_URL}/posts`,
        data,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi khi đăng bài viết:', error);
      throw error;
    }
  },

  // Cập nhật bài viết
  updatePost: async (id, updatedPost) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINTS.BASE_URL}/posts/update/${id}`,
        updatedPost,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật bài viết:', error);
      throw error;
    }
  },

  // Xóa bài viết
  deletePost: async (id) => {
    try {
      await axios.delete(`${API_ENDPOINTS.BASE_URL}/posts/delete/${id}`);
    } catch (error) {
      console.error('Lỗi khi xóa bài viết:', error);
      throw error;
    }
  }
};

export default postService;
