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
      return response.data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  fetchCategories: async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.CATEGORIES}`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  fetchSubCategories: async (bigCategoryName) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.CATEGORIES}/${bigCategoryName}`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  fetchBooksBySubCategory: async (subCategoryName) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.CATEGORIES}/${subCategoryName}/books`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  searchBooks: async (query) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USER.SUGGESTBOOK}`,
        {
          params: { query },
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  addBook: async (bookData) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.ADDBOOKS}`,
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
      console.error('Service error:', error);
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
      console.error('Service error:', error);
      throw error;
    }
  },

  updateBigCategory: async (oldName, newName) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.CATEGORIES}/update-big-category`,
        null,
        {
          params: { oldName, newName },
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  deleteBigCategory: async (bigCategoryName) => {
    try {
      const response = await axios.delete(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.CATEGORIES}/delete-big-category`,
        {
          params: { bigCategoryName },
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  updateSmallCategory: async (oldName, newName) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.CATEGORIES}/update-small-category`,
        null,
        {
          params: { oldName, newName },
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },
};

export default bookService;
