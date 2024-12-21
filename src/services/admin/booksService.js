import axios from 'axios';
import { API_ENDPOINTS } from "../../config/apiConfig";

const bookService = {
  // Lấy tất cả sách
  fetchAllBooks: async (page = 1, size = 10) => {
    return axios.get(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.BOOKS}`, {
      params: { page, size },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.data)
    .catch(error => { throw error; });
  },

  // Lấy tất cả thể loại sách
  fetchCategories: async () => {
    return axios.get(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.CATEGORIES}`, {
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => response.data)
    .catch(error => { throw error; });
  },

  // Lấy các thể loại nhỏ theo thể loại lớn
  fetchSubCategories: async (bigCategoryName) => {
    return axios.get(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.CATEGORIES}/${bigCategoryName}`, {
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => response.data)
    .catch(error => { throw error; });
  },

  // Lấy sách thuộc thể loại nhỏ
  fetchBooksBySubCategory: async (bigCategoryName, subCategoryName) => {
    return axios.get(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.CATEGORIES}/${bigCategoryName}/${subCategoryName}/books`, {
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => response.data)
    .catch(error => { throw error; });
  },

  // Tìm sách theo tên sách hoặc tác giả
  searchBooks: async (query) => {
    return axios.get(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USER.SUGGESTBOOK}`, {
      params: { query },
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => response.data)
    .catch(error => { throw error; });
  },

  // Thêm sách mới
  addBook: async (bookData) => {
    return axios.post(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.ADDBOOKS}`, bookData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.data)
    .catch(error => { throw error; });
  },

  // Cập nhật sách
  updateBook: async (bookId, bookData) => {
    return axios.put(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.EDITBOOKS}/${bookId}`, bookData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.data)
    .catch(error => { throw error; });
  },

  // Xóa sách
  deleteBook: async (bookId) => {
    return axios.delete(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.DELETEBOOKS}/${bookId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.data)
    .catch(error => { throw error; });
  },

  // Cập nhật tên thể loại lớn
  updateBigCategory: async (oldName, newName) => {
    return axios.put(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.CATEGORIES}/update-big-category`, null, {
      params: { oldName, newName },
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => response.data)
    .catch(error => { throw error; });
  },

  // Xóa thể loại lớn
  deleteBigCategory: async (bigCategoryName) => {
    return axios.delete(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.CATEGORIES}/delete-big-category`, {
      params: { bigCategoryName },
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => response.data)
    .catch(error => { throw error; });
  },

  // Cập nhật thể loại nhỏ
  updateSmallCategory: async (oldName, newName) => {
    return axios.put(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.CATEGORIES}/update-small-category`, null, {
      params: { oldName, newName },
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => response.data)
    .catch(error => { throw error; });
  },
};

export default bookService;
