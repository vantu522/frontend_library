import { API_ENDPOINTS } from '../../config/apiConfig';

const categoryService = {
  fetchBigCategories: async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USER.BOOKS}`);
      if (!response.ok) {
        throw new Error('Không thể tải danh mục');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  fetchSubCategories: async (slug) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USER.BOOKS}/${slug}`);
      if (!response.ok) {
        throw new Error('Không thể tải danh mục con');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};

export default categoryService;