// API utility for backend communication
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const submitGrievanceAPI = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/grievances/submit`, {
      method: 'POST',
      body: formData, // FormData object (don't set Content-Type header, browser will set it automatically with boundary)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit grievance');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};