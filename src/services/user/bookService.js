import { API_ENDPOINTS } from '../../config/apiConfig';

const bookService = {

  fetchBooksByCategory: async (bigCategorySlug, subCategorySlug) => {
    try {      
      const response = await fetch(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USER.BOOKS}/${bigCategorySlug}/${subCategorySlug}/books`, 
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  fetchBookByBookId: async (bookId) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USER.BOOK}/${bookId}`, 
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  }
  


};

export default bookService;