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

  // Lấy tất cả sách đang chờ duyệt
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

  // Chấp nhận hoặc từ chối phiếu mượn
  approveTransaction: async (transactionData) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.BASE_URL}/transactions/approve`,
        transactionData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi khi chấp thuận phiếu mượn:', error);
      throw error;
    }
  },

  // Trả sách
  returnBook: async (data) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.BASE_URL}/transactions/return`,
        data,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi khi trả sách:', error);
      throw error;
    }
  },

  // Gia hạn sách
  renewBook: async (data) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.BASE_URL}/transactions/renew`,
        data,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi khi gia hạn sách:', error);
      throw error;
    }
  },

    // Mượn sách
    borrowBook: async (data) => {
      try {
        const response = await axios.post(
          `${API_ENDPOINTS.BASE_URL}/transactions/borrow`,
          data,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          }
        );
        return response.data;
      } catch (error) {
        console.error('Lỗi khi mượn sách:', error);
        throw error;
      }
    },  
};

export default borrowService;
