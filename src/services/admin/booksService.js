// bookService.js
import axios from 'axios';
import { API_ENDPOINTS } from "../../config/apiConfig";

// Định nghĩa dịch vụ sách với các phương thức để xử lý các yêu cầu API liên quan đến sách.
const bookService = {
  fetchAllBooks: async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.BOOKS}`,
        {
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

    // Thêm sách mới vào hệ thống
    addBook: async (bookData) => {
        try {
            // Gửi yêu cầu POST để thêm một cuốn sách mới
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
            // Trả về dữ liệu của cuốn sách đã được thêm
            return response.data;
        } catch (error) {
            // Ghi lại lỗi nếu có và ném lại lỗi
            console.error('Lỗi dịch vụ:', error);
            throw error;
        }
    },

    // Cập nhật thông tin sách theo bookId
    updateBook: async (bookId, bookData) => {
        try {
            // Gửi yêu cầu PUT để cập nhật thông tin sách
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
            // Trả về dữ liệu sách sau khi cập nhật
            return response.data;
        } catch (error) {
            // Ghi lại lỗi nếu có và ném lại lỗi
            console.error("Lỗi dịch vụ:", error);
            throw error;
        }
    },

    // Xóa sách theo bookId
    deleteBook: async (bookId) => {
        try {
            // Gửi yêu cầu DELETE để xóa sách theo bookId
            const response = await axios.delete(
                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.DELETEBOOKS}/${bookId}`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            // Trả về phản hồi sau khi xóa sách
            return response.data;
        } catch (error) {
            // Ghi lại lỗi nếu có và ném lại lỗi
            console.error("Lỗi dịch vụ:", error);
            throw error;
        }
    },

    // Lấy sách theo thể loại lớn và thể loại con
    fetchBooksByCategory: async (bigCategorySlug, subCategorySlug) => {
        try {
            // Gửi yêu cầu GET để lấy sách theo thể loại
            const response = await axios.get(
                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.BOOKS}/${bigCategorySlug}/${subCategorySlug}/books`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }
            );
            // Trả về dữ liệu sách theo thể loại
            return response.data;
        } catch (error) {
            // Ghi lại lỗi nếu có và ném lại lỗi
            console.error("Lỗi dịch vụ:", error);
            throw error;
        }
    }
};

// Xuất module bookService để sử dụng ở các phần khác trong ứng dụng
export default bookService;
