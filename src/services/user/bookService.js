import axios from 'axios';
import { API_ENDPOINTS } from '../../config/apiConfig';

const bookService = {
  fetchBooksByCategory: async (bigCategorySlug, subCategorySlug) => {
    try {      
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USER.BOOKS}/${bigCategorySlug}/${subCategorySlug}/books`, 
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Service error:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  fetchBookByBookId: async (bookId) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USER.BOOK}/${bookId}`, 
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error('Service error:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  fetchBookBySuggest: async (query) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USER.SUGGESTBOOK}?query=${query}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Service error:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
};

export default bookService;