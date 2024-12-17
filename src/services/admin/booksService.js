import axios from 'axios';
import { API_ENDPOINTS } from "../../config/apiConfig";

const bookService = {
  fetchAllBooks: async (page = 1, size = 10) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.BOOKS}`,
        {
          params: { page, size },
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      console.log(response.data);  // Log để kiểm tra dữ liệu

      return response.data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  // Các phương thức khác giữ nguyên
  addBook: async (bookData) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USER.BOOK}`,
        bookData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  updateBook: async (bookId, bookData) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.EDITBOOKS}/${bookId}`,
        bookData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error("Service error:", error);
      throw error;
    }
  },

  deleteBook: async (bookId) => {
    try {
      const response = await axios.delete(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.DELETEBOOKS}/${bookId}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error("Service error:", error);
      throw error;
    }
  }
};

export default bookService;