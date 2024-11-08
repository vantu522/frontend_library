const API_URL = 'http://10.147.19.246:8080/books/categories';

const categoryService = {
  fetchBigCategories: async () => {
    try {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) {
        throw new Error('Không thể tải danh mục');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  fetchSubCategories: async (slug) => {
    try {
      const response = await fetch(`${API_URL}/${slug}`);
      if (!response.ok) {
        throw new Error('Không thể tải danh mục con');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default categoryService;