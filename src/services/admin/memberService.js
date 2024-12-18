import axios from 'axios';
import { API_ENDPOINTS } from "../../config/apiConfig";

const memberService = {
    fetchAllMember: async () => {
        try {
            const response = await axios.get(
                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.MEMBERS}`,
                {
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

    addMember: async (memberData) => {
        try {
            const response = await axios.post(
                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.ADDMEM}`,
                memberData,
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

    updateMember: async (memberId, memberData) => {
        try {
            const response = await axios.put(
                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.EDITMEMBER}/${memberId}`,
                memberData,
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

    deleteMember: async (memberId) => {
        try {
            const response = await axios.delete(
                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.DELETEMEM}/${memberId}`,
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

    // Thêm API mới để xem bạn đọc đang mượn hoặc gia hạn sách
    fetchBorrowedOrRenewedBooks: async (memberId) => {
        try {
            const response = await axios.get(
                `${API_ENDPOINTS.BASE_URL}/members/${memberId}/borrowed-renewed-books`,
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
    }
};

export default memberService;
