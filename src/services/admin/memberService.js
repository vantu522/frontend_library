import { API_ENDPOINTS } from "../../config/apiConfig";

const memberService = {
    fetchAllMember: async() =>{
        try{
            const response = await fetch(
               `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ADMIN.MEMBERS}` ,
               {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                }
            )

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`API error: ${response.status} - ${errorText}`);
              }

              return await response.json();
        }
        catch (error) {
            console.error('Service error:', error);
            throw error;
        }

    }

}

export default memberService;