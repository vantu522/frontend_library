import axios from 'axios';
import { API_ENDPOINTS } from "../../config/apiConfig";

const postService = {
  fetchAllPost: async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.POSTS}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi dịch vụ:', error);
      throw error;
    }
  },

  addPost: async (postData) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.ADDPOSTS}`,
        postData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi dịch vụ:', error);
      throw error;
    }
  },

  deletePost: async (id) => {
    try {
      const response = await axios.delete(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.DELETEPOSTS}/${id}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi dịch vụ:', error);
      throw error;
    }
  },
};

export default postService;
