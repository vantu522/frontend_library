import axios from 'axios';
import { API_ENDPOINTS } from '../../config/apiConfig'; // Đảm bảo đường dẫn chính xác

const feedbackService = {
  fetchFeedbacks: async () => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.BASE_URL}/feedback`);
      console.log(response); // Kiểm tra dữ liệu nhận được từ API
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy phản hồi:", error.response || error);
      throw error;
    }
  },

  searchFeedbacks: async (keyword) => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.BASE_URL}/feedback/search`, {
        params: { keyword },
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tìm kiếm phản hồi:", error.response || error);
      throw error;
    }
  },


  respondToFeedback: async (id, respond) => {
    try {
      const response = await axios.post(`${API_ENDPOINTS.BASE_URL}/feedback/${id}/respond`, respond);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi phản hồi lại người dùng:", error.response || error);
      throw error;
    }
  },

  deleteFeedback: async (id) => {
    try {
      await axios.delete(`${API_ENDPOINTS.BASE_URL}/feedback/${id}`);
    } catch (error) {
      console.error("Lỗi khi xóa phản hồi:", error.response || error);
      throw error;
    }
  },
};

export default feedbackService;
