import axios from 'axios';
import { API_ENDPOINTS } from '../../config/apiConfig';

const transactionsService = {

  addTransaction: async (transactionData) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.TRANSACTIONS.BORROW}`,
        transactionData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  fetchALLTransaction: async (memberId) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.TRANSACTIONS.USER}`,
        {
          params: { memberId }, // Truyền `memberID` dưới dạng query parameter
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
  
  

  

};

export default transactionsService;
