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
  addPost: async (formData) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.BASE_URL}/posts`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',

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
  updatePost: async (id, postData) => {
    try {
      const response = await axios.put(`${API_ENDPOINTS.BASE_URL}/posts/update/${id}`,
         postData,
         {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        });
      return response.data;
    } catch (error) {
      console.error("Lỗi khi gọi API cập nhật:", error);
      throw error;  // Đảm bảo rằng lỗi được ném ra để được xử lý ở phần gọi API
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
