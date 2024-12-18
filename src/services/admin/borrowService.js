import axios from 'axios';
import { API_ENDPOINTS } from "../../config/apiConfig";

const borrowService = {
  // Lấy tất cả sách đã mượn
  fetchAllBorrowed: async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.BORROWED}`
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi dịch vụ:', error);
      throw error;
    }
  },

  // Lấy tất cả sách đã trả
  fetchAllReturned: async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.RETURNED}`
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi dịch vụ:', error);
      throw error;
    }
  },

  fetchAllPending: async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.PENDING}`
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi dịch vụ:', error);
      throw error;
    }
  },

  // Lấy chi tiết phiếu mượn theo ID
  fetchBorrowById: async (borrowId) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.BORROWED}/${borrowId}`
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy phiếu mượn:', error);
      throw error;
    }
  },

  // Thêm phiếu mượn mới
  addBorrow: async (borrowData) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.BORROWED}`,
        borrowData
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi dịch vụ:', error);
      throw error;
    }
  },

  // Cập nhật phiếu mượn
  updateBorrow: async (borrowId, borrowData) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.BORROWED}/${borrowId}`,
        borrowData
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi dịch vụ:', error);
      throw error;
    }
  },

  // Xóa phiếu mượn
  deleteBorrow: async (borrowId) => {
    try {
      const response = await axios.delete(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.BORROWED}/${borrowId}`
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi dịch vụ:', error);
      throw error;
    }
  }
};

export default borrowService;
