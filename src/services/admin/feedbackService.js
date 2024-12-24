import axios from 'axios';
import { API_ENDPOINTS } from '../../config/apiConfig';

const feedbackService = {
  fetchFeedbacks: async () => {
    try {
      // Lấy tất cả phản hồi với trạng thái "Pending"
      const pendingResponse = await axios.get(`${API_ENDPOINTS.BASE_URL}/feedback?status=Pending`);
      // Lấy tất cả phản hồi với trạng thái "Responded"
      const respondedResponse = await axios.get(`${API_ENDPOINTS.BASE_URL}/feedback?status=Responded`);
      
      // Kết hợp dữ liệu của cả hai trạng thái
      const allFeedbacks = [
        ...pendingResponse.data.map(feedback => ({ ...feedback, status: "Pending" })),
        ...respondedResponse.data.map(feedback => ({ ...feedback, status: "Responded" }))
      ];

      return allFeedbacks;
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
