import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

const staService =  {
    fetchCategoryDistribution: async() =>{
        try{
            const response = await axios.get(
                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.STATISTICS.CATEGORY}`);
            return response.data;   

        } catch(error){
            console.error(error);
            throw error;
        }
    }
}

export default staService;