import axios from 'axios';
import { API_ENDPOINTS } from '../../config/apiConfig';

const feedbackService = {
  fetchFeedbacks: async () => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.BASE_URL}/feedback`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy phản hồi:', error.response || error);
      throw error;
    }
  },

  respondToFeedback: async (id, respond) => {
    try {
      const response = await axios.post(`${API_ENDPOINTS.BASE_URL}/feedback/${id}/respond`, respond);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi phản hồi lại người dùng:', error.response || error);
      throw error;
    }
  },
};

export default feedbackService;
