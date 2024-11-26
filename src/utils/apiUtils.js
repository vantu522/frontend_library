export const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', errorText);
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }
  return await response.json();
};

export const createApiRequest = (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    ...options
  };

  return fetch(`${endpoint}`, defaultOptions)
    .then(handleApiResponse)
    .catch(error => {
      console.error('API Request Error:', error);
      throw error;
    });
}; 