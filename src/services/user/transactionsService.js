import axios from "axios";
import { API_ENDPOINTS } from "../../config/apiConfig";

const transactionsService = {
    addTransaction: async(transactionData) =>{
        try{
            const response = await axios.post(
                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.TRANSACTIONS.BORROW}`,
                transactionData,
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

}


export default transactionsService;
