import axios from 'axios';
import { API_ENDPOINTS } from "../../config/apiConfig";

const ratingService = {
  // Lấy đánh giá theo sách
  fetchRatingsByBook: async (bookId) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}/ratings/book`, 
        {
          params: { bookId }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy đánh giá theo sách:', error);
      throw error;
    }
  },

  // Lấy đánh giá trung bình của sách
  fetchAverageRatingByBook: async (bookId) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}/ratings/book/average`, 
        {
          params: { bookId }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy đánh giá trung bình của sách:', error);
      throw error;
    }
  },
};

export default ratingService;
