import axios from "axios";
import { API_ENDPOINTS } from "../../config/apiConfig";

const axiosInstance = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

const postService = {
  // Lấy tất cả bài viết
  fetchAllPosts: async () => {
    try {
      const response = await axiosInstance.get("/posts");
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy bài viết:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  // Thêm bài viết mới
  addPost: async (postData) => {
    try {
      const response = await axiosInstance.post("/posts", postData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi thêm bài viết:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  // Cập nhật bài viết
  updatePost: async (id, postData) => {
    try {
      const response = await axiosInstance.put(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  // Xóa bài viết
  deletePost: async (id) => {
    try {
      await axiosInstance.delete(`/posts/${id}`);
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },
};

export default postService;
